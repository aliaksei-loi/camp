/**
 * Google Apps Script webhook for /api/booking → Google Sheets.
 *
 * Setup:
 *   1. Open your Google Sheet.
 *   2. Extensions → Apps Script. Paste this entire file.
 *   3. Replace SHARED_SECRET below with a random string. Set the same
 *      value in Vercel env as SHEETS_WEBHOOK_SECRET.
 *   4. Optional: change SHEET_NAME if your tab is named differently.
 *      Leave as null to use the active (first) sheet.
 *   5. Save (⌘/Ctrl-S).
 *   6. Deploy → New deployment → Type: Web app
 *      - Execute as: Me (your-email@gmail.com)
 *      - Who has access: Anyone
 *      Click Deploy, copy the URL — that's your SHEETS_WEBHOOK_URL.
 *   7. Make sure row 1 of your sheet has these headers (any order):
 *
 *      submittedAt | name | surname | email | phone | adults | kids |
 *      babies | total | interests | notes | source | period
 *
 *      You can add extra columns (e.g. status, notes_internal) — the
 *      script only writes to columns whose header matches a known key.
 *
 * On every redeploy: bump deployment version, the URL stays valid.
 */

const SHARED_SECRET = "REPLACE_WITH_SAME_VALUE_AS_SHEETS_WEBHOOK_SECRET";
const SHEET_NAME = null; // or "Регистрации"

function doPost(e) {
  try {
    const raw = e && e.postData && e.postData.contents;
    if (!raw) return jsonResponse({ ok: false, error: "no body" });

    const payload = JSON.parse(raw);
    if (!payload || payload.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "unauthorized" });
    }

    const fields = payload.fields || {};
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = SHEET_NAME ? ss.getSheetByName(SHEET_NAME) : ss.getSheets()[0];
    if (!sheet) return jsonResponse({ ok: false, error: "sheet not found" });

    const lastCol = sheet.getLastColumn();
    if (lastCol < 1) return jsonResponse({ ok: false, error: "no headers" });

    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const row = headers.map(function (h) {
      const key = String(h).trim();
      if (!key) return "";
      const v = fields[key];
      return v === null || v === undefined ? "" : v;
    });

    sheet.appendRow(row);
    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
