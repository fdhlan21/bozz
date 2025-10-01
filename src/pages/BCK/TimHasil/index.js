import { Alert, StyleSheet, Text, View, Image, FlatList, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
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
import ViewShot from "react-native-view-shot";
import Share from 'react-native-share';
import { WebView } from 'react-native-webview';
export default function TimHasil({ navigation, route }) {
    const [myshare, setMyShare] = useState('');
    const ref = useRef();
    const isFocused = useIsFocused();
    useEffect(() => {

        ref.current.capture().then(uri => {
            console.log("do something with ", uri);
            setMyShare(uri);
        });

    }, []);


    console.log(route.params)
    return (
        <>
            <View style={{
                flex: 1,
            }}>
                <ViewShot style={{
                    flex: 1,
                }} ref={ref} options={{ fileName: "Your-File-Name", format: "jpg", quality: 0.9 }}>
                    <WebView source={{ uri: 'https://aspivo.zavalabs.com/api/print.php?tim=' + route.params.id + '&set=' + route.params.set + '' }} />
                </ViewShot>
            </View>
            <TouchableOpacity onPress={() => {

                Linking.openURL('https://aspivo.zavalabs.com/api/print.php?tim=' + route.params.id + '&set=' + route.params.set + '')
            }} style={{
                padding: 10,
                backgroundColor: colors.primary,

            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    textAlign: 'center',
                    color: colors.white
                }}>Print</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({})