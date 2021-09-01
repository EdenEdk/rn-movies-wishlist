describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the home screen title text', async () => {
    await expect(element(by.id('homescreen:text:title'))).toBeVisible();
  });

  it('should show movie details screen after tap', async () => {
    await element(by.id('homescreen:button:open-movie-details')).tap();
    await expect(element(by.id('moviedetailsscreen:text:title'))).toBeVisible();
  });
});
