/**
 * Guarda los mails de la landing del Calentamiento Financiero en una hoja de Google Sheets.
 *
 * Cómo usarlo:
 * 1. Creá una planilla de Google Sheets (por ejemplo "Leads guías").
 * 2. Extensiones › Apps Script, borrá lo que haya y pegá este código.
 * 3. Implementar › Nueva implementación › Tipo: Aplicación web.
 *    Ejecutar como: Yo · Quién tiene acceso: Cualquier usuario.
 * 4. Copiá la URL que termina en /exec y pegala en CONFIG.SHEETS_ENDPOINT dentro de index.html.
 */
function doPost(e) {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads')
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Leads');
  if (hoja.getLastRow() === 0) hoja.appendRow(['Fecha', 'Email', 'Origen']);
  var p = (e && e.parameter) || {};
  hoja.appendRow([new Date(), p.email || '', p.origen || '']);
  return ContentService.createTextOutput('ok');
}
