import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios';
import { MYAPP, apiURL } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';
import { colors, fonts } from '../../utils';
import { MyButton, MyGap, MyHeader } from '../../components';
import moment from 'moment';

export default function PJSayaDetailIkhlas({ navigation, route }) {
    const item = route.params;


    const _hapusIkhlas = () => {
        Alert.alert(MYAPP, 'Apakah kamu yakin akan menghapus ikhlas ini ?', [
            { text: 'TIDAK' },
            {
                text: 'HAPUS',
                onPress: () => {
                    axios.post(apiURL + 'pj_ikhlas_hapus', {
                        id: route.params.id
                    }).then(res => {
                        showMessage({
                            type: 'success',
                            message: 'Data berhasil dihapus !'
                        });
                        navigation.goBack();
                    })
                }
            }
        ])
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white
        }}>
            <MyHeader />

            <ScrollView style={{
                paddingHorizontal: '7%'
            }}>
                <View style={{
                    marginVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15
                    }}>Tanggal</Text>
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: 13
                    }}>{moment(item.tanggal).format('dddd, DD MMMM YYYY')}</Text>
                </View>
                <View style={{
                    marginVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15
                    }}>Foto Sebelum</Text>
                    <Image style={{
                        marginVertical: 5,
                        width: '100%',
                        height: 220,
                        borderRadius: 10,
                    }} source={{
                        uri: item.foto_ikhlas1
                    }} />
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15
                    }}>Deksripsi</Text>
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: 13
                    }}>{item.deskripsi_sebelum}</Text>
                </View>
                <View style={{
                    marginVertical: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                }}>
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15
                    }}>Foto Sesudah</Text>
                    <Image style={{
                        marginVertical: 5,
                        width: '100%',
                        height: 220,
                        borderRadius: 10,
                    }} source={{
                        uri: item.foto_ikhlas1
                    }} />
                    <Text style={{
                        fontFamily: fonts.primary.normal,
                        fontSize: 15
                    }}>Deksripsi</Text>
                    <Text style={{
                        fontFamily: fonts.primary[400],
                        fontSize: 13
                    }}>{item.deskripsi_sesudah}</Text>
                </View>
                <MyGap jarak={20} />
                <MyButton onPress={_hapusIkhlas} warna={colors.merah} title="Hapus Ikhas" Icons="trash-outline" />
                <MyGap jarak={20} />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})