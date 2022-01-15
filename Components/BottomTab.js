/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {Share, Linking} from 'react-native';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Alert,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from './context';

const shareOptions = {
  title: 'Saknni App',
  message: 'Download Saknni for Real Estate Marketing',
  url: 'www.example.com',
  subject: 'Saknni',
};
export default function BottomTab({navigation}) {
  const {colors} = useTheme();
  const {translate} = useContext(AuthContext);
  return (
    <View
      style={{
        
        flexDirection: 'column',
        backgroundColor: colors.backgroundColor,
      }}>
      <View
        style={[styles.centerBtnBack, {backgroundColor: colors.background}]}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => {
            navigation.navigate('AddAdv');
          }}>
          <View style={[styles.button, styles.actionBtn]}>
            <Icon name="plus-thick" color={colors.text} size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          backgroundColor: colors.background2,
          border: 2,
          radius: 3,
          shadowOpacity: 0.3,
          shadowRadius: 3,
          shadowOffset: {
            height: 3,
            width: 3,
          },
          x: 0,
          y: 0,
          style: {marginVertical: 5},
          bottom: 0,
          width: '100%',
          height: 70,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          paddingHorizontal: 25,
        }}>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.push('Home')}>
            <Icon name="home-city" color="#4AA1F2" size={30} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.text,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {translate('home')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            
          }}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https:www.saknni.com');
            }}>
            <Icon name="web" color={colors.text} size={30} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.text,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {translate('web')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginStart: 85,
          }}>
          <TouchableOpacity
            onPress={() => {
              Share.share(shareOptions);
            }}>
            <Icon name="share-variant" color={colors.text} size={35} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.text,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {translate('share')}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Icon name="cog" color={colors.text} size={35} />
          </TouchableOpacity>
          <Text
            style={{
              color: colors.text,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {translate('setting')}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  button: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.1,
    shadowOffset: {x: 2, y: 0},
    shadowRadius: 2,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 0,
    top: 5,
    left: 5,
    shadowOpacity: 5.0,
  },
  actionBtn: {
    backgroundColor: '#ED717F',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },

  centerBtnBack: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: '#DAD8D9',
    width: 70,
    height: 70,
    borderRadius: 35,
    bottom: 35,
    zIndex: 10,
  },
  btmCont: {},
});
