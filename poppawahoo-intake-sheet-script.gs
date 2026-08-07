/**
 * Poppa Wahoo intake form -> Google Sheet
 * Connects poppawahoo-intake.html to a Google Sheet (and emails you on each submission).
 *
 * This is SEPARATE from the local-business intake and the MANTA intake. It writes to its
 * own "Poppa Wahoo Intake" tab, so the existing forms and sheet keep working untouched.
 *
 * SETUP (about 5 minutes):
 *  1. Reusing the same crossdesigns intake sheet (SHEET_ID already set below).
 *  2. Go to https://script.google.com -> New project. Delete the sample code, paste ALL of this.
 *  3. Save.
 *  4. Deploy -> New deployment -> type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *     Click Deploy, authorize when asked, then COPY the Web app URL.
 *  5. Open poppawahoo-intake.html, find  var ENDPOINT = "[PASTE_POPPAWAHOO_APPS_SCRIPT_WEB_APP_URL]"
 *     and paste that URL in.
 *  6. Test it: open the form, submit once, confirm a row lands in the "Poppa Wahoo Intake" tab.
 */

var SHEET_ID = '1b2AT8UYc6yRy4bRRuiXG1hd9-nUFiCHyb3cbRtyyoPk'; // reusing the crossdesigns intake sheet
var SHEET_NAME = 'Poppa Wahoo Intake'; // its own tab, separate from the other intake tabs
var NOTIFY_EMAIL = 'cross@crossdesigned.com'; // notifications go here on each submission

var FIELDS = ['submitted_at','email','business_name','contact_name','phone','business_email','address','hours',
  'trips_rates','trip_notes',
  'boat_poppa_wahoo','boat_poppa_wahoo_photos','boat_wahoo_too','boat_wahoo_too_photos',
  'boat_poppa_bay','boat_poppa_bay_photos','boat_poppa_toon','boat_poppa_toon_photos','boats_other',
  'captains','captain_bios','capt_brian_photo','capt_david_photo','capt_skip_photo','capt_george_photo',
  'site_corrections','search_phrases',
  'shop_interest','shop_items','shop_details',
  'photos_link','photos_notes','anything_else'];

function doPost(e){
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try{
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if(sheet.getLastRow() === 0){ sheet.appendRow(FIELDS); }
    var p = e.parameter;
    var row = FIELDS.map(function(f){ return p[f] || ''; });
    sheet.appendRow(row);

    if(NOTIFY_EMAIL){
      MailApp.sendEmail(NOTIFY_EMAIL,
        'Poppa Wahoo intake submitted' + (p.contact_name ? ' by ' + p.contact_name : ''),
        'Brian filled out the Poppa Wahoo intake.\n\n' +
        'Contact: ' + (p.contact_name||'') + '\n' +
        'Email: ' + (p.email||'') + '\n' +
        'Trips & rates: ' + (p.trips_rates||'') + '\n' +
        'Shop: ' + (p.shop_interest||'not answered') + '\n\n' +
        'Full details are in the Poppa Wahoo Intake tab of your sheet.');
    }
    return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
  } catch(err){
    return ContentService.createTextOutput(JSON.stringify({ok:false, error:String(err)})).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
