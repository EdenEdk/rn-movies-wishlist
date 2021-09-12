import {HomeScreenTestIds} from '../src/components/Screens/Home/Home';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display the home screen root view', async () => {
    await expect(element(by.id(HomeScreenTestIds.container))).toBeVisible();
  });
});
