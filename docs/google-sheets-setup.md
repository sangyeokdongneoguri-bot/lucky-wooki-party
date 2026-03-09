Google Sheets RSVP Setup Guide

This guide explains how to collect RSVP responses into Google Sheets using Google Apps Script.

---

## Step 1: Create a Google Sheet

1. Go to https://sheets.google.com and create a new spreadsheet.
2. Name it something like "Lucky Wooki Party RSVP".
3. In the first row, add these column headers exactly:

   A1: 타임스탬프
   B1: 이름
   C1: 참석여부
   D1: 참석시간
   E1: 측(신부/신랑)

---

## Step 2: Open the Apps Script Editor

1. In the spreadsheet, click Extensions > Apps Script.
2. Delete any existing code in the editor.
3. Paste the following script:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.attendance,
    data.time || '',
    data.side,
  ]);
  return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click File > Save. Name the project (e.g., "RSVP Handler").

---

## Step 3: Deploy as a Web App

1. Click Deploy > New deployment.
2. Click the gear icon next to "Select type" and choose Web app.
3. Set the following options:
   - Description: RSVP handler
   - Execute as: Me
   - Who has access: Anyone
4. Click Deploy.
5. Authorize the script when prompted (click "Allow").
6. Copy the Web app URL shown after deployment.

---

## Step 4: Add the URL to the React component

Open `src/components/RsvpForm.tsx` and set `GOOGLE_SCRIPT_URL`:

```typescript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
```

Replace `YOUR_SCRIPT_ID` with the actual ID from the URL you copied.

---

## Notes on CORS

The fetch call in `RsvpForm.tsx` uses `mode: 'no-cors'` to avoid CORS errors.
This means the browser will not read the response body, but the request still
reaches the Apps Script and data is written to the sheet correctly.

If you need to read the response (e.g., for error handling), you must add
CORS headers. Apps Script does not support custom CORS headers on doPost
responses natively — the standard workaround is to use a proxy or accept
no-cors mode (recommended for this use case).

---

## Testing the Script

You can test the Apps Script directly in the editor:

1. In the editor, create a test function:

```javascript
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name: '테스트',
        attendance: '참석',
        time: '',
        side: '신부측',
      }),
    },
  };
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}
```

2. Select `testDoPost` from the function dropdown and click Run.
3. Check the spreadsheet — a new row should appear.
