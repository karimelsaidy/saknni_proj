import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  Modal,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {useTheme} from 'react-native-paper';
import ModalIndicator from '../Components/ModaIndecator';

import {AuthContext} from '../Components/context';
let initializeHandleChange = true;

const SignInScreen = ({navigation}) => {
  //extract colors theme
  const {colors} = useTheme();
  //extract translate
  const {translate} = useContext(AuthContext);
  //use sign in mathod from context
  const {signIn} = useContext(AuthContext);

  //initialize signin data
  const [data, setData] = useState({
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: false,
  });
  //modal appearance
  const [visible, setVisible] = useState(false);

  //show and hide password
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  //check email valid or not
  const checkEmailValidality = (email) => {
    if (email.trim().length < 5) {
      setData({...data, isValidEmail: null});
      return;
    }
    if (email.includes('.') !== true || email.includes('@') !== true) {
      console.log('cont');
      setData({...data, isValidEmail: false});
      return;
    }
    setData({...data, email: email, isValidEmail: true});
  };
  // check password validality
  const checkPasswordValidality = (password) => {
    if (password.trim().length < 8) {
      setData({...data, isValidPassword: false});
      return;
    }
    setData({...data, isValidPassword: true, password: password});
  };
  //check user name and password correct or not
  const loginHandle = (email, password) => {
    initializeHandleChange = false;

    if (true) {
      setVisible(true);
    }
    try {
      axios
        .post('http://saknni-com.preview-domain.com/api/login', {
          api_password: 'AhmedElkomy',
          email: email,
          password: password,
        })
        .then((res) => {
          setVisible(false);
          console.log(res.data);
          if (res.data.status) {
            signIn(res.data.user);
          } else {
            Alert.alert(translate('invaliduser'), translate('orincorrect'), [
              {text: translate('ok')},
            ]);
          }
        })
        .catch(() => {
          setVisible(false);
          Alert.alert(translate('neterror'), translate('neterrormsg'), [
            {text: translate('ok')},
          ]);
        });
    } catch (e) {
      setVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ED717F" barStyle="light-content" />

      <ModalIndicator visible={visible} />
      <View style={styles.header}>
        <Text style={styles.text_header}>{translate('saknni')}</Text>
      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}>
        <ScrollView>
          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
              },
            ]}>
            {translate('email')}
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={colors.text} size={20} />
            <TextInput
              placeholder={translate('emailholder')}
              placeholderTextColor="#666666"
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => checkEmailValidality(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidEmail || initializeHandleChange ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translate('invalidEmail')}</Text>
            </Animatable.View>
          )}

          <Text
            style={[
              styles.text_footer,
              {
                color: colors.text,
                marginTop: 35,
              },
            ]}>
            {translate('pass')}
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color={colors.text} size={20} />
            <TextInput
              placeholder={translate('passholder')}
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[
                styles.textInput,
                {
                  color: colors.text,
                },
              ]}
              autoCapitalize="none"
              onChangeText={(val) => checkPasswordValidality(val)}
            />

            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isValidPassword || initializeHandleChange ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translate('longpass')}</Text>
            </Animatable.View>
          )}

          <TouchableOpacity>
            <Text style={{color: '#009387', marginTop: 15}}>
              {translate('forget')}
            </Text>
          </TouchableOpacity>

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                loginHandle(data.email, data.password);
              }}>
              <LinearGradient
                colors={['#ED717F', '#ED7160']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  {translate('signin')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignUpPage')}
              style={[
                styles.signOut,
                {
                  borderColor: '#ED717F',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                {translate('signup')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ED717F',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingStart: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signOut: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
