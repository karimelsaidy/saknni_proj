import React, {useContext} from 'react';
import {
  Divider,
  Dialog,
  Portal,
  Button,
  RadioButton,
  useTheme,
} from 'react-native-paper';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {AuthContext} from '../Components/context';

export default function Setting() {
  const [visible, setVisible] = React.useState(false);
  const {colors} = useTheme();
  const [value, setValue] = React.useState('English');
  const {translate, changeLangAr, changeLangEn} = useContext(AuthContext);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const handleLanguage = (lang) => {
    hideDialog();
    if (lang === 'Arabic') {
      changeLangAr();
    } else {
      changeLangEn();
    }
  };
  return (
    <View style={styles.settingCon}>
      <TouchableOpacity
        style={styles.radio}
        onPress={() => {
          setVisible(true);
        }}>
        <Text style={[styles.txtBtn, {color: colors.text}]}>
          {translate('applang')}
        </Text>
        <Text style={[styles.txtCaption, {color: colors.text}]}>
          {translate('defaultlang')}
        </Text>
      </TouchableOpacity>
      {visible ? (
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{translate('chooselang')}</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group
                onValueChange={(value) => setValue(value)}
                value={value}>
                <View style={styles.radioCon}>
                  <Text style={[styles.radioTxt, {color: colors.text}]}>
                    {translate('english')}
                  </Text>
                  <RadioButton value="English" />
                </View>
                <View style={styles.radioCon}>
                  <Text style={[styles.radioTxt, {color: colors.text}]}>
                    {translate('arabic')}
                  </Text>
                  <RadioButton value="Arabic" />
                </View>
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => handleLanguage(value)}>
                {translate('ok')}
              </Button>
              <Button onPress={hideDialog}>{translate('cancel')}</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : null}
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  settingCon: {
    flex: 1,
  },
  radio: {
    margin: 10,
  },
  txtBtn: {
    fontSize: 18,
  },
  txtCaption: {
    opacity: 0.5,
    marginLeft: 5,
    marginTop: 5,
  },
  radioCon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioTxt: {
    fontSize: 15,
  },
  radioIcon: {},
});
