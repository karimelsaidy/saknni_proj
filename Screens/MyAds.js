import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StatusBar, Alert, I18nManager, FlatList} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {AuthContext} from '../Components/context';
import axios from 'axios';
import ModalIndicator from '../Components/ModaIndecator';
import Card from '../Components/Card';

export const AppBar = ({props}) => {
  const {translate} = useContext(AuthContext);

  const {colors} = useTheme();
  return (
    <Appbar.Header style={{backgroundColor: colors.statusBarBackground}}>
      <Appbar.Action
        icon="menu"
        onPress={() => {
          props.openDrawer();
        }}
      />
      <Appbar.Content title={translate('myAd')} />
    </Appbar.Header>
  );
};
export default function MyAds({navigation}) {
  const {colors} = useTheme();
  const {translate} = useContext(AuthContext);
  const [adData, setAdData] = useState('');
  const [loadingData,setLoadingData] = useState(true);
  useEffect(function x() {
    axios
      .post('http://saknni-com.preview-domain.com/api/me', {
        api_password: 'AhmedElkomy',
        lang: I18nManager.isRTL ? 'ar' : 'en',
      })
      .then((res) => {
        setAdData(res.data.data.myAds);
        setLoadingData(false);
      })
      .catch(() => {
        setLoadingData(false);
        Alert.alert(translate('neterror'), translate('neterrormsg'), [
          {text: translate('ok')},
        ]);
      });
  }, []);
  return (
    <View style={{flex: 1}}>
      <AppBar props={navigation} />
      <StatusBar
        backgroundColor={colors.statusBarBackground}
        barStyle="light-content"
      />
        {loadingData ? (
        <ModalIndicator visible={true} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={adData}
            keyExtractor={(item) => {
              // console.log("index", index)
              return item.id.toString();
            }}
            renderItem={(item) => <Card navigation={navigation} data={item} />}
          />
        </View>
      )}
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}></View>
    </View>
  );
}
