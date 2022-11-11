import BasePage from './BasePage';

export class GoogleHomePage extends BasePage {
  // common locators

  googleCenterLogo = 'img[alt="Google"]';

  path = '/';
}

export const google = new GoogleHomePage();
