import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  Animated,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {MyButton, MyGap} from '../../components';
import {MyDimensi, colors, fonts, windowHeight, windowWidth} from '../../utils';
import {MYAPP, getData} from '../../utils/localStorage';

export default function Splash({navigation}) {
  const img = new Animated.Value(0.5);
  const textScale = new Animated.Value(0.5);
  const textOpacity = new Animated.Value(0);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(img, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textScale, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 750,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace('Home');
    }, 1200);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Image
        source={require('../../assets/logo.png')}
        resizeMode="contain"
        style={{
          transform: [{scale: img}],
          width: windowWidth / 2,
          height: windowWidth / 2,
          borderRadius:20
        }}
      />

      <ActivityIndicator color={colors.primary} size="large" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});