import { Alert, StyleSheet, Text, View, Image, ActivityIndicator, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import moment from 'moment';

export default function AAInput({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(route.params);
    const [comp, setComp] = useState({});
    console.log('Hasil', route.params)





    // setLoading(false);

    const konsultasi = () => {
        navigation.navigate('AABidan')
    }

    const MyDataList = ({ l, v }) => {
        return (
            <View style={{
                padding: 5,
                marginVertical: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 28
                }}>{l}</Text>
                <Text style={{
                    marginVertical: 2,
                    borderRadius: 5,
                    backgroundColor: colors.white,
                    padding: 10,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 28,
                    color: colors.danger
                }}>{v}</Text>
            </View>
        )
    }

    useEffect(() => {
        axios.post(apiURL + 'company').then(c => {
            setComp(c.data);
            console.log(c.data)
        })
    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.myback3,
            padding: 20,
        }}>
            <MyHeader menu='Hasil Pemeriksaan' />
            <MyGap jarak={20} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <MyDataList l="Kategori Index Massa Tubuh" v={item.hmasa} />
                <MyDataList l="Lingkar Lengan (cm)" v={item.hlingkar_lengan} />
                <MyDataList l="Lingkar Perut (cm)" v={item.hlingkar_perut} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 28
                }}>Tekanan Darah (mmHg)</Text>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyDataList l="Sistole" v={item.hsistole} />
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyDataList l="Diastole" v={item.hdiastole} />
                    </View>
                </View>
                <MyDataList l="Hemoglobin (gr/dl)" v={item.hhemoglobin} />
                <MyDataList l="Gula Darah (mg/dl)" v={item.hgula_darah} />

            </ScrollView>

            <MyGap jarak={10} />
            <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: windowWidth / 28,
                marginBottom: 10,
                textAlign: 'center'
            }}>Yuk, konsultasikan hasil pemeriksaanmu dengan nakes</Text>
            {!loading && <MyButton onPress={konsultasi} title="Konsultasi" warna={colors.foourty} Icons="logo-whatsapp" />}

            {loading && <ActivityIndicator size="large" color={colors.primary} />
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})