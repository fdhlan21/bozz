import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
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


export default function ProdukDetail({ navigation, route }) {

    const [data, setData] = useState({});
    const isFocused = useIsFocused();

    const getDetail = () => {
        axios.post(apiURL + 'produk_detail', {
            id: route.params.id
        }).then(res => {
            setLoading(false);
            console.log(res.data[0]);
            setData(res.data[0]);
        });
    };

    useEffect(() => {
        if (isFocused) {
            getDetail()
        }
    }, [isFocused]);

    const MYlistdata = ({ label, value }) => {
        return (
            <View style={{
                marginVertical: 2,
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                padding: 10,
                borderRadius: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 14
                }}>{value}</Text>
            </View>

        )
    }


    const [loading, setLoading] = useState(true);


    return (
        <SafeAreaView style={{
            // padding: 10,
            backgroundColor: colors.zavalabs,
            flex: 1,
        }}>
            {!loading && <View style={{
                flex: 1,
            }}>

                <ScrollView showsVerticalScrollIndicator={false} style={{
                    padding: 10,
                }}>

                    <View style={{
                        backgroundColor: colors.white,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <MYlistdata label="Nama Produk" value={data.nama_produk} />
                        <MYlistdata label="Harga Modal" value={new Intl.NumberFormat().format(data.harga_modal)} />
                        <MYlistdata label="Harga Jual" value={new Intl.NumberFormat().format(data.harga_jual)} />
                        <MYlistdata label="Merek" value={data.merek} />
                        <MYlistdata label="Persamaan Motor Lainnya" value={data.motor_lainnya} />
                    </View>

                    <View style={{
                        marginTop: 20,
                        backgroundColor: colors.white,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <MYlistdata label="Harga Partai Silver" value={new Intl.NumberFormat().format(data.harga_silver)} />
                        <MYlistdata label="Harga Partai Gold" value={new Intl.NumberFormat().format(data.harga_gold)} />
                        <MYlistdata label="Harga Partai Platinum" value={new Intl.NumberFormat().format(data.harga_modal)} />

                    </View>

                    <View style={{
                        marginTop: 20,
                        backgroundColor: colors.white,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <MYlistdata label="Barcode" value={data.barcode} />

                    </View>

                    <View style={{
                        marginTop: 20,
                        marginBottom: 20,
                        backgroundColor: colors.white,
                        padding: 10,
                        borderRadius: 10,
                    }}>
                        <MYlistdata label="Stok Toko Sekarang" value={data.stok} />
                        <MYlistdata label="Satuan" value={data.uom} />
                        <MYlistdata label="Minimum Stok" value={data.minimal} />

                    </View>


                </ScrollView>



            </View>}


            {!loading && <View style={{

                flexDirection: 'row',
                padding: 10,

            }}>
                <View style={{
                    flex: 1,
                    paddingRight: 5
                }}>
                    <MyButton onPress={() => navigation.navigate('ProdukEdit', data)} title="Edit" Icons="create-outline" />

                </View>
                <View style={{
                    flex: 1,
                    paddingRight: 5
                }}>
                    <MyButton onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                            { text: 'TIDAK' },
                            {
                                text: 'HAPUS',
                                onPress: () => {
                                    setLoading(true);
                                    axios.post(apiURL + 'produk_hapus', {
                                        id: data.id
                                    }).then(res => {
                                        setTimeout(() => {
                                            if (res.data.status == 200) {
                                                setLoading(false);
                                                showMessage({
                                                    message: res.data.message,
                                                    type: 'success'
                                                })
                                                navigation.goBack();
                                            }
                                        }, 1000);
                                    })
                                }
                            }
                        ])
                    }} title="Hapus" warna={colors.secondary} Icons="trash-outline" />
                </View>

            </View>}

            {loading && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}><ActivityIndicator size="large" color={colors.primary} /></View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})