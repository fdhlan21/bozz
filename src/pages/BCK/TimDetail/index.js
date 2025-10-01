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

export default function TimDetail({ navigation, route }) {
    const [data, setData] = useState([]);

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction(route.params.id);

        }

    }, [isFocused]);


    const __getTransaction = (x) => {
        axios.post(apiURL + 'tim_data_pemain.php', {
            fid_tim: x
        }).then(rz => {
            setData(rz.data);
            console.log(rz.data)
        })
    }






    const __renderItem = ({ item }) => {
        return (
            <View onPress={() => navigation.naviagte('TimDetail', item)} style={{
                padding: 10,
                marginVertical: 5,
                flex: 1,
                backgroundColor: colors.secondary,
                flexDirection: 'row'
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 25,
                    color: colors.primary,
                }}>{item.posisi}. </Text>

                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 25,
                    color: colors.primary,
                }}>{item.nama_pemain}
                </Text>
                <Text style={{
                    width: 50,
                    textAlign: 'center',
                    marginHorizontal: 40,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 25,
                    backgroundColor: colors.black,
                    color: colors.white,
                }}>{item.nomor}</Text>

                {/* <TouchableOpacity style={{
                    marginHorizontal: 10,
                }}>
                    <Icon type='ionicon' size={windowWidth / 15} name='create' color={colors.primary} />
                </TouchableOpacity> */}

                <TouchableOpacity onPress={() => {
                    axios.post(apiURL + 'tim_delete_pemain.php', {
                        id_pemain: item.id
                    }).then(rs => {
                        console.log(rs.data);
                        __getTransaction(route.params.id)
                    })
                }}>
                    <Icon type='ionicon' size={windowWidth / 15} name='trash' color={colors.danger} />
                </TouchableOpacity>

            </View>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10,
        }}>

            <View style={{
                flex: 1
            }}>

                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: windowWidth / 20
                }}>{route.params.nama_tim}</Text>


                <FlatList data={data} renderItem={__renderItem} />
            </View>


            <View style={{
                flexDirection: 'row'
            }}>
                <View style={{
                    flex: 1,
                    padding: 3,
                }}>
                    <MyButton warna={colors.white} onPress={() => navigation.navigate('TimAddPemain', {
                        fid_tim: route.params.id
                    })} title="Tambah Pemain" />
                </View>
                <View style={{
                    flex: 1,
                    padding: 3,
                }}>
                    <MyButton onPress={() => navigation.navigate('TimSet', {
                        id: route.params.id
                    })} title="Pilih SET" />
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})