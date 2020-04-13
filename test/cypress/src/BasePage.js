/* global cy, Cypress */

/**
 * Base page class for other pages to extend
 * @class BasePage
 */
export default class BasePage {
	// variables
	defaultCommandTimeout = Cypress.config.defaultCommandTimeout;

	/**
 	* Navigates to this page.
 	* this.path should be set for each page that extends BasePage
 	*/
	go() {
		cy.visit(this.path);
	}

	/**
	 * Retrieves element and scrolls page so element is visible
 	 * @param {String} element The string contains the value of the locator used
	 * @param {Number} timeout The number is equal to a default timeout value if one is not passed as a parameter.
	 * If one is passed as a parameter then the number is equal to that value.
 	 */
	scrollToElement(element, timeout = this.defaultCommandTimeout) {
		return cy.get(element, { timeout }).scrollIntoView();
	}

	/**
	 * Clicks an element
	 * @param {String} element The string contains the value of the locator used
	 * * @param {Number} timeout The number is equal to a default timeout value if one is not passed as a parameter.
	 * If one is passed as a parameter then the number is equal to that value.
	 */
	clickElement(element, timeout = this.defaultCommandTimeout) {
		return cy.get(element, { timeout }).click();
	}

	/**
	 * Retrieves an element
	 * @param {String} element The string contains the value of the locator used
	 * * @param {Number} timeout The number is equal to a default timeout value if one is not passed as a parameter.
	 * If one is passed as a parameter then the number is equal to that value.
	 */
	getElement(element, timeout = this.defaultCommandTimeout) {
		return cy.get(element, { timeout });
	}
}
