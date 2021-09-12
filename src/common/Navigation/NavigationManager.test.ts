import {Navigation} from 'react-native-navigation';
import NavigationManager from './NavigationManager';
import * as StoreWrapper from './StoreWrapper';

describe('NavigationManager', () => {
  beforeAll(() => {
    const wrappedComponent:any = null;
    jest.spyOn(StoreWrapper, 'createComponentWithStore')
      .mockImplementation(() => wrappedComponent);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerNavigatorScreens', () => {
    let navigationRegisterComponentMock;
    beforeAll(() => {
      navigationRegisterComponentMock = jest.spyOn(Navigation, 'registerComponent');
    });

    it('should check that navigationRegisterComponentMock has been called', () => {
      NavigationManager.registerNavigatorScreens();
      expect(navigationRegisterComponentMock).toHaveBeenCalled();
    });
  });

  describe('pushToNavigator', () => {
    let navigationPushMock;
    beforeAll(() => {
      navigationPushMock = jest.spyOn(Navigation, 'push');
      navigationPushMock.mockImplementation((options:any) => null);
    });

    it('should check if push has been called with the right arguments', () => {
      const componentId:string = 'componentId1';
      const componentName:string = 'componentName1';
      const passProps:any = {a:1};
      const wrappedComponent:any = {
        component:{
          name:componentName,
          id:componentName,
          passProps
        }
      };
      NavigationManager.pushToNavigator(componentId, componentName, passProps);
      expect(navigationPushMock).toHaveBeenCalledWith(componentId, wrappedComponent);
    });
  });

  describe('initNavigator', () => {
    let navigationSetDefaultOptionsMock;
    let navigationSetRootMock;
    beforeAll(() => {
      navigationSetDefaultOptionsMock = jest.spyOn(Navigation, 'setDefaultOptions');
      navigationSetDefaultOptionsMock.mockImplementation((options:any) => null);
      navigationSetRootMock = jest.spyOn(Navigation, 'setRoot');
      navigationSetRootMock.mockImplementation((options:any) => null);
    });

    it('should check that setDefaultOptions has been called', () => {
      NavigationManager.initNavigator();
      expect(navigationSetDefaultOptionsMock).toHaveBeenCalled();
      expect(navigationSetRootMock).toHaveBeenCalled();
    });
  });
});
