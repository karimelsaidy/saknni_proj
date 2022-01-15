import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
  Dimensions,
  Button,
  Text,
  TextInput,
  Alert,
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {useTheme, Avatar, Appbar, Divider} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {AuthContext} from '../Components/context';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import ModalIndicator from '../Components/ModaIndecator';
const {height} = Dimensions.get('screen');

export const AppBar = ({props}) => {
  const {translate} = useContext(AuthContext);
  const {colors} = useTheme();
  const [loadingData, setLoadingData] = useState(true);

  return (
    <Appbar.Header style={{backgroundColor: colors.statusBarBackground}}>
      <Appbar.Action
        icon="menu"
        onPress={() => {
          props.openDrawer();
        }}
      />
      <Appbar.Content title={translate('profile')} />
    </Appbar.Header>
  );
};

export default function Profile({navigation}) {
  const {translate, getToken} = useContext(AuthContext);
  const [loadingData, setLoadingData] = useState(true);

  const {colors} = useTheme();
  const [userGlob, setUserGlob] = useState('');
  const [dataHolder, setHolderData] = useState({
    userNameHolder: '',
    emailHolder: '',
    phoneHolder: '',
    imageHolder: '',
  });
  console.log(JSON.stringify(getToken()));
  useEffect(
    function x() {
      axios
        .post('http://saknni-com.preview-domain.com/api/me', {
          api_password: 'AhmedElkomy',
          token: getToken(),
        })
        .then((res) => {
          let user = res.data.data.user;
          
         
          setHolderData({
            userNameHolder: user.name,
            emailHolder: user.email,
            phoneHolder: user.phone,
          });
          setUserGlob(user);
          setLoadingData(false);
        })
        .catch((e) => {
          setLoadingData(false);
          console.log(e,"prof")

          Alert.alert(translate('neterror'), translate('neterrormsg'), [
            {text: translate('ok')},
          ]);
        });
    },
    [loadingData, getToken,translate],
  );

  return (
    <ScrollView style={styles.container}>
      {loadingData ? (
        <ModalIndicator visible={true} />
      ) : (
        <Animated.View style={styles.container}>
          <AppBar props={navigation} />
          <StatusBar
            backgroundColor={colors.statusBarBackground}
            barStyle="light-content"
          />
          <View style={styles.imgContainer}>
            {dataHolder.imageHolder ? (
              <Image
                style={styles.imgAvatar}
                source={{
                  uri:
                    'http://saknni-com.preview-domain.com/images/' +
                    dataHolder.imageHolder,
                }}
              />
            ) : (
              <Image
                source={require('../assets/avatar.png')}
                style={styles.imgAvatar}
              />
            )}
          </View>

          <Text
            style={[
              styles.textSection,
              {
                color: colors.text,
              },
            ]}>
            {translate('username')}
          </Text>
          <View style={styles.inputSection}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <Text
              style={[
                styles.txtInput,
                {
                  color: colors.text,
                },
              ]}>
              {dataHolder.userNameHolder}
            </Text>
          </View>
          <Text
            style={[
              styles.textSection,
              {
                color: colors.text,
              },
            ]}>
            {translate('email')}
          </Text>
          <View style={styles.inputSection}>
            <FontAwesome name="envelope" color={colors.text} size={20} />
            <Text
              style={[
                styles.txtInput,
                {
                  color: colors.text,
                },
              ]}>
              {dataHolder.emailHolder}
            </Text>
          </View>
          <Text
            style={[
              styles.textSection,
              {
                color: colors.text,
              },
            ]}>
            {translate('phonenum')}
          </Text>
          <View style={styles.inputSection}>
            <FontAwesome name="phone" color={colors.text} size={20} />
            <Text
              style={[
                styles.txtInput,
                {
                  color: colors.text,
                },
              ]}>
              {dataHolder.phoneHolder}
            </Text>
          </View>

          <View style={styles.submitBtnCon}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditProfile', {userId: userGlob.id})
              }>
              <Text
                style={[
                  styles.submitBtnTxt,
                  {
                    color: colors.text,
                  },
                ]}>
                {translate('changeProfile')}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    height: height * 0.2,
    backgroundColor: '#F7F7F7',
    marginBottom: 15,
  },
  imgAvatar: {
    resizeMode: 'contain',
    flex: 1,
    width: '100%',
  },
  btnAvatar: {
    width: '100%',
    justifyContent: 'center',
  },

  inputSection: {
    flex: 1,
    margin: 5,
    marginStart: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    marginTop: 15,
  },
  txtInput: {
    flex: 1,
    paddingStart: 10,
    color: '#05375a',
  },
  textSection: {
    fontSize: 18,
    marginTop: 12,
    marginStart: 3,
  },
  submitBtnCon: {
    backgroundColor: '#ED717F',
    borderRadius: 10,
    margin: 8,
    alignItems: 'center',
    padding: 10,
  },
  submitBtnTxt: {
    fontSize: 18,
  },
});
