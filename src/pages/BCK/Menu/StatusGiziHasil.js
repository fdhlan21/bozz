import { ActivityIndicator, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MyDimensi, colors, fonts, windowHeight, windowWidth } from '../../utils'
import { Icon } from 'react-native-elements';
import YoutubePlayer from "react-native-youtube-iframe";
import axios from 'axios';
import { MYAPP, apiURL, getData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyCalendar, MyGap, MyHeader, MyInput, MyPicker, MyRadio } from '../../components';
import { ScrollView } from 'react-native';
import SweetAlert from 'react-native-sweet-alert';

export default function StatusGiziHasil({ navigation, route }) {
    const user = route.params;
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <MyHeader judul="Hasil Status Gizi" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})