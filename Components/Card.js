import React, {useContext} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  I18nManager,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from 'react-native-paper';
import AddDetail from '../Screens/AddDetail';
import {AuthContext} from './context';

export default function Card({data,navigation}) {
  const {colors} = useTheme();
  const {translate} = useContext(AuthContext);
  const {item} = data;
 
  return (
    <View>
      <View
        style={[
          styles.cardCon,
          {backgroundColor: colors.cardBack, borderColor: colors.cardSec},
        ]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddDetail', {item: item})}>
          <View style={styles.imageCon}>
            <Image
              style={styles.img}
              source={{
                uri:
                  'http://saknni-com.preview-domain.com/images/' + item.images.source[0],
              }}
            />
          </View>
          <View style={[styles.section2, {backgroundColor: colors.cardSec2}]}>
            <Text style={styles.titleStyle}>{item.des.title}</Text>
          </View>

          <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
            <View>
              <Text style={styles.labelStyle}>
                {item.price}
                {translate('pound')}
              </Text>
            </View>

            <View>
              <Text>{item.city.city_name}</Text>
            </View>
          </View>

          <View style={[styles.section2, {backgroundColor: colors.cardSec2}]}>
            <Text>
              {translate('rooms')}: {item.num_rooms}
            </Text>
            <Text>{item.list_section.toUpperCase()}</Text>
            <Text>
              {translate('space')}: {item.area} {translate('meter')}
            </Text>
          </View>

          <View style={[styles.section, {backgroundColor: colors.cardSec}]}>
            <TouchableOpacity
              onPress={() => Linking.openURL('tel:'+item.user.phone)}>
              <Icon name="phone" color={colors.cardIcon} size={35} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Icon name="heart-plus" color={colors.cardIcon} size={35} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCon: {
    margin: 10,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  imageCon: {
    padding: 5,
  },
  img: {
    width: '100%',
    height: 100,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
    padding: 5,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  section2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 5,
    padding: 5,

    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
  titleStyle: {
    fontFamily:
      Platform.OS == 'ios' ? 'AmericanTypewriter' : 'sans-serif-condensed ',
    fontSize: 18,
  },
});
