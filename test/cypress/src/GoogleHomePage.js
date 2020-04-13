import BasePage from './BasePage';

export class GoogleHomePage extends BasePage {
	// common locators
	googleCenterLogo = '#hplogo';

	path = '/';
}

export const google = new GoogleHomePage();
