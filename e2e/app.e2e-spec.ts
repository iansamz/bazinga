import { BazingaPage } from './app.po';

describe('bazinga App', () => {
  let page: BazingaPage;

  beforeEach(() => {
    page = new BazingaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
