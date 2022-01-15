//import components
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashPage from './SplashPage';
import SignInPage from './SignInPage';
import SignUpPage from './SignUpPage';

//create stack navigator for screens navigation
const RootStack = createStackNavigator();

//return root page
const RootPage = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashPage" component={SplashPage} />
    <RootStack.Screen name="SignInPage" component={SignInPage} />
    <RootStack.Screen name="SignUpPage" component={SignUpPage} />
  </RootStack.Navigator>
);

export default RootPage;
