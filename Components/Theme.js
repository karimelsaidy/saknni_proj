import React from 'react';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  DefaultTheme,
} from 'react-native-paper';

//return the theme according to input 
export default function Theme(appIsDarkTheme) {
  //create the default theme for the app
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#DAD8D9',
      background2: '#EAE3E3',
      text: '#333333',
      txtHolder: '#888',
      statusBarBackground: '#EAE3E3',
      border: '#ED717F',
      cardBack: '#CDCED2',
      cardSec: '#54B0F3',
      cardSec2:'#DBE0EA',
      cardIcon: '#000',
    },
  };
  //create the dark theme for the app
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#15202B',
      background2: '#202E3B',
      text: '#ffffff',
      txtHolder: '#bbbbbb',
      statusBarBackground: '#202E3B',
      border: '#4AA1F2',
      cardBack: '#BCBDC8',
      cardSec: '#E3E3E1',
      cardSec2:'#DBE0EA',
      cardIcon: '#fff',
    },
  };
  return appIsDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
}
