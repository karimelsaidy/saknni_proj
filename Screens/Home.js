import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform,
  Dimensions,
  Modal,
  I18nManager,
  Alert,
  FlatList,
  ScrollView,
} from 'react-native';
import BottomTab from '../Components/BottomTab';
import Setting from './Setting.js';
import AddAdv from './AddAdv';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme, Appbar, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-community/picker';
import CustomFilter from '../Components/CustomFilter';
import {AuthContext} from '../Components/context';
import Card from '../Components/Card';
import AddDetail from './AddDetail';
import ModalIndicator from '../Components/ModaIndecator';
import axios from 'axios';

const {height} = Dimensions.get('screen');
let data = '';

function HomeScreen({navigation}) {
  const {colors} = useTheme();
  const [loadingData, setLoadingData] = useState(true);
  const {translate, getToken, setDataAppHandle, getDataApp} = useContext(
    AuthContext,
  );
  const [chosenHomeData, setChosenHomeData] = useState('Apartment');
  const [purpose, setPurpose] = useState('All');
  const [adData, setAdData] = useState([{id: 111}]);
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const HomeData = JSON.parse(translate('homeData'));
  const Purpose = JSON.parse(translate('purpose'));
  const [userData, setUserData] = useState('');
  console.log(adData);
  useEffect(
    function x() {
      axios
        .post('http://saknni-com.preview-domain.com/api/property/showAll', {
          api_password: 'AhmedElkomy',
          lang: 'ar',
        })
        .then((res) => {
          setVisible(false);
          setAdData(res.data.data.data);
          setLoadingData(false);
        })
        .catch(() => {
          setVisible(false);
          setLoadingData(false);
          Alert.alert(translate('neterror'), translate('neterrormsg'), [
            {text: translate('ok')},
          ]);
        });
    },
    [loadingData],
  );
  useEffect(
    function x() {
      axios
        .post('http://saknni-com.preview-domain.com/api/property/create', {
          api_password: 'AhmedElkomy',
          token: getToken(),
          lang: 'ar',
        })
        .then((res) => {
          let dataRes = res.data.data;
          setDataAppHandle({
            list_views: [...dataRes.list_views],
            type_finish: [...dataRes.type_finish],
            type_payment: [...dataRes.type_payment],
            type_property: [...dataRes.type_property],
          });
        })
        .catch(() => {
          console.log('erorzz');
        });
    },
    [loadingData],
  );
  useEffect(() => {
    data = getDataApp();
  }, [loadingData]);
  console.log(data,"chekoo");
  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor={colors.statusBarBackground}
        barStyle="light-content"
      />
      <Appbar.Header
        style={[{backgroundColor: colors.background2}, styles.abbBar]}>
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TextInput
              style={styles.txtInputSearch}
              placeholder={translate('typedesc')}
              color={colors.text}
              placeholderTextColor={colors.txtHolder}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 5,
              justifyContent: 'space-around',
            }}>
            <View
              style={[
                styles.viewPickerCon,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background2,
                },
              ]}>
              <Picker
                style={{height: 30, width: 100}}
                mode={'dropdown'}
                selectedValue={chosenHomeData}
                onValueChange={(itemValue) => setChosenHomeData(itemValue)}>
                {HomeData.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
            <View
              style={[
                styles.viewPickerCon,
                {
                  borderColor: colors.border,
                  backgroundColor: colors.background2,
                },
              ]}>
              <Picker
                style={{height: 30, width: 100}}
                mode={'dropdown'}
                selectedValue={purpose}
                onValueChange={(itemValue) => setPurpose(itemValue)}>
                {Purpose.map((item) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            style={styles.custFilterCon}
            onPress={() => setModalVisible(true)}>
            <Text style={[styles.cusFilterTxt, {color: colors.text}]}>
              {translate('cusfilter')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{marginHorizontal: 10}}
          onPress={() => console.log('hi')}>
          <Icon name="home-search" color={colors.text} size={30} />
        </TouchableOpacity>
      </Appbar.Header>
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

      <CustomFilter modalDisplay={[modalVisible, setModalVisible]} />

      <BottomTab navigation={navigation} />
    </View>
  );
}

const Stack = createStackNavigator();

export default function Home({navigation}) {
  const {translate} = useContext(AuthContext);
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.statusBarBackground,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="AddDetail"
        component={AddDetail}
        options={{
          header: () => {
            null;
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Setting}
        options={{title: translate('setting')}}
      />
      <Stack.Screen
        name="AddAdv"
        component={AddAdv}
        options={{title: translate('addadv')}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  abbBar: {
    height: height * 0.18,
  },
  txtInputSearch: {
    flex: 1,
    margin: Platform.OS == 'ios' ? 0 : -12,
    marginTop: 5,
  },
  filter: {
    width: 100,
    height: 35,
    marginBottom: 5,
    zIndex: 10,
  },
  custFilterCon: {
    marginBottom: 3,
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#ED717F',
  },
  cusFilterTxt: {
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRightColor: '#800',
    textAlign: 'center',
    flex: 0,
  },

  viewPickerCon: {
    borderRadius: 12,
    borderWidth: 2,
    padding: 0,
  },
});
