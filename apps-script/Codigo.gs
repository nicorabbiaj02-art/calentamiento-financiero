/**
 * Landing Calentamiento Financiero · Entrenando Tus Finanzas
 * Guarda Fecha, Nombre y apellido y Email en la hoja "Leads"
 * de la planilla "LANDING CALENTAMIENTO".
 */

const SPREADSHEET_ID = '1NfBjnytadqhS0Ubt6UOiQw4c5Tui9aSBi_BlXdimyVc';
const HOJA = 'Leads';

function doPost(e) {
  const p = (e && e.parameter) || {};
  const nombre = String(p.nombre || '').trim().slice(0, 120);
  const email = String(p.email || '').trim().toLowerCase();
  if (!email) return ContentService.createTextOutput('falta email');

  const hoja = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(HOJA);
  hoja.appendRow([new Date(), nombre, email]);
  return ContentService.createTextOutput('ok');
}

// Ejecutalo una vez desde el editor (botón ▶) para dar permisos y cargar una fila de prueba.
function prueba() {
  doPost({ parameter: { nombre: 'Prueba Script', email: 'prueba@ejemplo.com' } });
}
