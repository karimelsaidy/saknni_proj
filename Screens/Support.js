import React, {useState, useContext} from 'react';

import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {FAB, Portal, Provider, Appbar, useTheme} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {Linking} from 'react-native';
import {AuthContext} from '../Components/context';

export const FabGroub = () => {
  const [state, setState] = useState({open: false});
  

  const onStateChange = ({open}) => setState({open});
  const {open} = state;

  const {colors} = useTheme();
  const {translate} = useContext(AuthContext);

  return (
    <Provider>
      <Portal>
        <FAB.Group
          fabStyle={{backgroundColor: '#ED717F'}}
          color={colors.text}
          open={open}
          icon={open ? 'information-outline' : 'cellphone-information'}
          actions={[
            {
              icon: 'phone',
              label: translate('phone1'),
              onPress: () => Linking.openURL('tel:+201060688416'),
            },
            {
              icon: 'phone',
              label: translate('phone2'),
              onPress: () => Linking.openURL('tel:+201060688416'),
            },
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
    </Provider>
  );
};



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
      <Appbar.Content title={translate('support')} />
    </Appbar.Header>
  );
};

export default function Support({navigation}) {
  const {translate} = useContext(AuthContext);

  const {colors} = useTheme();
  return (
    <ScrollView style={{flex: 1}}>
      <AppBar props={navigation} />
      <View style={styles.SupportCon}>
        <View style={styles.section}>
          <Text style={[styles.supportText, {color: colors.text}]}>
            {translate('sup1')}
          </Text>
        </View>
        <View style={styles.subBtn}>
          <TouchableOpacity
            style={styles.touchBtn}
            onPress={() =>
              Linking.openURL(
                'mailto:support@example.com?subject=Advertise in saknni&body=Description',
              )
            }>
            <Feather name="mail" color={colors.text} size={20} />
            <Text style={[styles.supportTxtBtn, {color: colors.text}]}>
              {translate('sendmail')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={[styles.supportText, {color: colors.text}]}>
            {translate('sup2')}
          </Text>
        </View>
        <View style={styles.subBtn}>
          <TouchableOpacity
            style={styles.touchBtn}
            onPress={() =>
              Linking.openURL(
                'mailto:support@example.com?subject=Advertise in saknni&body=Description',
              )
            }>
            <Feather name="mail" color={colors.text} size={20} />
            <Text style={[styles.supportTxtBtn, {color: colors.text}]}>
              {translate('sendmail')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FabGroub />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  SupportCon: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  section: {
    backgroundColor: '#D9C8C0',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  supportText: {
    fontSize: 18,
    padding: 15,
    paddingVertical: 30,
    textAlign: 'center',
    marginLeft: 8,
  },
  subBtn: {
    fontSize: 18,
    padding: 15,
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 3,
    borderColor:"#D9C8C0",
    backgroundColor:'#ED717F'
  },
  touchBtn: {
    flexDirection: 'row',
    padding: 10,
  },
  supportTxtBtn: {
    fontSize: 18,
    marginLeft: 5,
  },
});
