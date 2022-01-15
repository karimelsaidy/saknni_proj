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
import {useTheme, Avatar, Appbar} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {AuthContext} from '../Components/context';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
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

export default function EditProfile({navigation, route}) {
  const {translate, getToken} = useContext(AuthContext);
  let token = getToken();
  console.log(route);
  let id = route.params.userId;

  const {colors} = useTheme();
  const [data, setData] = React.useState({
    userName: '',
    email: '',
    phone: '',
  });
  //initialize sign up validation
  const [validation, setIsValid] = useState({
    isValidUserName: false,
    isValidEmail: false,
    isValidPassword: false,
    isValidPhone: false,
  });
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
  //check user name validation
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

  const [loadingData, setLoadingData] = useState(true);

  const handleUpdate = () => {
    if (
      validation.isValidEmail &&
      validation.isValidPhone &&
      validation.isValidUserName
    ) {
      axios
        .post('http://saknni-com.preview-domain.com/api/user/update', {
          api_password: 'AhmedElkomy',
          token: token,
          id: id,
          name: data.userName,
          email: data.email,
          phone: data.phone,
        })
        .then((res) => {
            console.log(res,"update prof")
            if(res.data.status){
                Alert.alert(translate('update'), translate('updateComp'), [
                    {text: translate('ok')},
                  ]);
            }
          setLoadingData(false);
        })
        .catch(() => {
          setLoadingData(false);

          Alert.alert(translate('neterror'), translate('neterrormsg'), [
            {text: translate('ok')},
          ]);
        });
    } else {
      Alert.alert(translate('inputError'), translate('putValid'), [
        {text: translate('ok')},
      ]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={styles.container}>
        <AppBar props={navigation} />
        <StatusBar
          backgroundColor={colors.statusBarBackground}
          barStyle="light-content"
        />
        <View style={styles.imgContainer}>
          <Image
            source={require('../assets/avatar.png')}
            style={styles.imgAvatar}
          />
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
          <TextInput
            placeholder={translate('userholder')}
            placeholderTextColor="#666666"
            style={[
              styles.txtInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handleUserName(val)}
          />
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
          <TextInput
            placeholder={translate('emailholder')}
            placeholderTextColor="#666666"
            style={[
              styles.txtInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => checkEmailValidality(val)}
          />
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
          <TextInput
            placeholder={translate('phoneholder')}
            placeholderTextColor="#666666"
            style={[
              styles.txtInput,
              {
                color: colors.text,
              },
            ]}
            autoCapitalize="none"
            onChangeText={(val) => handlePhone(val)}
          />
        </View>

        <View style={styles.submitBtnCon}>
          <TouchableOpacity onPress={()=>handleUpdate()}>
            <Text
              style={[
                styles.submitBtnTxt,
                {
                  color: colors.text,
                },
              ]}>
              {translate('submit')}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
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
    marginTop: Platform.OS == 'ios' ? 0 : -8,
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
    marginStart: 10,
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
