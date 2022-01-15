import React, {useState, useContext} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  I18nManager,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Picker} from '@react-native-community/picker';
import {Divider, useTheme, Switch} from 'react-native-paper';
import {AuthContext} from '../Components/context';
import axios from 'axios';

function CustomFilter({modalDisplay}) {
  const {colors} = useTheme();
  const {translate} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = modalDisplay;
  const [photoSwitch, setPhotoSwitch] = useState(false);
  const [location, setLocation] = useState('Kafr-elsheikh');
  const [address, setAddress] = useState('');
  const [homeDataType, setHomeDataType] = useState('Flat');
  const [purpose, setPurpose] = useState();
  const [space, setSpace] = useState({
    minSpace: '50',
    maxSpace: '200',
  });
  const [price, setPrice] = useState({
    minPrice: '0',
    maxPrice: '10000',
  });
  const [roomCounter, setRoomCounter] = useState('2');
  const [floorCounter, setFloorCounter] = useState(0);

  const HomeData = JSON.parse(translate('homeData'));
  const Units = JSON.parse(translate('units'));
  const Location = JSON.parse(translate('location'));
  const Purpose = JSON.parse(translate('purpose'));

  const search = () => {
    if (true) {
      try {
        axios
          .post('http://saknni-com.preview-domain.com/api/search', {
            api_password: 'AhmedElkomy',
            lang: I18nManager.isRTL ? 'ar' : 'en',
            sell_rent: purpose,
            city: location,
            type_property: purpose,
            min_price: price.minPrice,
            max_price: price.maxPrice,
            min_area: space.minSpace,
            max_area: space.maxSpace,
          })
          .then((res) => {
            Alert.alert(translate('neterror'), translate('serverInvalid'), [
              {text: translate('ok')},
            ]);
          })
          .catch((e) => {
            console.log(e, 'ee');
            Alert.alert(translate('neterror'), translate('neterrormsg'), [
              {text: translate('ok')},
            ]);
          });
      } catch (e) {}
    } else {
      Alert.alert(translate('registererror'), translate('entervalidregister'), [
        {text: translate('ok')},
      ]);
    }
  };

  return (
    <Modal
      animationType="slide"
      backgroundColor="#808"
      presentationStyle="overFullScreen"
      visible={modalVisible}>
      <View style={[styles.modalCon, {backgroundColor: colors.background}]}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <View
              style={[
                styles.btnExit,
                {
                  backgroundColor: colors.background2,
                  borderColor: colors.border,
                },
              ]}>
              <Icon name="close-outline" color={'#EDA7BE'} size={40} />
            </View>
          </TouchableOpacity>

          <Text style={[styles.modalTitle, {color: colors.text}]}>
            {translate('filter')}
          </Text>
        </View>
        <ScrollView>
          <View style={styles.modalBody}>
            <View style={styles.modalSection}>
              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('location_lab')}
                </Text>
                <View
                  style={[
                    styles.pickerCon,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}>
                  <Picker
                    style={styles.picker}
                    selectedValue={location}
                    mode="dropdown"
                    onValueChange={(itemValue) => setLocation(itemValue)}>
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

              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('type')}
                </Text>
                <View
                  style={[
                    styles.pickerCon,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}>
                  <Picker
                    style={styles.picker}
                    mode="dropdown"
                    selectedValue={homeDataType}
                    onValueChange={(itemValue) => setHomeDataType(itemValue)}>
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
            </View>

            <Divider style={styles.divider} />

            <View style={styles.modalSection}>
              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('minprice')}
                </Text>

                <TextInput
                  style={[
                    styles.txtInp,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder={price.minPrice}
                  placeholderTextColor={colors.txtHolder}
                  value={price.minPrice}
                  keyboardType="numeric"
                  onChangeText={(text) => setPrice({...price, minPrice: text})}
                />
              </View>

              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('maxprice')}
                </Text>

                <TextInput
                  style={[
                    styles.txtInp,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder={price.maxPrice}
                  placeholderTextColor={colors.txtHolder}
                  value={price.maxPrice}
                  keyboardType="numeric"
                  onChangeText={(text) => setPrice({...price, maxPrice: text})}
                />
              </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.modalSection}>
              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('minspace')}
                </Text>

                <TextInput
                  style={[
                    styles.txtInp,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder={price.minSpace}
                  placeholderTextColor={colors.txtHolder}
                  value={space.minSpace}
                  keyboardType="numeric"
                  onChangeText={(text) => setSpace({...space, minSpace: text})}
                />
              </View>

              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('maxspace')}
                </Text>

                <TextInput
                  style={[
                    styles.txtInp,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder={price.maxSpace}
                  placeholderTextColor={colors.txtHolder}
                  value={space.maxSpace}
                  keyboardType="numeric"
                  onChangeText={(text) => setSpace({...space, maxSpace: text})}
                />
              </View>
            </View>

            <Divider style={styles.divider} />
            <View style={styles.modalSection}>
              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('minrooms')}
                </Text>

                <TextInput
                  style={[
                    styles.txtInp,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholderTextColor={colors.txtHolder}
                  value={roomCounter}
                  keyboardType="numeric"
                  onChangeText={(text) => setRoomCounter(text)}
                />
              </View>
              <View style={styles.modalSectionSub}>
                <Text style={[styles.labelsModal, {color: colors.text}]}>
                  {translate('purpose_lab')}
                </Text>
                <View
                  style={[
                    styles.pickerCon,
                    {
                      backgroundColor: colors.background2,
                      borderColor: colors.border,
                    },
                  ]}>
                  <Picker
                    style={styles.picker}
                    mode="dropdown"
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
            </View>

            <Divider style={styles.divider} />
            <View
              style={[styles.modalSection, {justifyContent: 'space-around'}]}>
              <Text style={styles.labelsModal}>{translate('listenphoto')}</Text>
              <Switch
                style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
                color={colors.border}
                value={photoSwitch}
                onValueChange={() => setPhotoSwitch(!photoSwitch)}
              />
            </View>
            <Divider style={styles.divider} />
            <View
              style={[
                styles.modalSection,
                {justifyContent: 'center', margin: 15},
              ]}>
              <TouchableOpacity
                style={[
                  styles.searchBtn,
                  {
                    backgroundColor: colors.background2,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => search()}>
                <Text
                  style={[
                    styles.labelsModal,
                    {textAlign: 'center', fontWeight: 'bold'},
                  ]}>
                  {translate('search')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalCon: {
    flex: 1,
  },
  btnExit: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  pickerCon: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 15,
  },
  modalTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
  },
  labelsModal: {
    fontSize: 16,
    marginLeft: 5,
  },
  modalBody: {},
  modalSection: {
    flexDirection: 'row',
  },
  modalSectionSub: {
    flex: 50,
  },
  divider: {
    marginVertical: 10,
    marginHorizontal: 5,
    height: 1,
  },
  txtInp: {
    borderWidth: 2,
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  searchBtn: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
  },
});

export default CustomFilter;
