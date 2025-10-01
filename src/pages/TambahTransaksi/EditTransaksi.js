import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Modal,
    Image,
    Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyCalendar, MyHeader, MyInput, MyPicker } from '../../components';
import { Color, colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { getData, MYAPP, storeData } from '../../utils/localStorage';
import { ListFormat } from 'intl';

const formatRupiah = (angka) => {
    if (!angka) return '0';
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

export default function EditTransaksi({ navigation, route }) {

    const [kirim, setKirim] = useState(route.params)
    const [modalVisible, setModalVisible] = useState(false);
    const [tanggal, setTanggal] = useState('');
    const [kasAwal, setKasAwal] = useState('');
    const [timbangan, setTimbangan] = useState('');
    const [inventory, setInventory] = useState('');
    const [pemasukan, setPemasukan] = useState('');
    const [pengeluaran, setPengeluaran] = useState('');
    const [kasModal, setKasModal] = useState('Rp0');
    const [pilihRumus, setPilihRumus] = useState('pemasukan');
    const [poinku, setPoinku] = useState('');
    const [barang, setBarang] = useState('');
    const [beban, setBeban] = useState('');

    const [petani, setPetani] = useState([]);
    const [okepetani, setOkepetani] = useState({
        id_petani: '',
        nama: '',
    })

    useEffect(() => {
        getData('petani').then(res => {
            // setPetani(res);
            let tmp = [];
            res.map(item => {
                tmp.push({
                    value: item.id + '_' + item.nama,
                    label: item.id + ' / ' + item.nama
                });
                setPetani(tmp);
            })
            console.log(res);
        })
        const awal = parseNumber(kasAwal);
        const masuk = parseNumber(pemasukan);
        const keluar = parseNumber(pengeluaran);
        let total = awal;
        if (masuk && keluar) {
            total = pilihRumus === 'pemasukan' ? awal + masuk : awal - keluar;
        } else if (masuk) {
            total = awal + masuk;
        } else if (keluar) {
            total = awal - keluar;
        }
        setKasModal(formatRupiah(total.toString()));
    }, [kasAwal, pemasukan, pengeluaran, pilihRumus]);

    const simpanTransaksi = async () => {

        console.log(kirim);

        try {

            getData('transaksi').then(res => {
                let tmp = res ? res : []; // kalau belum ada, jadikan array kosong

                const index = tmp.findIndex(i => i.id == kirim.id);
                if (index !== -1) {
                    console.log(index);

                    let updated = [...tmp];
                    updated[index] = {
                        ...updated[index],
                        kasAwal: kirim.kasAwal,
                        tanggal: kirim.tanggal,
                        timbangan: kirim.timbangan,
                        inventory: kirim.inventory,
                        pemasukan: kirim.pemasukan,
                        pengeluaran: kirim.pengeluaran,
                        kasModal: kirim.kasModal,
                        poinku: kirim.poinku,
                        beban: kirim.beban,
                        barang: kirim.barang,

                        last_update: moment().format('YYYYMMDDHHmmss'),

                    };

                    storeData('transaksi', updated);
                    setModalVisible(true);
                    setTimeout(() => {
                        setModalVisible(false);
                        navigation.goBack();
                    }, 500);
                }
            })






            // const lama = JSON.parse(await AsyncStorage.getItem('DATA_TRANSAKSI')) || [];
            // const baru = [...lama, data];
            // await AsyncStorage.setItem('DATA_TRANSAKSI', JSON.stringify(baru));


        } catch (e) {
            alert('Gagal menyimpan transaksi');
        }
    };

    useEffect(() => {
        if (!tanggal) {
            const today = moment().format('YYYY-MM-DD');
            setTanggal(today);
        }
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Edit Transaksi" />

            <ScrollView>
                <View style={{ padding: 20 }}>
                    <View style={{
                        padding: 10,
                        borderWidth: 1,
                        marginTop: 10,
                        borderRadius: 10,
                        borderColor: Color.blueGray[300],
                    }}>
                        <View>
                            <Text style={{
                                ...fonts.caption,
                            }}>ID Petani</Text>
                            <Text style={{
                                ...fonts.headline5,
                            }}>{kirim.id_petani}</Text>
                        </View>
                        <View>
                            <Text style={{
                                ...fonts.caption,
                            }}>Nama</Text>
                            <Text style={{
                                ...fonts.headline5,
                            }}>{kirim.nama}</Text>
                        </View>
                        <View>
                            <Text style={{
                                ...fonts.caption,
                            }}>Tipe Transaksi</Text>
                            <Text style={{
                                ...fonts.headline5,
                            }}>{kirim.tipe}</Text>
                        </View>
                    </View>


                    <MyCalendar
                        label="Tanggal :"
                        placeholder="Pilih Tanggal"
                        iconname="calendar"
                        value={kirim.tanggal}
                        onDateChange={(date) => setKirim({
                            ...kirim,
                            tanggal: date
                        })}
                    />





                    {kirim.tipe == 'Kakao' &&
                        <MyInput
                            label="Beban Beban Lain"
                            placeholder="Isi Beban Beban Lain"
                            value={kirim.beban}

                            onChangeText={(val) => {
                                setKirim({
                                    ...kirim,
                                    beban: val
                                })
                            }}
                        />
                    }


                    {kirim.tipe !== 'Kakao' &&
                        <MyInput
                            label="Nama Barang"
                            placeholder="Isi Nama Barang"
                            value={kirim.barang}

                            onChangeText={(val) => {
                                setKirim({
                                    ...kirim,
                                    barang: val
                                })
                            }}
                        />
                    }

                    {kirim.tipe !== 'Kakao' &&
                        <MyInput
                            label="Poin"
                            placeholder="Isi poin"
                            value={kirim.poinku}
                            keyboardType='numeric'

                            onChangeText={(val) => {
                                setKirim({
                                    ...kirim,
                                    poinku: val
                                })
                            }}
                        />

                    }



                    <MyInput
                        label="Kas/Modal Awal :"
                        placeholder="Isi Kas/Modal Awal"
                        value={formatRupiah(kirim.kasAwal)}
                        keyboardType="numeric"
                        onChangeText={(val) => {
                            setKirim({
                                ...kirim,
                                kasAwal: parseNumber(val)
                            })
                        }}
                    />



                    <MyInput
                        label={kirim.tipe == 'Kakao' ? "Timbangan (Kg) :" : "Item :"}
                        placeholder="Isi Timbangan (Kg)"
                        value={kirim.timbangan}
                        keyboardType="numeric"
                        onChangeText={(val) => {
                            setKirim({
                                ...kirim,
                                timbangan: val
                            })
                        }}
                    />


                    {/* <MyInput
                        label="Poin :"
                        placeholder="Isi poin"
                        value={kirim.poin}
                        keyboardType="numeric"
                        onChangeText={(val) => {
                            setKirim({
                                ...kirim,
                                poin: val
                            })
                        }}
                    /> */}

                    <MyInput
                        label="Inventory :"
                        placeholder="Isi Inventory"
                        value={kirim.inventory}
                        onChangeText={(val) => {
                            setKirim({
                                ...kirim,
                                inventory: val
                            })
                        }}
                    />

                    <MyInput
                        label={kirim.tipe == 'Kakao' ? "Pemasukan :" : "Penjualan :"}

                        value={formatRupiah(kirim.pemasukan)}
                        keyboardType="numeric"
                        onChangeText={(val) => {
                            setKirim({
                                ...kirim,
                                pemasukan: parseNumber(val)
                            })
                        }}
                    />

                    <MyInput
                        label={kirim.tipe == 'Kakao' ? "Pengeluaran :" : "Pembelian :"}

                        value={formatRupiah(kirim.pengeluaran)}
                        keyboardType="numeric"
                        onChangeText={(val) => {
                            setKirim({
                                ...kirim,
                                pengeluaran: parseNumber(val)
                            })
                        }}
                    />



                    <MyInput
                        label="Kas/Modal :"
                        value={formatRupiah(kirim.kasModal)}
                        keyboardType="numeric"
                        onChangeText={(val) => {
                            setKirim({
                                ...kirim,
                                kasModal: parseNumber(val)
                            })
                        }}
                    />

                    <TouchableNativeFeedback onPress={simpanTransaksi}>
                        <View
                            style={{
                                padding: 10,
                                backgroundColor: colors.primary,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                                marginTop: 20,
                            }}>
                            <Text
                                style={{
                                    color: colors.white,
                                    textAlign: 'center',
                                    fontFamily: fonts.primary[600],
                                    fontSize: 15,
                                }}>
                                Simpan
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </ScrollView>

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
                            source={require('../../assets/success.png')}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
