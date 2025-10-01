import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { MyButton, MyGap, MyHeader, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import moment from 'moment';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements';



export default function PJList({ navigation }) {

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);

    const isFocused = useIsFocused();


    const _getPJlist = () => {
        axios.post(apiURL + 'pj_list').then(res => {
            console.log(res.data)

            const TJB = res.data.filter(i => i.jenis.toLowerCase().indexOf('Tanggung Jawab'.toLowerCase()) > -1);
            const AMH = res.data.filter(i => i.jenis.toLowerCase().indexOf('Amanah'.toLowerCase()) > -1);


            setData(TJB);
            setData2(AMH);
        })
    }


    useEffect(() => {
        if (isFocused) {
            _getPJlist();
        }
    }, [isFocused])

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>

            <MyHeader />

            <ScrollView>
                <View style={{
                    flex: 1,
                    padding: 20,
                }}>

                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 25,
                        marginBottom: 10,
                    }}>Tanggung Jawab</Text>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15,
                    }}>Daftar Tanggung Jawab</Text>

                    <View style={{
                        marginTop: 10,
                        marginBottom: 5,
                        borderWidth: 1,
                        padding: 5,
                        borderRadius: 5,
                        backgroundColor: colors.primary,
                        flexDirection: 'row'

                    }}>
                        <Text style={{
                            fontFamily: fonts.primary.normal,
                            fontSize: 15,
                            flex: 1,
                            color: colors.white,
                        }}>Tanggung Jawab</Text>
                        <Text style={{
                            flex: 0.3,
                            fontFamily: fonts.primary.normal,
                            fontSize: 15,
                            color: colors.white,
                        }}>Bobot</Text>
                        <TouchableOpacity style={{
                            width: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                        }}>

                        </TouchableOpacity>
                    </View>

                    {data.map((item, index) => {
                        return (
                            <View style={{
                                padding: 10,
                                borderWidth: 2,
                                borderColor: colors.primary,
                                marginBottom: 5,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary.normal,
                                    fontSize: 14,
                                    color: colors.primary,
                                }}>{index + 1}. </Text>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary.normal,
                                        fontSize: 14,
                                        color: colors.primary,
                                    }}>{item.judul}</Text>
                                    <Text style={{
                                        fontFamily: fonts.primary[400],
                                        fontSize: 12,
                                        color: colors.primary,
                                    }}>{item.nama_lengkap} - {item.kategori}</Text>
                                </View>
                                <Text style={{
                                    flex: 0.3,
                                    fontFamily: fonts.primary.normal,
                                    fontSize: 14,
                                    color: colors.primary,
                                }}>{item.bobot}</Text>
                                <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                                    { text: 'TIDAK' },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            axios.post(apiURL + 'pj_delete', {
                                                id: item.id
                                            }).then(res => {
                                                console.log(res.data);
                                                _getPJlist();
                                                if (res.data == 200) {
                                                    showMessage({
                                                        type: 'success',
                                                        message: 'Berhasil dihapus !'
                                                    })
                                                }

                                            })
                                        }
                                    }
                                ])} style={{
                                    paddingHorizontal: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                }}>
                                    <Icon type='ionicon' name='close-circle' color={colors.merah} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                </View>
                <View style={{
                    flex: 1,
                    padding: 20,
                }}>

                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 25,
                        marginBottom: 10,
                    }}>Amanah</Text>

                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15,
                        marginBottom: 10,
                    }}>Daftar Amanah</Text>



                    {data2.map((item, index) => {
                        return (
                            <View style={{
                                padding: 10,
                                borderWidth: 2,
                                borderColor: colors.primary,
                                marginBottom: 5,
                                borderRadius: 10,
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                <Text style={{
                                    fontFamily: fonts.primary.normal,
                                    fontSize: 14,
                                    color: colors.primary,
                                }}>{index + 1}. </Text>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <Text style={{
                                        fontFamily: fonts.primary.normal,
                                        fontSize: 14,
                                        color: colors.primary,
                                    }}>{item.judul}</Text>
                                    <Text style={{
                                        fontFamily: fonts.primary[400],
                                        fontSize: 12,
                                        color: colors.primary,
                                    }}>{item.nama_lengkap} - {item.kategori}</Text>
                                </View>
                                <Text style={{
                                    flex: 0.3,
                                    fontFamily: fonts.primary.normal,
                                    fontSize: 14,
                                    color: colors.primary,
                                }}>{''}</Text>
                                <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                                    { text: 'TIDAK' },
                                    {
                                        text: 'HAPUS',
                                        onPress: () => {
                                            axios.post(apiURL + 'pj_delete', {
                                                id: item.id
                                            }).then(res => {
                                                console.log(res.data);
                                                _getPJlist();
                                                if (res.data == 200) {
                                                    showMessage({
                                                        type: 'success',
                                                        message: 'Berhasil dihapus !'
                                                    })
                                                }

                                            })
                                        }
                                    }
                                ])} style={{
                                    paddingHorizontal: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                }}>
                                    <Icon type='ionicon' name='close-circle' color={colors.merah} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                </View>
            </ScrollView>

            <View style={{
                padding: 20,
            }}>
                <MyButton onPress={() => navigation.navigate('PJListAdd')} warna={colors.black} title="Tambah PJ List" Icons="duplicate" iconColor={colors.white} colorText={colors.white} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})