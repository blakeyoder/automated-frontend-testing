const puppeteer = require('puppeteer');
const crypto = require('crypto');
const {testUser} = require('../fixtures/user_fixtures');

describe('Lendly e2e loan flow', () => {
  beforeAll(async () => {
    await page.goto('https://lendly.fk', {waitUntil: 'load'});
    // hack to get dom elements to appear in headless mode
    await page.setViewport({width: 2000, height: 1200});
    console.log('Opening up `lendly.fk`...');
  });

  it('user can sign up for a loan', async done => {
    await Promise.all([
      page.click('.site-nav__list > li:nth-child(7)'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);
    
    console.log('Cicking `Get Started`...');

    await page.select('#piYsState', 'IN');

    console.log('Selecting Indiana from dropdown...');

    await Promise.all([
      page.click('button'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    await page.click('#inEmprName');
    await page.type('#inEmprName', 'wal ma', {delay: 80});
    console.log('Using `wal mart` as employer name...');
    await page.keyboard.down('ArrowDown');
    console.log('Arrow down...');
    await page.click('button');
    console.log('Submit employeer info...');
    await page.select('#start_month', '8');
    await page.select('#start_year', '2013');
    console.log('Selecting starting dates...');

    await Promise.all([
      page.click('button'),
      console.log('Navigating to next page...'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    await Promise.all([
      page.click('#isBankrupt > li:nth-child(2)'),
      console.log('Selecting `no`. Im not declaring bankruptcy...'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    await Promise.all([
      page.click('#activeMilitaryCustomer > li:nth-child(2)'),
      console.log('Selecting `no`. Im not military...'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);
    const {username, password} = testUser;

    await page.type('#emailAddress', username, {delay: 50});
    await page.type('#pwd', password, {delay: 50});

    await Promise.all([
      page.click('.btn-icon--arrow'),
      console.log('Creating new account...'),
      page.waitForNavigation({waitUntil: 'load'}),
    ]);

    console.log(`Created user with creds: ${JSON.stringify({username, password})}`);

    done();

  }, 500000);
})
