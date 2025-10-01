import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
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
import Pdf from 'react-native-pdf';
export default function InfoPdf({ navigation, route }) {


    const item = route.params;



    return (






        <View style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
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
            </View>
            <Pdf
                trustAllCerts={false}
                // source={{ uri: webURL + data.foto_pdf, cache: true }}
                source={{
                    uri: route.params.file, cache: true
                }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.log(error);
                }}
                onPressLink={(uri) => {
                    console.log(`Link pressed: ${uri}`);
                }}
                style={{
                    flex: 1,

                }} />
        </View>








    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: windowHeight,
        height: windowWidth / 2,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});