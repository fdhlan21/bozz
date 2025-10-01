import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator, TouchableOpacity, BackHandler, Alert, Linking, SafeAreaView } from 'react-native';
import { fonts, windowWidth, colors, windowHeight } from '../../utils';
import { MyInput, MyGap, MyButton } from '../../components';
import axios from 'axios';
import { apiURL, api_token, MYAPP, storeData } from '../../utils/localStorage';
import { showMessage } from 'react-native-flash-message';


export default function LupaPassword({ navigation, route }) {
    const admin = route.params.tlp;
    const [telepon, setTelepon] = useState('');
    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <View style={{
                flex: 1,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    color: colors.black,
                    fontSize: 12
                }}>Silahkan masukkan no. Handphone yang terdaftar di akun kamu.</Text>
                <MyGap jarak={10} />
                <MyInput value={telepon} onChangeText={x => setTelepon(x)} autoFocus keyboardType='phone-pad' label="No. Handphone" iconname="logo-whatsapp" placeholder="No. Handphone" />

            </View>
            <View>
                <MyButton onPress={() => {
                    Linking.openURL('https://wa.me/' + admin + '?text=Hallo Admin *' + MYAPP + '*\nSaya lupa PIN. \nNo. Handphone : *' + telepon + '*');
                }} Icons="arrow-forward" title="Lanjut" warna={colors.primary} kiri={false} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})