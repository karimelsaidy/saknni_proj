import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {AuthContext} from '../Components/context';
import ModalIndicator from '../Components/ModaIndecator';
import axios from 'axios';

let initializeHandleChange = true;

const SignUpScreen = ({navigation}) => {
  const {translate, signUp, signIn} = useContext(AuthContext);
  //intialize sign up data
  const [data, setData] = React.useState({
    userName: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  //initialize sign up validation
  const [validation, setIsValid] = useState({
    isValidUserName: false,
    isValidEmail: false,
    isvalidPasswordConfirmation: false,
    isValidPassword: false,
    isValidPhone: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  const [visible, setVisible] = useState(false);

  //check user name validation
  const handleUserName = (userName) => {
    if (userName.trim().length < 4) {
      setIsValid({...validation, isValidUserName: false});
      return;
    }
    //regex expression to check special characters
    if (/^[a-zA-Z0-9- ]*$/.test(userName) == false) {
      setIsValid({...validation, isValidUserName: false});
      return;
    }
    setIsValid({...validation, isValidUserName: true});
    setData({...data, userName: userName});
  };

  //check email validation
  const checkEmailValidality = (email) => {
    if (email.trim().length < 5) {
      setIsValid({...validation, isValidEmail: false});
      return;
    }
    if (email.includes('.') !== true || email.includes('@') !== true) {
      setIsValid({...validation, isValidEmail: false});
      return;
    }
    setIsValid({...validation, isValidEmail: true});
    setData({...data, email: email});
  };
  //check phone name validation
  const handlePhone = (phone) => {
    if (phone.trim().length != 11) {
      setIsValid({...validation, isValidPhone: false});
      return;
    }
    //regex expression to check special characters
    if (/^[0-9- ]*$/.test(phone) == false) {
      setIsValid({...validation, isValidPhone: false});
      return;
    }
    setIsValid({...validation, isValidPhone: true});
    setData({...data, phone: phone});
  };

  // check password validality
  const checkPasswordValidality = (password) => {
    if (password.trim().length < 8) {
      setIsValid({...validation, isValidPassword: false});
      return;
    }
    setIsValid({...validation, isValidPassword: true});
    setData({...data, password: password});
  };
  //check if password are identical or not
  const checkConfirmationPasswordValidality = (password) => {
    if (password !== data.password) {
      setIsValid({...validation, isvalidPasswordConfirmation: false});
      return;
    }
    setIsValid({...validation, isvalidPasswordConfirmation: true});
    setData({...data, confirm_password: password});
  };
  //check user name and password correct or not
  const signUpHandle = () => {
    initializeHandleChange = false;
    setVisible(true);
    console.log(data);
    console.log(validation);
    if (
      validation.isValidUserName &&
      validation.isValidPhone &&
      validation.isValidEmail &&
      validation.isvalidPasswordConfirmation &&
      validation.isValidPassword
    ) {
      try {
        axios
          .post('http://saknni-com.preview-domain.com/api/register', {
            api_password: 'AhmedElkomy',

            name: data.userName,
            email: data.email,
            phone: data.phone,
            password: data.password,
            password_confirmation: data.confirm_password,
          })
          .then((res) => {
            setVisible(false);
            if (res.data.status) {
              navigation.navigate('SignInPage');

            } else {
              Alert.alert(translate('registererror'), translate('emailexist'), [
                {text: translate('ok')},
              ]);
            }
            signUp();
          })
          .catch((e) => {
            setVisible(false);
            console.log(e, 'ee');
            Alert.alert(translate('neterror'), translate('neterrormsg'), [
              {text: translate('ok')},
            ]);
          });
      } catch (e) {
        setVisible(false);
      }
    } else {
      setVisible(false);
      Alert.alert(translate('registererror'), translate('entervalidregister'), [
        {text: translate('ok')},
      ]);
    }
  };

  const updateSecureTextEntry = () => {
    setIsValid({
      ...validation,
      secureTextEntry: !validation.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setIsValid({
      ...validation,
      confirm_secureTextEntry: !validation.confirm_secureTextEntry,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#ED717F" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>{translate('register')}</Text>
      </View>
      <ModalIndicator visible={visible} />
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>{translate('username')}</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder={translate('userholder')}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleUserName(val)}
            />
            {validation.isValidUserName ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {validation.isValidUserName || initializeHandleChange ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translate('validusername')}</Text>
            </Animatable.View>
          )}
          <Text style={styles.text_footer}>{translate('email')}</Text>
          <View style={styles.action}>
            <FontAwesome name="envelope" color="#05375a" size={20} />
            <TextInput
              placeholder={translate('emailholder')}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => checkEmailValidality(val)}
            />
          </View>
          {validation.isValidEmail || initializeHandleChange ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translate('invalidEmail')}</Text>
            </Animatable.View>
          )}

          <Text style={styles.text_footer}>{translate('phone')}</Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color="#05375a" size={20} />
            <TextInput
              placeholder={translate('phoneholder')}
              keyboardType="phone-pad"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePhone(val)}
            />
          </View>
          {validation.isValidPhone || initializeHandleChange ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translate('invalidphone')}</Text>
            </Animatable.View>
          )}
          <Text style={styles.text_footer}>{translate('pass')}</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder={translate('passholder')}
              secureTextEntry={validation.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => checkPasswordValidality(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {validation.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {validation.isValidPassword || initializeHandleChange ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translate('longpass')}</Text>
            </Animatable.View>
          )}

          <Text style={styles.text_footer}>{translate('conpass')}</Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder={translate('conpassholder')}
              secureTextEntry={
                validation.confirm_secureTextEntry ? true : false
              }
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => checkConfirmationPasswordValidality(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {validation.confirm_secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {validation.isvalidPasswordConfirmation ||
          initializeHandleChange ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>{translate('identicalpass')}</Text>
            </Animatable.View>
          )}
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>{translate('terms')}</Text>
            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {translate('terms1')}
            </Text>

            <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>
              {translate('terms2')}
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                signUpHandle();
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
                  {translate('signup')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

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
    flex: Platform.OS === 'ios' ? 3 : 5,
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
    marginTop: 10,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
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
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
