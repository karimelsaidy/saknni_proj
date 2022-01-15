import React, {useContext, useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  I18nManager,
} from 'react-native';
import {Appbar, useTheme} from 'react-native-paper';
import {AuthContext} from '../Components/context';
import axios from 'axios';

export const AppBar = ({props}) => {
  const {translate, getToken, getUserId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const {colors} = useTheme();
  return (
    <Appbar.Header style={{backgroundColor: colors.statusBarBackground}}>
      <Appbar.Action
        icon="menu"
        onPress={() => {
          props.openDrawer();
        }}
      />
      <Appbar.Content title={translate('bookmarks')} />
    </Appbar.Header>
  );
};

export default function Bookmarks({navigation}) {
  const {translate, getToken, getUserId} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');

  const {colors} = useTheme();

  useEffect(function x() {
    axios
      .post('http://saknni-com.preview-domain.com/api/property/bookMarks', {
        api_password: 'AhmedElkomy',
        token: getToken(),
        id: getUserId(),
        lang: I18nManager.isRTL? 'ar':'en',
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch(() => {
        Alert.alert(translate('neterror'), translate('neterrormsg'), [
          {text: translate('ok')},
        ]);
      });
  }, []);
  return (
    <View style={{flex: 1}}>
      <AppBar props={navigation} />
      <View style={styles.BookmarksCon}>
        {loading ? (
          <Text style={{color: colors.text}}>
            {translate('bookmarksholder')}
          </Text>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={bookmarks}
              keyExtractor={(bookMarks) => {
                // console.log("index", index)
                return bookMarks.id.toString();
              }}
              renderItem={(item) => (
                <Card navigation={navigation} data={item} />
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  BookmarksCon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
