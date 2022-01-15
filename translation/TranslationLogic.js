import React from 'react';
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import memoize from 'lodash.memoize'; // Use for caching/memoize for better performance
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';

let getPreferdLangValue;

const translationGetters = {
  // lazy requires (metro bundler does not support symlinks)
  ar: () => require('./ar.json'),
  en: () => require('./en.json'),
};

export const Translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
const storePreferdLang = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('preferd_lang', jsonValue);
  } catch (e) {}
};
const getPreferdLang = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('preferd_lang');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export const SetI18nConfig = ({languageTagInp, isRTLInp}) => {
  let languageTag, isRTL;

  getPreferdLang()
    .then((value) => {
      languageTag = value.lang;
      isRTL = value.isRTL;
      if (languageTagInp == '') {
        // clear translation cache
        Translate.cache.clear();
        // update layout direction
        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);
        // set i18n-js config
        i18n.translations = {[languageTag]: translationGetters[languageTag]()};
        i18n.locale = languageTag;
      } else if (languageTag == languageTagInp) {
        // clear translation cache
        Translate.cache.clear();
        // update layout direction
        I18nManager.forceRTL(isRTL);
        I18nManager.allowRTL(isRTL);
        // set i18n-js config
        i18n.translations = {[languageTag]: translationGetters[languageTag]()};
        i18n.locale = languageTag;
      } else {
        storePreferdLang({lang: languageTagInp, isRTL: isRTLInp});
        // clear translation cache
        Translate.cache.clear();
        // update layout direction
        I18nManager.forceRTL(isRTLInp);
        I18nManager.allowRTL(isRTLInp);

        // set i18n-js config
        i18n.translations = {
          [languageTagInp]: translationGetters[languageTagInp](),
        };
        i18n.locale = languageTagInp;
        RNRestart.Restart();
      }
    })
    .catch(() => {
      languageTag =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters))
          .languageTag || 'en';
      isRTL =
        RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters))
          .isRTL || false;
      storePreferdLang({lang: languageTag, isRTL: isRTL});
    });
};
