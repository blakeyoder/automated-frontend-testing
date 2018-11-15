const puppeteer = require('puppeteer');

describe('Lendly e2e loan flow', () => {
  beforeAll(async () => {
    await page.goto('https://getlendly.com', {waitUntil: 'load'});
    await page.setViewport({width: 0, height: 0});
  });

  it('user can sign up for a loan', async () => {
    await Promise.all([
      page.click('.site-nav__list > li:nth-child(7)'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    await page.select('#piYsState', 'IN');

    await Promise.all([
      page.click('button'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    await page.click('#inEmprName');
    await page.type('#inEmprName', 'wal mart', {delay: 120});
    await page.keyboard.down('ArrowDown');
    await page.click('button');
    await page.select('#start_month', '10');
    await page.select('#start_year', '2013');

    await Promise.all([
      page.click('button'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    await Promise.all([
      page.click('#isBankrupt > li:nth-child(2)'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    await Promise.all([
      page.click('#activeMilitaryCustomer > li:nth-child(2)'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);
  }, 15000);
})
