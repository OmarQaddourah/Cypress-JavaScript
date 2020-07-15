import BasePage from './BasePage';

export class GoogleHomePage extends BasePage {
  // common locators

  feelingLuckyButton = 'div[class="FPdoLc tfB0Bf"] input[class="RNmpXc"]';
  gmailButton = '[class="gb_g"][data-pid="23"]';
  gmailLogo = '.h-c-header--product-marketing-one-tier .h-c-header__bar .h-c-header__lockup';
  googleAppsButton = '#gbwa a';
  googleCenterLogo = '[id="hplogo"]';
  googleImagesLogo = '[class="logo-subtext"]';
  imagesButton = '[class="gb_g"][data-pid="2"]';
  latestTitle = '[id="latest-title"]';
  searchField = 'input[class="gLFyf gsfi"]';
  searchList = 'ul[class="erkvQe"]';
  searchResult = '[id="result-stats"]';
  socialSharingIcons = '[class="card"] [id="sharel"] a';
  topDateBox = '[class="card"]';

  path = '/';
}

export const google = new GoogleHomePage();
