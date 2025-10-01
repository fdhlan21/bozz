import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    TextInput,
    TouchableNativeFeedback,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyButton, MyHeader } from '../../components';
import { fonts, colors } from '../../utils';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/id';
import NetInfo from '@react-native-community/netinfo';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { getData, storeData } from '../../utils/localStorage';
import 'intl';
import 'intl/locale-data/jsonp/id';
import { showMessage } from 'react-native-flash-message';

export default function PetaniDetail({ navigation, route }) {
    const [data, setData] = useState([]);
    const [editVisible, setEditVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({
        tanggal: '',
        nama: '',
        kasAwal: '',
        timbangan: '',
        inventory: '',
        pemasukan: '',
        pengeluaran: '',
        kasModal: '',
    });

    const labelText = {
        tanggal: 'Tanggal',
        namaPetani: 'Nama Petani',
        kasAwal: 'Kas/Modal Awal',
        timbangan: 'Timbangan (Kg)',
        inventory: 'Inventory',
        pemasukan: 'Pemasukan',
        pengeluaran: 'Pengeluaran',
        kasModal: 'Kas/Modal',
    };

    const formatRupiah = (angka) => {
        let number_string = angka.replace(/[^,\d]/g, '').toString();
        let split = number_string.split(',');
        let sisa = split[0].length % 3;
        let rupiah = split[0].substr(0, sisa);
        let ribuan = split[0].substr(sisa).match(/\d{3}/g);
        if (ribuan) {
            rupiah += (sisa ? '.' : '') + ribuan.join('.');
        }
        return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    };

    const getLaporan = async () => {
        getData('transaksi').then(res => {
            console.log(res);
            let tmp = res ? res : [];
            const filteredes = tmp.filter(i => i.id_petani == route.params.id_petani);
            let totalTM = 0;
            let totalPEM = 0;
            filteredes.map(i => {
                totalTM += parseFloat(i.timbangan);
                totalPEM += parseFloat(i.pemasukan);
            })
            setTOTAL({
                timbangan: totalTM,
                pemasukan: totalPEM
            })
            setData(filteredes);
        })
    };

    const simpanEdit = async () => {
        const baru = [...data];
        baru[editIndex] = form;
        await AsyncStorage.setItem('DATA_TRANSAKSI', JSON.stringify(baru));
        setData(baru);
        setEditVisible(false);
    };

    const [TOTAL, setTOTAL] = useState({
        timbangan: 0,
        pemasukan: 0
    })
    const downloadExcel = async () => {
        NetInfo.fetch().then(async state => {
            if (!state.isConnected) {
                Alert.alert(
                    'Koneksi Tidak Aktif',
                    'Aktifkan koneksi internet untuk mengunduh laporan Excel.'
                );
            } else {
                const ws = XLSX.utils.json_to_sheet(data);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, 'Data');

                const wbout = XLSX.write(wb, { type: 'binary', bookType: 'xlsx' });
                const path = `${RNFS.DownloadDirectoryPath}/data_laporan.xlsx`;

                RNFS.writeFile(path, wbout, 'ascii')
                    .then(() => {
                        Share.open({
                            url: `file://${path}`,
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                            failOnCancel: false,
                        });
                    })
                    .catch(err => {
                        Alert.alert('Gagal Simpan File', err.message);
                    });
            }
        });
    };

    useEffect(() => {
        const focus = navigation.addListener('focus', getLaporan);
        return focus;
    }, [navigation]);

    const deleteAll = () => {
        Alert.alert(
            'Konfirmasi',
            'Yakin ingin menghapus data transaksi petani ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        getData('transaksi').then(res => {
                            let filted = res.filter(i => i.id_petani !== route.params.id_petani);
                            console.log(filted);
                            storeData('transaksi', filted);
                            getLaporan();
                            showMessage({
                                type: 'success',
                                message: 'Berhasil dihapus semua !'
                            })
                        })
                    },
                },
            ]
        );
    };

    // Filter hasil berdasarkan nama petani
    // const filteredData = data.filter(item =>
    //   item.nama?.toLowerCase().includes(search.toLowerCase())
    // );

    const MyList = ({ label, value }) => {
        return (

            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: fonts.primary[400], color: colors.black }}>
                    {label}
                </Text>
                <Text style={{ flex: 1, fontSize: 12, fontFamily: fonts.primary[600], color: colors.primary }}>
                    {value}
                </Text>
            </View>


        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.white }}>
            <MyHeader title="Laporan Petani" />



            <View style={{ padding: 20, flex: 1 }}>
                {/* {filteredData.length === 0 && (
              <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>
                Tidak ada data sesuai pencarian
              </Text>
            )} */}
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <View
                            key={index}
                            style={{
                                borderRadius: 16,
                                backgroundColor: '#FAFAFA',
                                borderColor: '#ddd',
                                borderWidth: 1,
                                padding: 16,
                                marginBottom: 16,
                            }}>
                            <MyList label="Tipe Transaksi" value={item.tipe} />

                            <MyList label="Tanggal" value={moment(item.tanggal).format('DD MMMM YYYY')} />
                            {item.tipe == 'Kakao' && <MyList label="Beban Beban Lain" value={item.beban} />}
                            <MyList label="Petani" value={item.id_petani + ' - ' + item.nama} />

                            <MyList label="Kas/Modal Awal" value={'Rp' + new Intl.NumberFormat('id-ID').format(item.kasAwal)} />
                            <MyList label={item.tipe == 'Kakao' ? 'Timbangan (Kg)' : 'Item'} value={item.timbangan} />
                            <MyList label="Inventory" value={item.inventory} />
                            <MyList label={item.tipe == 'Kakao' ? 'Pemasukan' : 'Penjualan'} value={'Rp' + new Intl.NumberFormat('id-ID').format(item.pemasukan)} />
                            {item.tipe !== 'Kakao' && <MyList label="Nama Barang" value={item.barang} />}

                            {item.tipe !== 'Poin' && <MyList label="Poin" value={item.poinku} />}
                            <MyList label={item.tipe == 'Kakao' ? 'Pengeluaran' : 'Pembelian'} value={'Rp' + new Intl.NumberFormat('id-ID').format(item.pengeluaran)} />
                            <MyList label="Kas/Modal   " value={'Rp' + new Intl.NumberFormat('id-ID').format(item.kasModal)} />
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 }}>
                                <TouchableOpacity
                                    style={{ marginRight: 10 }}
                                    onPress={() => {
                                        navigation.navigate('EditTransaksi', item)
                                    }}>
                                    <Icon name="pencil" type="ionicon" size={20} color="#F5A623" />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        Alert.alert(
                                            'Konfirmasi',
                                            'Hapus data ini?',
                                            [
                                                { text: 'Batal' },
                                                {
                                                    text: 'Hapus',
                                                    style: 'destructive',
                                                    onPress: async () => {
                                                        const baru = [...data];
                                                        baru.splice(index, 1);
                                                        await AsyncStorage.setItem('transaksi', JSON.stringify(baru));
                                                        setData(baru);
                                                    },
                                                },
                                            ],
                                            { cancelable: true }
                                        );
                                    }}>
                                    <Icon name="trash" type="ionicon" size={20} color="#FF3B30" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }} />

            </View>
            <View style={{ paddingHorizontal: 10, backgroundColor: 'white' }}>
                <View style={{
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        flex: 1,
                        ...fonts.caption
                    }}>Total Timbangan</Text>
                    <Text style={{
                        ...fonts.headline5
                    }}>{TOTAL.timbangan} kg</Text>
                </View>
                <View style={{
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                }}>
                    <Text style={{
                        flex: 1,
                        ...fonts.caption
                    }}>Total Pemasukan</Text>
                    <Text style={{
                        ...fonts.headline5
                    }}>{'Rp' + new Intl.NumberFormat('id-ID').format(TOTAL.pemasukan)}</Text>
                </View>
            </View>

            {/* Tombol Download Excel */}
            <View style={{ paddingHorizontal: 10, backgroundColor: 'white' }}>
                <TouchableNativeFeedback onPress={downloadExcel}>
                    <View
                        style={{
                            marginBottom: 5,
                            backgroundColor: 'green',
                            padding: 10,
                            borderRadius: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}>
                        <Icon type="ionicon" name="download" color={colors.white} size={20} />
                        <Text
                            style={{
                                fontFamily: fonts.primary[600],
                                color: colors.white,
                                fontSize: 15,
                                marginLeft: 10,
                            }}>
                            Download Excel
                        </Text>
                    </View>
                </TouchableNativeFeedback>

                <MyButton onPress={deleteAll} warna={colors.danger} title="Hapus Semua Transaksi Petani ini" />
            </View>

            {/* Modal Edit */}
            <Modal visible={editVisible} transparent animationType="slide">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#00000088',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 16,
                            width: '90%',
                        }}>
                        <Text style={{ fontFamily: fonts.primary[600], fontSize: 16, marginBottom: 10 }}>
                            Edit Transaksi
                        </Text>


                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => setEditVisible(false)} style={{ marginRight: 10 }}>
                                <Text style={{ color: '#666' }}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableNativeFeedback onPress={simpanEdit}>
                                <View
                                    style={{
                                        backgroundColor: colors.primary,
                                        paddingHorizontal: 20,
                                        paddingVertical: 8,
                                        borderRadius: 10,
                                    }}>
                                    <Text style={{ color: colors.white, fontFamily: fonts.primary[600] }}>
                                        Simpan
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
