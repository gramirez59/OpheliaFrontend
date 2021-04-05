import { OpheliaTemplatePage } from './app.po';

describe('Ophelia App', function() {
  let page: OpheliaTemplatePage;

  beforeEach(() => {
    page = new OpheliaTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
