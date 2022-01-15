import React, {useContext} from 'react';
import {
  Image,
  Text,
  View,
  StatusBar,
  ScrollView,
  StyleSheet,
  Linking,
  I18nManager,
} from 'react-native';
import {Divider, useTheme, Appbar} from 'react-native-paper';
import MyPager from '../Components/MyPager';
import {AuthContext} from '../Components/context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddDetail({navigation, route}) {
  
  const item = route.params.item;
  const {translate} = useContext(AuthContext);
  const {colors} = useTheme();
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor={colors.statusBarBackground}
          barStyle="light-content"
        />
        <Appbar.Header style={{backgroundColor: colors.statusBarBackground}}>
          <Appbar.Action
            style={{transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]}}
            icon="arrow-left"
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Appbar.Content title="Ad detail" />
          <Appbar.Action icon="heart-plus" />
        </Appbar.Header>
        <MyPager images={item.images.source}/>
        <View style={[styles.section, {backgroundColor: colors.cardSec2}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.des.title}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('location_lab')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.city.city_name}
          </Text>
        </View>
        <Text style={[styles.addressTxt, {color: colors.text}]}>
          {item.location}{' '}
        </Text>
        <Divider style={styles.divider} />

        <View style={[styles.section, {backgroundColor: colors.cardSec2}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('hometype')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.type_property.type}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('purpose_lab')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.list_section.toUpperCase()}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec2}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('space')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.area} {translate('meter')}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('price')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.price}
            {translate('pound')}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec2}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('rooms')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.num_rooms}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('bathrooms')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.num_bathroom}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec2}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('finish')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.finish.type}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('floor')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.num_floor}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec2}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('description')}
          </Text>
        </View>
        <Text style={[styles.addressTxt, {color: colors.text}]}>
          {item.des.details}
        </Text>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('view')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.view.list}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec2}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('phone')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.user.phone}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
          <Text style={[styles.text, {color: colors.section}]}>
            {translate('by')}
          </Text>
          <Text style={[styles.text, {color: colors.section}]}>
            {item.user.name}{' '}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <TouchableOpacity
          onPress={() => Linking.openURL('tel:'+item.user.phone)}
          style={[styles.btnCall, {backgroundColor: colors.border}]}>
          <Icon name="phone" size={25} color={colors.text} />
          <Text style={{marginHorizontal: 10}}> {translate('phonecall')}</Text>
        </TouchableOpacity>
        <Divider style={styles.divider} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor:"#808",
  },
  section: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 10,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  text: {
    fontSize: 15,
  },
  divider: {
    height: 2,
    marginHorizontal: 8,
    marginVertical: 10,
  },
  addressTxt: {
    marginHorizontal: 15,
    marginTop: 5,
    opacity: 0.8,
    textAlign: 'center',
  },
  btnCall: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
});
