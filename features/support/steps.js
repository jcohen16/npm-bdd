const { Given, When, Then, setDefaultTimeout } = require('cucumber')
const { expect } = require('chai')
const {Builder, By, Key, until} = require('selenium-webdriver');
const { sleep } = require('sleep');

setDefaultTimeout(60 * 1000);

Given('a variable set to {int}', function(number) {
  this.setTo(number)
})

When('I increment the variable by {int}', function(number) {
  this.incrementBy(number)
})

Then('the variable should contain {int}', function(number) {
  expect(this.variable).to.eql(number)
})

Given('I open google', function(done){

  (async function example() {
    const driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('http://www.google.com/ncr');
      // await driver.findElement(By.className('gsfi')).sendKeys('webdriver', Key.RETURN);
	  
	  await driver.wait(until.elementLocated(By.css('.gsfi'), 1000)).sendKeys('webdriver', Key.RETURN);
	  
      await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
      var pause = 5;
      console.log(`Pausing for ${pause} secs`);
      sleep(pause);
	  done();
    } catch(e) {
		done(e);
	}finally {
      await driver.quit();
    }
  })();
})