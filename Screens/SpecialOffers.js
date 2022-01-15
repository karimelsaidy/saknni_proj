import React, {useContext, useEffect, useState} from 'react';

import {View, StyleSheet, Alert, FlatList} from 'react-native';
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
      <Appbar.Content title={translate('offer')} />
    </Appbar.Header>
  );
};

export default function SpecialOffer({navigation}) {
  const {translate} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingData, setIsLoadingData] = useState(true);
  const [adData, setAdData] = useState(true);
  const {colors} = useTheme();

  useEffect(
    function x() {
      axios
        .post('http://saknni-com.preview-domain.com/api/property/special', {
          api_password: 'AhmedElkomy',
          lang: 'ar',
        })
        .then((res) => {
          setAdData(res.data.data.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          Alert.alert(translate('neterror'), translate('neterrormsg'), [
            {text: translate('ok')},
          ]);
        });
    },
    [loadingData, translate],
  );
  return (
    <View style={{flex: 1}}>
      <AppBar props={navigation} />
      {isLoading ? (
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
    </View>
  );
}

const styles = StyleSheet.create({
  BookmarksCon: {
    flex: 1,
  },
});
