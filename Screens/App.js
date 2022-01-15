import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, SafeAreaView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Provider as PaperProvider} from 'react-native-paper';
//import context and async storage and translation
import {AuthContext} from '../Components/context';
import AsyncStorage from '@react-native-community/async-storage';
import {Translate, SetI18nConfig} from '../translation/TranslationLogic';
//import theme
import Theme from '../Components/Theme';
//import Screens
import HomeScreen from './Home.js';
import DrawerContent from '../Components/DrawerContent';
import RootPage from './RootPage';
import Profile from './Profile';
import EditProfile from './EditProfile';

import Bookmarks from './Bookmarks.js';
import Support from './Support';
import AboutUs from './AboutUs';
import SpecialOffers from './SpecialOffers';
import MyAds from './MyAds';

//create drawer navigatior
const Drawer = createDrawerNavigator();


let token = '';

export default function App() {
  const [refreshApp, setRefresh] = useState(false);

  //set language status of the app
  const [lang, setLang] = useState({lang: '', isRTL: ''});
  //set language according to language stus
  SetI18nConfig({languageTagInp: lang.lang, isRTLInp: lang.isRTL});
  //dark theme status
  const [appIsDarkTheme, setAppIsDarkTheme] = useState(false);
  //choose the theme for the app
  const theme = Theme(appIsDarkTheme);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };
  const [dataApp, setDataApp] = useState({
    govs: '',
    list_views: '',
    type_finish: '',
    type_payment: '',
    type_property: '',
  }) 
  let govs = '';
  let list_views = '';
  let [user,setUser] = useState('');
  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.username,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };
  //get token
  try {
    AsyncStorage.getItem('user_token').then((tok) => (token = tok));
  } catch (e) {}
  try {
  }catch (e) {}

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
       
        const userToken = String(foundUser.token);
        const userName = foundUser.name;
        const id = foundUser.id;

        try {
          await AsyncStorage.setItem('user_token', userToken);
          await AsyncStorage.setItem('id', String(id));
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({type: 'LOGIN', username: userName, token: userToken});
      },
      signOut: async () => {
        try {
          await AsyncStorage.removeItem('user_token');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        console.log(refreshApp, 'ref1');
        setRefresh(!refreshApp);
      },
      toggleTheme: () => {
        setAppIsDarkTheme((appIsDarkTheme) => !appIsDarkTheme);
      },
      changeLangAr: () => {
        if (lang.lang !== 'ar') {
          setLang({lang: 'ar', isRTL: true});
        }
      },
      changeLangEn: () => {
        if (lang.lang !== 'en') {
          setLang({lang: 'en', isRTL: false});
        }
      },
      translate: (key) => {
        return Translate(key);
      },
      getToken: () => {
        return token;
      },
      setDataAppHandle: (val) => {
        setDataApp(val);
      },
      getDataApp: () => {
        return dataApp;
      },
      setUser:(user_me)=>{
        setUser(user_me.id)
      },
      getUserId:()=>{
        return user;
      }
    }),

    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('user_token');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <SafeAreaView style={{flex: 1}}>
          <NavigationContainer theme={theme}>
            {loginState.userToken !== null ? (
              <Drawer.Navigator
                initialRouteName="Home"
                drawerContent={(props) => <DrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="AboutUs" component={AboutUs} />
                <Drawer.Screen name="Profile" component={Profile} />
                <Drawer.Screen name="Bookmarks" component={Bookmarks} />
                <Drawer.Screen name="Support" component={Support} />
                <Drawer.Screen name="SpecialOffers" component={SpecialOffers} />
                <Drawer.Screen name="EditProfile" component={EditProfile} />
                <Drawer.Screen name="MyAds" component={MyAds} />
              </Drawer.Navigator>
            ) : (
              <RootPage />
            )}
          </NavigationContainer>
        </SafeAreaView>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
