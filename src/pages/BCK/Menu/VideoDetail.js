import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, BackHandler } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData, webURL } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import YoutubePlayer from "react-native-youtube-iframe";
export default function VideoDetail({ navigation, route }) {
    const item = route.param;
    return (
        <SafeAreaView style={{
            flex: 1,
        }}>
            <YoutubePlayer
                height={windowHeight}
                videoId={route.params.link}
                webViewProps={{
                    injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  element.style.paddingBottom = 'unset';
                  true;
                `,
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})