import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MyDimensi, fonts, windowWidth, } from '../../utils/fonts';
import { Icon } from 'react-native-elements';
import { colors } from '../../utils';

export default function MyButtonSecond({
  title,
  warna = colors.primary,
  onPress,
  Icons,
  radius = 10,
  colorText = colors.black,
  fontWeight = 'normal',
  iconColor = colors.black,
  borderSize = 0,
  kiri = true,
  borderColor = colors.black,
}) {
  return (
    <TouchableOpacity
      style={styles(warna, radius, borderSize, borderColor).btn}
      onPress={onPress}>
      {kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={MyDimensi / 4} />}
      <Text
        style={{
          color: colorText,

          marginLeft: kiri ? 5 : 0,
          marginRight: !kiri ? 5 : 0,
          fontSize: MyDimensi / 4,
          fontFamily: fonts.primary[600],
          // fontWeight: fontWeight,
        }}>
        {title}
      </Text>
      {!kiri && <Icon type="ionicon" name={Icons} color={iconColor} size={MyDimensi / 4} />}
    </TouchableOpacity>
  );
}

const styles = (warna, radius, borderSize, borderColor) =>
  StyleSheet.create({
    btn: {
      height: 50,
      borderRadius: radius,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: warna,
      borderWidth: borderSize,
      borderColor: borderColor,
      flexDirection: 'row',
    },
  });
