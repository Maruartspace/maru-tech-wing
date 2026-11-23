// node render.js <widthPx> <out.png>
const { chromium } = require('playwright');
(async () => {
  const w = +process.argv[2] || 1000, out = process.argv[3] || 'preview.png';
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1000, height: 1400 }, deviceScaleFactor: w / 1000 });
  await p.goto('file://' + __dirname + '/poster.html');
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  await p.locator('svg').screenshot({ path: out });
  await b.close();
})();
