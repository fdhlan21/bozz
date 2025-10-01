import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
    Modal,
    TextInput,
} from 'react-native';
import { windowWidth, fonts, windowHeight } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
export default function Success({ navigation, route }) {

    const trx = route.params;

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs
        }}>
            <View style={{
                flex: 1,
                marginTop: 20,
                backgroundColor: colors.white,
                margin: 10,
                borderRadius: 10,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image source={require('../../assets/ok.png')} style={{
                        width: 150,
                        height: 150,
                        marginBottom: 10,
                    }} />
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: 20,
                    }}>Transaksi Berhasil !</Text>
                </View>
                <View style={{
                    flex: 0.5,
                    paddingHorizontal: 20,
                }}>


                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: 20,
                        }}>Pembayaran</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                        }}>Tunai</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: 20,
                        }}>Total Tagihan</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                        }}>Rp {new Intl.NumberFormat().format(trx.total)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: 20,
                        }}>Diterima</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                        }}>Rp {new Intl.NumberFormat().format(trx.bayar)}</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                    }}>
                        <Text style={{
                            flex: 1,
                            fontFamily: fonts.secondary[400],
                            fontSize: 20,
                        }}>Total Tagihan</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                        }}>Rp {new Intl.NumberFormat().format(trx.kembalian)}</Text>
                    </View>

                </View>
            </View>
            <View style={{
                // flex: 0.4,
                margin: 10,
            }}>
                <MyButton warna='transparent' borderSize={1} title="Cetak Struk" colorText={colors.primary} iconColor={colors.primary} Icons='print' />
                <MyGap jarak={10} />
                <MyButton title="Mulai Transaksi Baru" Icons='cart' onPress={() => navigation.replace('Transaksi')} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})