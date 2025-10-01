import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Modal,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader, MyInput } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';
import { showMessage } from 'react-native-flash-message';

export default function Profit({ navigation }) {
    const [nama, setNama] = useState('');
    const [ID, setID] = useState('PT' + moment().format('YYMMDDHHmmss'))
    const [modalVisible, setModalVisible] = useState(false);
    const [poin, setPoin] = useState('');


    const [kirim, setKirim] = useState({
        last: 0,
        inv: '',
        avg: '',
        new: '',
        bfr: '',
        total: '',

    });

    useEffect(() => {
        getData('profit').then(res => {
            console.log(res)
            setKirim({
                ...kirim,
                last: res[res.length - 1].total
            })
        })
    }, [])

    const formatRupiah = (angka) => {
        if (!angka) return angka;
        const num = angka.toString().replace(/[^,\d]/g, '');
        const split = num.split(',');
        const sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        const ribuan = split[0].substr(sisa).match(/\d{3}/g);
        if (ribuan) {
            rupiah += (sisa ? '.' : '') + ribuan.join('.');
        }
        return 'Rp' + (split[1] !== undefined ? rupiah + ',' + split[1] : rupiah);
    };

    const parseNumber = (str) => {
        return parseInt(str.replace(/[^0-9]/g, '')) || 0;
    };


    const simpanData = async () => {
        console.log(kirim);

        console.log({
            inv: parseFloat(parseNumber(kirim.inv)),
            avg: parseFloat(parseNumber(kirim.avg)),
            new: parseFloat(parseNumber(kirim.new)),
            bfr: parseFloat(parseNumber(kirim.bfr)),
            total: parseFloat(parseNumber(kirim.inv)) * parseFloat(parseNumber(kirim.avg)) + parseFloat(parseNumber(kirim.new)) - parseFloat(parseNumber(kirim.bfr)),


        });

        setKirim({
            id: moment().format('YYYYMMDDHHmmss'),
            inv: parseFloat(parseNumber(kirim.inv)),
            avg: parseFloat(parseNumber(kirim.avg)),
            new: parseFloat(parseNumber(kirim.new)),
            bfr: parseFloat(parseNumber(kirim.bfr)),
            total: parseFloat(parseNumber(kirim.inv)) * parseFloat(parseNumber(kirim.avg)) + parseFloat(parseNumber(kirim.new)) - parseFloat(parseNumber(kirim.bfr)),


        })

        getData('profit').then(res => {
            let tmp = res ? res : [];
            const KIRIM = {
                ...kirim,
                id: moment().format('YYYYMMDDHHmmss'),
                inv: parseFloat(parseNumber(kirim.inv)),
                avg: parseFloat(parseNumber(kirim.avg)),
                new: parseFloat(parseNumber(kirim.new)),
                bfr: parseFloat(parseNumber(kirim.bfr)),

                total: parseFloat(parseNumber(kirim.inv)) * parseFloat(parseNumber(kirim.avg)) + parseFloat(parseNumber(kirim.new)) - parseFloat(parseNumber(kirim.bfr)),

            }

            tmp.push(KIRIM); // tambahkan data baru
            storeData('profit', tmp);


            setTimeout(() => {
                showMessage({
                    type: 'success',
                    message: 'Berhasil di simpan !'
                })
                navigation.goBack()
            }, 500); // modal tampil 1.5 detik


        })


        // navigation.goBack();









    };



    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Informasi Profit" />
            <ScrollView>
                <View style={{ padding: 20 }}>

                    <MyInput
                        disabled
                        label="Profit Trakhir"
                        keyboardType="number-pad"
                        value={formatRupiah(kirim.last)}
                    />

                    <MyInput
                        label="Inventory yang Tersisa"
                        keyboardType="number-pad"
                        value={formatRupiah(kirim.inv)}
                        onChangeText={x => setKirim({ ...kirim, inv: formatRupiah(x) })}
                    />

                    <MyInput
                        label="Harga Rata-rata Inventory"
                        keyboardType="number-pad"
                        value={formatRupiah(kirim.avg)}
                        onChangeText={x => setKirim({ ...kirim, avg: formatRupiah(x) })}
                    />

                    <MyInput
                        label="Kas Setelah Penjualan yang Baru"
                        keyboardType="number-pad"
                        value={formatRupiah(kirim.new)}
                        onChangeText={x => setKirim({ ...kirim, new: formatRupiah(x) })}
                    />

                    <MyInput
                        label="Kas Penjualan Sebelumnya"
                        keyboardType="number-pad"
                        value={formatRupiah(kirim.bfr)}
                        onChangeText={x => setKirim({ ...kirim, bfr: formatRupiah(x) })}
                    />

                    <Text style={{
                        textAlign: 'center',
                        marginTop: 10,
                        fontFamily: fonts.secondary[600],
                        fontSize: 30,
                    }}>
                        {formatRupiah(kirim.total)}
                    </Text>

                </View>



            </ScrollView>

            <View style={{ padding: 20 }}>
                <TouchableNativeFeedback onPress={simpanData}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 20,
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 15,
                            }}>
                            Simpan
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>

            {/* Modal Sukses */}
            <Modal visible={modalVisible} transparent animationType="fade">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#00000066',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 30,
                            borderRadius: 20,
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 16,
                                color: colors.primary,
                                marginBottom: 20,
                            }}>
                            Data Berhasil Tersimpan
                        </Text>
                        <Image
                            source={require('../../assets/success.png')} // sesuaikan dengan lokasi file PNG kamu
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
