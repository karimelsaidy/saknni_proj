import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');
const MyPager = ({images}) => {
  return (
    <ViewPager style={styles.viewPager} initialPage={0} pageMargin={5}>
      {images.map((item, index) => {
        console.log(item, index);
        return (
          <View key={index+1}>
            <Image style={styles.img} source={{uri:'http://saknni-com.preview-domain.com/images/'+item}} />
          </View>
        );
      })}
    </ViewPager>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    height: height * 0.3,
    marginBottom: 15,
  },
  img: {
    height: height * 0.3,
  },
});

export default MyPager;
