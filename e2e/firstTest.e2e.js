describe('Example', () => {
  beforeAll(async () => {
    console.log('hello')
    await device.launchApp({newInstance:true});
    console.log('done')
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the home screen', async () => {
    await expect(element(by.id('home-screen-text'))).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });
  //
  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
