import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TouchableNativeFeedback,
    Modal,
    TextInput,
    Alert,
    FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { MyGap, MyHeader, MyInput } from '../../components';
import { Icon } from 'react-native-elements';
import QRCode from 'react-native-qrcode-svg';
import { fonts, colors } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getData, storeData } from '../../utils/localStorage';
import moment from 'moment';

export default function ProfitList({ navigation }) {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editNama, setEditNama] = useState('');
    const [editID, setEditID] = useState('');
    const [poin, setPoin] = useState('');

    const getPetani = async () => {
        getData('profit').then(res => {
            console.log(res);
            const tmp = res ? res : [];
            setData(tmp.reverse());
        })
    };

    const simpanEdit = async () => {

        getData('profit').then(res => {
            let tmp = res ? res : []; // 
            let updated = [...tmp];
            updated[editIndex] = {
                ...updated[editIndex],
                nama: editNama,
                id: editID,
                poin: poin,
                last_update: moment().format('YYYYMMDDHHmmss'),
            };

            // Simpan kembali ke localStorage
            storeData('petani', updated);
            setModalVisible(false);
            getPetani();

        })

    };




    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', getPetani);
        return unsubscribe;
    }, [navigation]);


    const hapusData = (index) => {
        Alert.alert(
            'Konfirmasi',
            'Yakin ingin menghapus data profit ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'Hapus',
                    style: 'destructive',
                    onPress: async () => {
                        const dataBaru = [...data];
                        dataBaru.splice(index, 1);
                        try {
                            storeData('profit', dataBaru);
                            getPetani();
                        } catch (e) {
                            Alert.alert('Gagal', 'Tidak bisa menghapus data');
                        }
                    },
                },
            ]
        );

    };


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



    const MyList = ({ label, value }) => {
        return (
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 3,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 12,
                    flex: 1,
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: 12,
                }}>{formatRupiah(value)}</Text>
            </View>
        )

    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <MyHeader title="Riwayat Profit" />


            {data.length === 0 && (
                <Text style={{ textAlign: 'center', fontStyle: 'italic', marginTop: 40 }}>
                    Belum ada data profit
                </Text>
            )}

            <FlatList data={data} renderItem={({ item, index }) => {
                return (
                    <View
                        key={index}
                        style={{
                            marginVertical: 10,
                            marginHorizontal: 10,
                            backgroundColor: '#fafafa',
                            borderRadius: 12,
                            marginBottom: 16,
                            padding: 10,
                            borderWidth: 1,
                            borderColor: colors.primary,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.05,
                            shadowRadius: 2,
                            elevation: 2,
                        }}>
                        <Text
                            style={{
                                fontSize: 13,
                                fontFamily: fonts.primary[400],
                            }}>
                            ID:{' '}
                            <Text style={{ fontWeight: '800', color: colors.primary }}>
                                {item.id}
                            </Text>
                        </Text>


                        <MyList label="Profit Trakhir" value={item.last} />
                        <MyList label="Inventory yang Tersisa" value={item.inv} />
                        <MyList label="Harga Rata-rata Inventory" value={item.avg} />
                        <MyList label="Kas Setelah Penjualan yang Baru" value={item.new} />
                        <MyList label="Kas Penjualan Sebelumnya" value={item.bfr} />
                        <MyList label="Profit" value={item.total} />


                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginTop: 8,
                            }}>

                            <TouchableOpacity onPress={() => hapusData(index)}>
                                <Icon type="ionicon" name="trash" size={20} color="#FF3B30" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }}
            />


            {/* Tombol tambah di bawah */}
            <View
                style={{
                    alignItems: 'flex-end',
                    marginTop: 10,
                    marginBottom: 0,
                    padding: 0,
                    // position: 'absolute',
                    bottom: 10,
                    right: 30
                }}>
                <TouchableNativeFeedback onPress={() => navigation.navigate('Profit')}>
                    <View
                        style={{
                            padding: 10,
                            backgroundColor: colors.primary,
                            borderRadius: 50,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Icon type="ionicon" name="add" color={colors.white} size={25} />
                    </View>
                </TouchableNativeFeedback>
            </View>
            {/* Modal edit */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
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
                            borderRadius: 10,
                            width: '85%',
                        }}>
                        <Text
                            style={{
                                fontFamily: fonts.primary[600],
                                fontSize: 16,
                                marginBottom: 10,
                            }}>
                            Edit Nama Petani
                        </Text>
                        <MyInput
                            label="ID Petani"
                            value={editID}
                            onChangeText={setEditID}
                            placeholder="Masukkan ID"

                        />
                        <MyGap jarak={10} />
                        <MyInput
                            label="Nama Petani"
                            value={editNama}
                            onChangeText={setEditNama}
                            placeholder="Masukkan nama"

                        />
                        <MyGap jarak={10} />
                        <MyInput
                            label="Poin"
                            value={poin}
                            keyboardType='number-pad'
                            onChangeText={setPoin}
                            placeholder="Masukkan poin"

                        />
                        <MyGap jarak={20} />

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(false)}
                                style={{
                                    marginRight: 10,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                }}>
                                <Text style={{ color: '#666' }}>Batal</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={simpanEdit}
                                style={{
                                    backgroundColor: colors.primary,
                                    paddingVertical: 8,
                                    paddingHorizontal: 16,
                                    borderRadius: 6,
                                }}>
                                <Text style={{ color: 'white' }}>Simpan</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
