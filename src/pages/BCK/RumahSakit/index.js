import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, ImageBackground, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native'
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
import 'moment/locale/id';
import MyCarouser from '../../components/MyCarouser';

export default function RumahSakit({ navigation, route }) {

    const [data, setData] = useState([]);
    const isFocus = useIsFocused();
    const [user, setUser] = useState({});

    const _getTransaction = async () => {

        await getData('user').then(u => {
            setUser(u);
        })


        await axios.post(apiURL + 'rumah_sakit').then(res => {

            console.log(res.data);
            setData(res.data);

        });
    }


    useEffect(() => {
        if (isFocus) {
            _getTransaction();
        }
    }, [isFocus]);

    const __renderItem = ({ item }) => {
        return (

            <View style={{
                marginVertical: 7,
                marginHorizontal: 20,
                flex: 1,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colors.primary,
                flexDirection: 'row'
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 5,
                }}>
                    <Image source={{
                        uri: item.image
                    }} style={{
                        width: 100,
                        height: 60,
                        resizeMode: 'contain',
                        marginBottom: 10,
                    }} />
                </View>
                <View style={{
                    padding: 10,
                    flex: 1,
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                    }}>{item.nama_rs}</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[400],
                        fontSize: 13,
                    }}>{item.alamat_rs}</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('Janji', item)} style={{
                        padding: 10,
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            color: colors.white,
                            flex: 1,
                        }}>Buat Janji temu</Text>
                        <Icon type='ionicon' name='calendar-outline' size={20} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors.white,
                padding: 5,
                height: 80,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                alignItems: 'center'
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    padding: 5,
                }}>
                    <Icon type='ionicon' name='arrow-back-outline' size={windowWidth / 13} color={colors.black} />
                </TouchableOpacity>
                <Text style={{
                    flex: 1,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 20,
                    color: colors.black
                }}>Janji Temu</Text>


            </View>

            <View style={{
                flex: 1,
            }}>
                <FlatList data={data} showsVerticalScrollIndicator={false} renderItem={__renderItem} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})