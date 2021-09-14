import React from 'react';
import {View} from '@wix/wix-react-native-ui-lib';

export function DemoTab(props) {
  const Homepage = global.engine.moduleRegistry.component('edenfirstproject.Home');

  return (
    <View flex>
      <Homepage {...props} />
    </View>
  );
}
