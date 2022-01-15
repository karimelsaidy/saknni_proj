import React, {useContext} from 'react';
import {View, StyleSheet, Image, Dimensions, I18nManager} from 'react-native';
import {
  useTheme,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from './context';
import AsyncStorage from '@react-native-community/async-storage';
let token = '';
const {height} = Dimensions.get('screen');
export default function DrawerContent(props) {
  const paperTheme = useTheme();
  const {colors} = useTheme();
  const {signOut, toggleTheme, translate} = useContext(AuthContext);
 
  return (
    <View style={{flex: 1}}>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
      </View>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}></View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label={translate('home')}
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label={translate("profile")}
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            />
                 <DrawerItem
              icon={({color, size}) => (
                <Icon name="tag" color={color} size={size} />
              )}
              label={translate("offer")}
              onPress={() => {
                props.navigation.navigate('SpecialOffers');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="calendar-edit" color={color} size={size} />
              )}
              label={translate("myad")}
              onPress={() => {
                props.navigation.navigate('MyAds');
              }}
            />
                <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label={translate("bookmarks")}
              onPress={() => {
                props.navigation.navigate('Bookmarks');
              }}
            />
                        </Drawer.Section>

            <Drawer.Section>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="information-outline" color={color} size={size} />
              )}
              label={translate("about")}
              onPress={() => {
                props.navigation.navigate('AboutUs');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="lifebuoy" color={color} size={size} />
              )}
              label={translate("support")}
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title={translate("preferences")}>
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>{translate('darktheme')}</Text>
                <View pointerEvents="none">
                  <Switch
                    color={colors.border}
                    style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
                    value={paperTheme.dark}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label={translate("signout")}
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: height * 0.15,
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    width: '100%',
    backgroundColor: '#DAD8D9',
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
