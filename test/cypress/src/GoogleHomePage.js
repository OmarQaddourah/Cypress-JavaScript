import BasePage from './BasePage';

export class GoogleHomePage extends BasePage {
  // common locators

  googleCenterLogo = 'div > img';

  path = '/';
}

export const google = new GoogleHomePage();
