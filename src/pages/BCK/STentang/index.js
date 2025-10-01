import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import RenderHtml from 'react-native-render-html';

export default function STentang({ navigation }) {



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 0,
        }}>
            {/* <Image source={require('../../assets/tentang.png')} style={{
                width: windowWidth,
                height: windowHeight,
                resizeMode: 'contain'
            }} /> */}

        </SafeAreaView >
    )
}

