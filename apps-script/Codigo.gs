/**
 * Landing Calentamiento Financiero · Entrenando Tus Finanzas
 * Guarda los mails del formulario de guías en la hoja "Leads" de la planilla
 * "LANDING CALENTAMIENTO".
 *
 * - Si el mail es nuevo: agrega una fila con estado "Nuevo".
 * - Si el mail ya estaba: no lo duplica; suma 1 a "Veces registrado" y actualiza "Última vez".
 *
 * Columnas de "Leads":
 * A Fecha de alta | B Email | C Origen | D Dispositivo | E Veces registrado | F Última vez | G Estado | H Notas
 */

const SPREADSHEET_ID = '1NfBjnytadqhS0Ubt6UOiQw4c5Tui9aSBi_BlXdimyVc';
const HOJA = 'Leads';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    const email = String(p.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return respuesta({ ok: false, error: 'email inválido' });

    const hoja = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(HOJA);
    const ahora = new Date();
    const origen = String(p.origen || 'landing').slice(0, 100);
    const dispositivo = String(p.dispositivo || '').slice(0, 30);

    const ultima = hoja.getLastRow();
    if (ultima > 1) {
      const mails = hoja.getRange(2, 2, ultima - 1, 1).getValues();
      for (let i = 0; i < mails.length; i++) {
        if (String(mails[i][0]).trim().toLowerCase() === email) {
          const fila = i + 2;
          const veces = Number(hoja.getRange(fila, 5).getValue()) || 1;
          hoja.getRange(fila, 5, 1, 2).setValues([[veces + 1, ahora]]);
          return respuesta({ ok: true, nuevo: false });
        }
      }
    }

    hoja.appendRow([ahora, email, origen, dispositivo, 1, ahora, 'Nuevo', '']);
    return respuesta({ ok: true, nuevo: true });
  } finally {
    lock.releaseLock();
  }
}

// Para probar que la Web App está publicada: abrí la URL /exec en el navegador.
function doGet() {
  return respuesta({ ok: true, servicio: 'Leads Calentamiento Financiero' });
}

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Ejecutalo una vez desde el editor (botón ▶) para dar permisos y cargar una fila de prueba.
function prueba() {
  doPost({ parameter: { email: 'prueba@entrenandotusfinanzas.com', origen: 'prueba-script', dispositivo: 'Computadora' } });
}
