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
import Pdf from 'react-native-pdf';
import Orientation from 'react-native-orientation-locker';
export default function InfoYT({ navigation, route }) {
    const isFocus = useIsFocused();


    useEffect(() => {
        if (isFocus) {
            Orientation.lockToLandscapeLeft();
        }


        const backAction = () => {
            console.log('kembali')
            Orientation.lockToPortrait();
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();

    }, [isFocus]);


    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.primary,

        }}>
            {/* <View style={{
                backgroundColor: colors.white,
                height: 60,
                paddingVertical: 10,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center'
            }}>


                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                    flex: 1,
                }}>{route.params.nama_materi}</Text>
            </View> */}
            <YoutubePlayer
                height={windowWidth}
                videoId={route.params.link_youtube}
                webViewProps={{
                    injectedJavaScript: `
                  var element = document.getElementsByClassName('container')[0];
                  element.style.position = 'unset';
                  element.style.paddingBottom = 'unset';
                  true;
                `,
                }}
            />

        </View>
    )
}

const styles = StyleSheet.create({})