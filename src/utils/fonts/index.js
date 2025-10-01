import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const MyDimensi = (windowHeight * windowHeight) / 10000;

export const fonts = {

  headline0: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 40,
    lineHeight: 60
  },

  headline1: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 24,
    lineHeight: 44
  },

  headline2: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    lineHeight: 41
  },


  headline3: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 18,
    lineHeight: 34
  },


  headline4: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    lineHeight: 30
  },


  headline5: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    lineHeight: 26
  },


  subheadline3: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 14,
    lineHeight: 26
  },


  body2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    lineHeight: 34
  },

  body3: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    lineHeight: 26
  },

  caption1: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    lineHeight: 26
  },
  caption: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 12,
    lineHeight: 18
  },
  primary: {
    300: 'Poppins-Light',
    400: 'Poppins-Regular',
    500: 'Poppins-Medium',
    600: 'Poppins-SemiBold',
    700: 'Poppins-Bold',
    800: 'Poppins-ExtraBold',
    900: 'Poppins-Black',
    normal: 'HammersmithOne-Regular',
  },
  secondary: {
    200: 'Montserrat-ExtraLight',
    300: 'Montserrat-Light',
    400: 'Montserrat-Regular',
    600: 'Montserrat-Medium',
    700: 'Montserrat-Bold',
    800: 'Montserrat-ExtraBold',
    900: 'Roboto-Black',
    normal: 'Fonetis',
  },
};
