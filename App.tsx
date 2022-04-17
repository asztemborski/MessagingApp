import 'react-native-gesture-handler';
import React from 'react';
import {View} from 'react-native';
import Navigation from './navigation';
import {Amplify, Auth} from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App: React.FunctionComponent = () => {
  Auth.currentAuthenticatedUser();

  return (
    <View style={{width: '100%', height: '100%', backgroundColor: 'red'}}>
      <Navigation />
    </View>
  );
};

export default withAuthenticator(App);
