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
import Orientation from 'react-native-orientation-locker';
export default function TimSetDetail({ navigation, route }) {
    const [data, setData] = useState([]);

    navigation.setOptions({
        title: 'SET ' + route.params.set
    })

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            __getTransaction(route.params.id);
            Orientation.lockToPortrait();
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



    const [pilih, setPilih] = useState(0);





    const __renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                console.log(item.id);
                setPilih(item.id)
            }} style={{
                padding: 10,
                marginVertical: 2,
                flex: 1,
                backgroundColor: item.id == pilih ? colors.secondary : colors.white,
                flexDirection: 'row',
                // borderWidth: 2,
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row'
                }}>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.primary,
                    }}>{item.posisi}. </Text>

                    <Text style={{
                        // flex: 1,
                        width: windowWidth / 2,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.primary,
                    }}>{item.nama_pemain}
                    </Text>
                    <Text style={{
                        left: 5,
                        width: 50,
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        backgroundColor: colors.black,
                        color: colors.white,
                    }}>{item.nomor} </Text>

                </View>


                <Icon size={windowWidth / 15} type='ionicon' name={item.id == pilih ? 'checkmark-circle' : 'checkmark-circle-outline'} />



            </TouchableOpacity>
        )
    }


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10,
        }}>



            <View style={{
                flex: 0.2,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    fontSize: windowWidth / 20,
                }}>Posisi</Text>
            </View>
            <View style={{
                flex: 0.3,
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>

                <TouchableOpacity onPress={() => {
                    axios.post(apiURL + 'tim_update.php', {
                        fid_tim: route.params.id,
                        id_pemain: pilih,
                        posisi: 4
                    }).then(res => {

                        __getTransaction(route.params.id)
                    })
                }} style={{
                    width: windowWidth / 4.5,
                    backgroundColor: colors.secondary,
                    height: windowWidth / 4.5,
                    borderRadius: (windowWidth / 4.5) / 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: windowWidth / 10
                    }}>4</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    axios.post(apiURL + 'tim_update.php', {
                        fid_tim: route.params.id,
                        id_pemain: pilih,
                        posisi: 3
                    }).then(res => {

                        __getTransaction(route.params.id)
                    })
                }} style={{
                    width: windowWidth / 4.5,
                    backgroundColor: colors.secondary,
                    height: windowWidth / 4.5,
                    borderRadius: (windowWidth / 4.5) / 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: windowWidth / 10
                    }}>3</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    axios.post(apiURL + 'tim_update.php', {
                        fid_tim: route.params.id,
                        id_pemain: pilih,
                        posisi: 2
                    }).then(res => {

                        __getTransaction(route.params.id)
                    })
                }} style={{
                    width: windowWidth / 4.5,
                    backgroundColor: colors.secondary,
                    height: windowWidth / 4.5,
                    borderRadius: (windowWidth / 4.5) / 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: windowWidth / 10
                    }}>2</Text>
                </TouchableOpacity>

            </View>
            <View style={{
                flex: 0.3,
                flexDirection: 'row',
                justifyContent: 'space-around'
            }}>

                <TouchableOpacity onPress={() => {
                    axios.post(apiURL + 'tim_update.php', {
                        fid_tim: route.params.id,
                        id_pemain: pilih,
                        posisi: 5
                    }).then(res => {

                        __getTransaction(route.params.id)
                    })
                }} style={{
                    width: windowWidth / 4.5,
                    backgroundColor: colors.secondary,
                    height: windowWidth / 4.5,
                    borderRadius: (windowWidth / 4.5) / 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: windowWidth / 10
                    }}>5</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    axios.post(apiURL + 'tim_update.php', {
                        fid_tim: route.params.id,
                        id_pemain: pilih,
                        posisi: 6
                    }).then(res => {

                        __getTransaction(route.params.id)
                    })
                }} style={{
                    width: windowWidth / 4.5,
                    backgroundColor: colors.secondary,
                    height: windowWidth / 4.5,
                    borderRadius: (windowWidth / 4.5) / 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: windowWidth / 10
                    }}>6</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    axios.post(apiURL + 'tim_update.php', {
                        fid_tim: route.params.id,
                        id_pemain: pilih,
                        posisi: 1
                    }).then(res => {

                        __getTransaction(route.params.id)
                    })
                }} style={{
                    width: windowWidth / 4.5,
                    backgroundColor: colors.secondary,
                    height: windowWidth / 4.5,
                    borderRadius: (windowWidth / 4.5) / 2,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontFamily: fonts.secondary[600],
                        color: colors.primary,
                        fontSize: windowWidth / 10
                    }}>1</Text>
                </TouchableOpacity>

            </View>
            <View style={{
                flex: 1
            }}>
                <Text style={{
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    color: colors.white,
                    marginBottom: 10,
                    fontSize: windowWidth / 20
                }}>Pemain</Text>
                <FlatList data={data} renderItem={__renderItem} />
            </View>

            <MyButton onPress={() => navigation.navigate('TimMulai', {
                id: route.params.id,
                set: route.params.set
            })} title="Mulai" />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})