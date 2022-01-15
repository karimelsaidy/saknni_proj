import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {useTheme, Divider} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import {AuthContext} from '../Components/context';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

export default function AddAdv() {
  let {colors} = useTheme();
  const {translate, getUserId} = useContext(AuthContext);
  const options = {
    title: translate('selectPhoto'),
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [homeDataType, setHomeDataType] = useState('');
  const [purpose, setPurpose] = useState('');
  const [space, setSpace] = useState('');
  const [price, setPrice] = useState('');
  const [bathCounter, setBathCounter] = useState(0);
  const [roomCounter, setRoomCounter] = useState(0);
  const [floorCounter, setFloorCounter] = useState(0);
  const [desck, setDesck] = useState('');
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState();
  const [firstImg, setFirstImage] = useState();
  const [secondImg, setSecondImage] = useState();
  const [thirdImg, setThirdImage] = useState();

  const HomeData = JSON.parse(translate('homeData'));
  const Location = JSON.parse(translate('location'));
  const Purpose = JSON.parse(translate('purpose'));

  const handleImage = (handle) => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        handle({
          filePath: source,
        });
      }
    });
  };

  const addNewAd = () => {
    if (
      price.trim().length != 0 &&
      location.trim().length != 0 &&
      address.trim().length != 0 &&
      homeDataType.trim().length != 0 &&
      purpose.trim().length != 0 &&
      purpose.trim().length != 0 &&
      title.trim().length != 0 &&
      roomCounter.trim().length != 0 &&
      bathCounter.trim().length != 0 &&
      videoUrl.trim().length != 0 &&
      space.trim().length != 0
    ) {
    } else {
      if (true) {
        try {
          axios
            .post('http://saknni-com.preview-domain.com/api/store', {
              user_id: getUserId(),
              type_property: homeDataType,
              title: title,
              list_section: purpose,
              area: space,
              rooms: roomCounter,
              list_view: homeDataType,
              floor: floorCounter,
              bath_rooms: bathCounter,
              description: desck,
              youtube_url: videoUrl,
              price: price,
              images: [firstImg, secondImg, thirdImg],
            })
            .then((res) => {
              if (res.data.status) {
                Alert.alert('done', 'successful', [{text: translate('ok')}]);
              } else {
                Alert.alert(translate('neterror'), translate('serverInvalid'), [
                  {text: translate('ok')},
                ]);
              }
            })
            .catch((e) => {
              console.log(e, 'ee');
              Alert.alert(translate('neterror'), translate('neterrormsg'), [
                {text: translate('ok')},
              ]);
            });
        } catch (e) {
         
        }
      } else {
        
        Alert.alert(
          translate('registererror'),
          translate('entervalidregister'),
          [{text: translate('ok')}],
        );
      }
    }
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View>
        <StatusBar
          backgroundColor={colors.statusBarBackground}
          barStyle="light-content"
        />
        <View style={{marginTop: 8}}>
          <Text
            style={[styles.labelTxt, {color: colors.text, marginBottom: 15}]}>
            {translate('address')}
          </Text>
          <TextInput
            placeholder={translate('addressholder')}
            value={address}
            color={colors.text}
            style={[styles.inpTxt, {borderColor: colors.border}]}
            placeholderTextColor={colors.txtHolder}
            onChangeText={(text) => setAddress(text)}
          />
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('location_lab')}
          </Text>
          <View
            style={[
              styles.viewPickerCon,
              {
                borderColor: colors.border,
                backgroundColor: colors.background2,
              },
            ]}>
            <Picker
              style={styles.pickerCon}
              mode="dropdown"
              selectedValue={location}
              onValueChange={(itemValue) => {
                setLocation(itemValue);
              }}>
              {Location.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('hometype')}
          </Text>
          <View
            style={[
              styles.viewPickerCon,
              {
                borderColor: colors.border,
                backgroundColor: colors.background2,
              },
            ]}>
            <Picker
              style={styles.pickerCon}
              mode="dropdown"
              selectedValue={homeDataType}
              onValueChange={(itemValue) => {
                setHomeDataType(itemValue);
              }}>
              {HomeData.map((item) => (
                <Picker.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>
        <Divider style={styles.divider} />

        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('purpose_lab')}
          </Text>
          <View
            style={[
              styles.viewPickerCon,
              {
                borderColor: colors.border,
                backgroundColor: colors.background2,
              },
            ]}>
            <Picker
              style={styles.pickerCon}
              mode="dropdown"
              selectedValue={purpose}
              onValueChange={(itemValue) => setPurpose(itemValue)}>
              {Purpose.map((item) => {
                return (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                  />
                );
              })}
            </Picker>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('space')}
          </Text>
          <View style={styles.inAndcont}>
            <View style={{flex: 75}}>
              <TextInput
                placeholder={space}
                value={String(space)}
                style={[styles.counterInp, {borderColor: colors.border}]}
                color={colors.text}
                placeholderTextColor={colors.txtHolder}
                keyboardType="numeric"
                onChangeText={(text) => setSpace(text)}
              />
            </View>
            <View
              style={[
                styles.viewPickerCon,
                {
                  flex: 25,
                  borderColor: colors.border,
                  backgroundColor: colors.background2,
                },
              ]}>
              <Text style={{textAlign: 'center'}}>
                {translate('meterMrb3')}
              </Text>
            </View>
          </View>
        </View>

        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('bathrooms')}
          </Text>
          <View style={styles.inAndcont}>
            <View style={{flex: 1}}>
              <TextInput
                defaultValue={String(bathCounter)}
                style={[styles.counterInp, , {borderColor: colors.border}]}
                color={colors.text}
                onChangeText={(value) => {
                  if (value.trim() !== '' && value >= 0) {
                    setBathCounter(parseInt(value));
                  } else {
                    setBathCounter(0);
                  }
                }}
                placeholderTextColor={colors.txtHolder}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.btnCounter}>
              <TouchableOpacity
                onPress={() => {
                  setBathCounter(bathCounter + 1);
                }}>
                <FontAwesome
                  name="arrow-circle-up"
                  color={colors.text}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (bathCounter >= 1) {
                    setBathCounter(bathCounter - 1);
                  }
                }}>
                <FontAwesome
                  name="arrow-circle-down"
                  color={colors.text}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('rooms')}
          </Text>
          <View style={styles.inAndcont}>
            <View style={{flex: 1}}>
              <TextInput
                defaultValue={String(roomCounter)}
                placeholder={'Enter the number of bed rooms'}
                style={[styles.counterInp, , {borderColor: colors.border}]}
                color={colors.text}
                placeholderTextColor={colors.txtHolder}
                keyboardType="numeric"
                onChangeText={(value) => {
                  if (value.trim() !== '' && value >= 0) {
                    setRoomCounter(parseInt(value));
                  } else {
                    setRoomCounter(0);
                  }
                }}
              />
            </View>
            <View style={styles.btnCounter}>
              <TouchableOpacity
                onPress={() => {
                  setRoomCounter(roomCounter + 1);
                }}>
                <FontAwesome
                  name="arrow-circle-up"
                  color={colors.text}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (roomCounter >= 1) {
                    setRoomCounter(roomCounter - 1);
                  }
                }}>
                <FontAwesome
                  name="arrow-circle-down"
                  color={colors.text}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('floor')}
          </Text>
          <View style={styles.inAndcont}>
            <View style={{flex: 1}}>
              <TextInput
                defaultValue={String(floorCounter)}
                style={[styles.counterInp, {borderColor: colors.border}]}
                color={colors.text}
                placeholderTextColor={colors.txtHolder}
                keyboardType="numeric"
                onChangeText={(value) => {
                  if (value.trim() !== '' && value >= 0) {
                    setFloorCounter(parseInt(value));
                  } else {
                    setFloorCounter(0);
                  }
                }}
              />
            </View>
            <View style={styles.btnCounter}>
              <TouchableOpacity
                onPress={() => {
                  setFloorCounter(floorCounter + 1);
                }}>
                <FontAwesome
                  name="arrow-circle-up"
                  color={colors.text}
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (floorCounter >= 1) {
                    setFloorCounter(floorCounter - 1);
                  }
                }}>
                <FontAwesome
                  name="arrow-circle-down"
                  color={colors.text}
                  size={40}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, , {color: colors.text}]}>
            {translate('price')}
          </Text>
          <View style={styles.inAndcont}>
            <View style={{flex: 1}}>
              <TextInput
                placeholder={translate('priceholder')}
                placeholderTextColor={colors.txtHolder}
                color={colors.text}
                value={price}
                style={[styles.counterInp, {borderColor: colors.border}]}
                keyboardType="numeric"
                onChangeText={(text) => setPrice(text)}
              />
            </View>
            <View style={styles.btnCounter}>
              <Text style={[styles.labelTxt, {color: colors.text}]}>
                {translate('pound')}
              </Text>
            </View>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {translate('description')}
          </Text>
          <View style={styles.inAndcont}>
            <TextInput
              placeholder={translate('descholder')}
              placeholderTextColor={colors.txtHolder}
              value={desck}
              color={colors.text}
              style={[
                styles.counterInp,
                {flex: 1, marginBottom: 10, borderColor: colors.border},
              ]}
              onChangeText={(text) => setDesck(text)}
            />
          </View>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, , {color: colors.text}]}>
            {translate('Addphoto')}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => handleImage(setFirstImage)}>
            <Image
              source={
                firstImg
                  ? firstImg.filePath
                  : require('../assets/holderImg.jpg')
              }
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImage(setSecondImage)}>
            <Image
              source={
                secondImg
                  ? secondImg.filePath
                  : require('../assets/holderImg.jpg')
              }
              style={styles.img}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImage(setThirdImage)}>
            <Image
              source={
                thirdImg
                  ? thirdImg.filePath
                  : require('../assets/holderImg.jpg')
              }
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
        <Divider style={styles.divider} />
        <View>
          <Text style={[styles.labelTxt, {color: colors.text}]}>
            {' '}
            {translate('videourl')}
          </Text>
          <View style={styles.inAndcont}>
            <TextInput
              placeholder={translate('videoholder')}
              placeholderTextColor={colors.txtHolder}
              value={videoUrl}
              color={colors.text}
              style={[
                styles.counterInp,
                {flex: 1, marginBottom: 10, borderColor: colors.border},
              ]}
              onChangeText={(text) => setVideoUrl(text)}
            />
          </View>
        </View>
        <Divider style={styles.divider} />

        <View style={styles.subCon}>
          <TouchableOpacity style={styles.subBtn} onPress={() => addNewAd()}>
            <Text
              style={{textAlign: 'center', fontSize: 18, color: colors.text}}>
              {translate('postad')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  viewPickerCon: {
    marginHorizontal: 5,
    borderRadius: 12,
    borderWidth: 2,
  },
  itemPickerStyle: {
    textAlign: 'center',
  },
  pickerCon: {
    width: '100%',
    flex: 1,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 12,
  },
  inAndcont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelTxt: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  inpTxt: {
    marginTop: Platform.OS == 'ios' ? 0 : -12,
    marginHorizontal: 5,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  divider: {
    marginVertical: 15,
  },
  counterInp: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ED717F',
    marginHorizontal: 6,

    padding: 8,
  },
  btnCounter: {
    marginHorizontal: 5,
  },
  img: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  subCon: {
    marginBottom: 10,
    alignItems: 'center',
    alignContent: 'center',
  },
  subBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ED717F',
    padding: 15,
    borderWidth: 2,
    borderRadius: 10,
  },
});
