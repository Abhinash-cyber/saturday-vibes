const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('Generating 4-in-1 Master Poster Sheet...');

// Read 4 sheets as base64
const img1 = fs.readFileSync(path.join(rootDir, 'saturday_vibes_a3_sheet_1.png')).toString('base64');
const img2 = fs.readFileSync(path.join(rootDir, 'saturday_vibes_a3_sheet_2.png')).toString('base64');
const img3 = fs.readFileSync(path.join(rootDir, 'saturday_vibes_a3_sheet_3.png')).toString('base64');
const img4 = fs.readFileSync(path.join(rootDir, 'saturday_vibes_a3_sheet_4.png')).toString('base64');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Saturday Vibes - 4-in-1 Master Sheet</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 0;
      margin: 0;
    }
    .poster-container {
      width: 1440px;
      height: 1018px;
      background: #ffffff;
      padding: 24px 32px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .poster-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 12px;
      margin-bottom: 12px;
    }
    .poster-title {
      font-size: 22px;
      font-weight: 900;
      color: #0f172a;
      letter-spacing: -0.5px;
    }
    .poster-sub {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
      margin-top: 3px;
    }
    .poster-badge {
      background: #ffe4e6;
      border: 1px solid #fecdd3;
      color: #be123c;
      font-size: 11px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 20px;
      letter-spacing: 0.2px;
    }
    .grid-2x2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
      gap: 16px;
      flex: 1;
      height: 890px;
    }
    .sheet-tile {
      background: #ffffff;
      border: 1.5px solid #e2e8f0;
      border-radius: 14px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
    }
    .sheet-tile-header {
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
      padding: 6px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      font-weight: 800;
      color: #334155;
    }
    .sheet-tile-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  </style>
</head>
<body>
  <div class="poster-container">
    <div class="poster-header">
      <div>
        <div class="poster-title">Saturday Vibes — Reimagining Saturdays: Making Campus Activities Irresistible</div>
        <div class="poster-sub">Digital Engineering Lab Capstone Project • MVGR Autonomous College of Engineering</div>
      </div>
      <div class="poster-badge">4 Presentation Sheets • Complete 12-Screen Experience</div>
    </div>
    <div class="grid-2x2">
      <div class="sheet-tile">
        <div class="sheet-tile-header">
          <span>Sheet 1: Authentication & Home Hub</span>
          <span style="color: #f43f5e; font-weight: 800;">3 Screens</span>
        </div>
        <img class="sheet-tile-img" src="data:image/png;base64,${img1}" />
      </div>
      <div class="sheet-tile">
        <div class="sheet-tile-header">
          <span>Sheet 2: Discovery, Event Details & Buddy Mode</span>
          <span style="color: #f43f5e; font-weight: 800;">3 Screens</span>
        </div>
        <img class="sheet-tile-img" src="data:image/png;base64,${img2}" />
      </div>
      <div class="sheet-tile">
        <div class="sheet-tile-header">
          <span>Sheet 3: Vibe Quiz, Match Engine & Host Portal</span>
          <span style="color: #f43f5e; font-weight: 800;">3 Screens</span>
        </div>
        <img class="sheet-tile-img" src="data:image/png;base64,${img3}" />
      </div>
      <div class="sheet-tile">
        <div class="sheet-tile-header">
          <span>Sheet 4: Live Itinerary, Student Badges & Persona Meera</span>
          <span style="color: #f43f5e; font-weight: 800;">3 Screens</span>
        </div>
        <img class="sheet-tile-img" src="data:image/png;base64,${img4}" />
      </div>
    </div>
  </div>
</body>
</html>`;

const tempHtmlPath = path.join(rootDir, 'scripts', 'temp_master_poster.html');
fs.writeFileSync(tempHtmlPath, html, 'utf-8');

const outPath = path.join(rootDir, 'saturday_vibes_master_4in1_sheet.png');
const tempDir = path.join(process.env.TEMP || 'C:\\Windows\\Temp', 'chrome_temp_master_' + Date.now());

const cmd = `"${chromePath}" --headless=new --disable-gpu --user-data-dir="${tempDir}" --window-size=1440,1018 --screenshot="${outPath}" "file:///${tempHtmlPath.replace(/\\\\/g, '/')}"`;

try {
  const result = execSync(cmd, { encoding: 'utf-8' });
  console.log(result);
  console.log('✓ Master 4-in-1 Sheet rendered successfully at:', outPath);
} catch (e) {
  console.error('Render error:', e.message);
}
