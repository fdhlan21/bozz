import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
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

export default function TimSet({ navigation, route }) {
    const [data, setData] = useState([
        {
            id: route.params.id,
            set: '1'
        },
        {
            id: route.params.id,
            set: '2'
        },
        {
            id: route.params.id,
            set: '3'
        },
        {
            id: route.params.id,
            set: '4'
        },
        {
            id: route.params.id,
            set: '5'
        },
    ]);









    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('TimSetDetail', item)} style={{
                padding: 10,
                marginVertical: 5,
                flex: 1,
                height: windowHeight / 6,
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: colors.secondary,

            }}>


                <Text style={{
                    textAlign: 'center',

                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 18,
                    color: colors.primary,
                }}>SET {item.set}
                </Text>

            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10,
            flexDirection: 'column'
        }}>



            <FlatList data={data} renderItem={__renderItem} />




        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})