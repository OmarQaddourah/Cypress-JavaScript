/* global browser, by, element, protractor */

const EC = protractor.ExpectedConditions;

/**
 	* Navigates to this page
 	* path should be set for each page
*/
async function navigateTo(path) {
	return browser.get(path);
}

/**
	 * Retrieves an element by css selector
	 * @param {String} element The string contains the value of the locator used
*/
async function getElementByCss(element) {
	return element(by.css(element));
}

/**
	 * Retrieves an element by id
	 * @param {String} element The string contains the value of the locator used
*/
async function getElementById(element) {
	return element(by.id(element));
}

/**
	 * Retrieves an element by class name
	 * @param {String} element The string contains the value of the locator used
*/
async function getElementByClassName(element) {
	return element(by.className(element));
}

async function scrollToElement(element) {
	const script = await `document.querySelector(${element}).scrollIntoView()`
	return browser.executeScript(script);
}


module.exports = {
	navigateTo,
	getElementByClassName,
	getElementByCss,
	getElementById,
	scrollToElement
};
