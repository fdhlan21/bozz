import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import RenderHtml from 'react-native-render-html';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import 'moment/locale/id';

export default function RekomendasiDetail({ navigation, route }) {
    const item = route.params;
    return (
        <ScrollView style={{
            flex: 1,
        }}>
            <Image source={{
                uri: item.image
            }} style={{
                width: '100%',
                height: 250,
            }} />
            <View style={{
                padding: 20
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    marginVertical: 5,
                    fontSize: 15,
                    color: colors.black
                }}>{item.judul}</Text>

                <RenderHtml
                    contentWidth={'100%'}
                    source={{
                        html: item.keterangan
                    }}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({})