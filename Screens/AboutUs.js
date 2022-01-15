import React, {useContext} from 'react';

import {View, Text, StyleSheet, Image} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Linking} from 'react-native';
import {AuthContext} from '../Components/context';


export const AppBar = ({props}) => {
  const {colors} = useTheme();
  const {translate} = useContext(AuthContext);

  return (
    <Appbar.Header style={{backgroundColor: colors.statusBarBackground}}>
      <Appbar.Action
        icon="menu"
        onPress={() => {
          props.openDrawer();
        }}
      />
      <Appbar.Content title={translate('about')} />
    </Appbar.Header>
  );
};

export default function AboutUs({navigation}) {
  const {translate} = useContext(AuthContext);

  const {colors} = useTheme();
  return (
    <View style={{flex: 1}}>
      <AppBar props={navigation} />
      <View style={styles.BookmarksCon}>
        <Image source={require('../assets/logo.png')} style={styles.img} />
        <Text style={[styles.aboutTxt, {color: colors.text}]}>
         {translate("aboutus")}
        </Text>

        <View style={styles.btnCon}>
          <View style={styles.btnSubCon}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Linking.openURL(
                  'https://www.facebook.com/7.karim.m.abdelkarim',
                );
              }}>
              <FontAwesome
                name="facebook-square"
                color={colors.text}
                size={25}
              />
              <Text style={[styles.btnTxt, {color: colors.text}]}>
            {translate('mobdev')}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.btnSubCon}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                Linking.openURL('https://www.facebook.com/ahmed.elkomy.7902');
              }}>
              <FontAwesome
                name="facebook-square"
                color={colors.text}
                size={25}
              />
              <Text style={[styles.btnTxt, {color: colors.text}]}>
                {translate('webdev')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BookmarksCon: {
    flex: 1,
    alignItems: 'center',
  },
  img: {
    resizeMode: 'cover',
    margin: 5,
  },
  aboutTxt: {
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    backgroundColor: '#D9C8C0',
  },
  btnCon: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  btnSubCon: {
    backgroundColor: "#4267B2",
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 2,
  },
  btn: {
    flexDirection: 'row',
  },
  btnTxt: {
    fontSize: 18,
    marginLeft: 6,
  },
});
