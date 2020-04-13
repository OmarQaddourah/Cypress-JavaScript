/* global Cypress */

Cypress.Commands.add('iframe', { prevSubject: 'element' }, ($iframe, selector) => {
	Cypress.log({
		name: 'iframe',
		consoleProps() {
			return {
				iframe: $iframe,
			};
		},
	});
	return new Cypress.Promise((resolve) => {
		resolve($iframe.contents().find(selector));
	});
});

/**
 * close popup window.
 */
Cypress.Commands.add('closeWindow', (url) => {
	const opened = window.top.open(url, 'Article Share', 'width=400,height=500,resizable=no');
	return opened.close();
});
