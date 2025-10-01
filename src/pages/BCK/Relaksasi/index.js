import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback, Linking } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import SoundPlayer from 'react-native-sound-player'
import 'moment/locale/id';

export default function Relaksasi({ navigation }) {

    const [play, setPlay] = useState(false);
    const [pilih, setPilih] = useState({});

    const DataAudio = [
        {
            label: 'Musik Terapi 1',
            audio: 'r1'
        },
        {
            label: 'Musik Terapi 2',
            audio: 'r2'
        },
        {
            label: 'Musik Terapi 3',
            audio: 'r3'
        },
        {
            label: 'Musik Terapi 4',
            audio: 'r4'
        },
        {
            label: 'Musik Terapi 5',
            audio: 'r5'
        },
        {
            label: 'Musik Terapi 6',
            audio: 'r6'
        },
        {
            label: 'Musik Terapi 7',
            audio: 'r7'
        },
        {
            label: 'Musik Terapi 8',
            audio: 'r8'
        },
        {
            label: 'Musik Terapi 9',
            audio: 'r9'
        },
        {
            label: 'Musik Terapi 10',
            audio: 'r10'
        },
    ]
    const MyMenuFeature = ({ img = require('../../assets/terapi.png'), label, onPress }) => {
        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={{
                    padding: 10,
                    left: 10,
                    marginVertical: 4,
                    borderWidth: 1,
                    height: 60,
                    borderRadius: 10,
                    borderColor: colors.border,
                    marginHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>

                    <Image source={img} style={{
                        width: 50,
                        height: 50,
                        marginLeft: -25,
                    }} />

                    <Text style={{
                        marginLeft: 20,
                        fontFamily: fonts.secondary[600],
                        marginVertical: 5,
                        color: colors.primary,
                        fontSize: 18,
                    }}>{label}</Text>
                </View>
            </TouchableWithoutFeedback >
        )
    }
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            position: 'relative'
        }}>

            <View style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 0
            }}>
                <Image source={require('../../assets/top2.png')} style={{
                    width: 100,
                    height: 140,
                }} />
            </View>
            <View style={{
                height: 120,
                justifyContent: 'flex-end',
                alignItems: 'center',
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    color: colors.primary,
                    fontSize: 24,
                    marginBottom: 5,

                }}>Relaksasi</Text>
                <View style={{
                    borderBottomWidth: 1,
                    width: windowWidth / 2,
                    borderColor: colors.border

                }}></View>
            </View>

            <View style={{
                flex: 1,
                padding: 20,
            }}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    {DataAudio.map((i, index) => {
                        return (
                            <MyMenuFeature label={i.label} onPress={() => {
                                setPlay(true);
                                setPilih(i);
                                SoundPlayer.playSoundFile(i.audio, 'mp3')
                            }} />
                        )
                    })}
                </ScrollView>





            </View>
            <View style={{
                padding: 10,
                backgroundColor: colors.primary,
                height: 70,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: 20,
                }}>{pilih.label}</Text>
                {play && <TouchableOpacity onPress={() => {
                    SoundPlayer.pause();
                    setPlay(false)
                }} style={{
                    padding: 10,
                }}>
                    <Icon type='ionicon' name='pause' size={30} color={colors.white} />
                </TouchableOpacity>}
                {!play && <TouchableOpacity onPress={() => {
                    SoundPlayer.play();
                    setPlay(true)
                }} style={{
                    padding: 10,
                }}>
                    <Icon type='ionicon' name='play' size={30} color={colors.white} />
                </TouchableOpacity>}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})