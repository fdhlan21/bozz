import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Spinner from 'react-native-spinkit';
import {Color, colors} from '../../utils';

export default function MyLoading({
  type = 'ThreeBounce',
  color = colors.primary,
}) {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Spinner isVisible={true} size={60} type={type} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({});
