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
import { MyGap, MyHeader, MyInput } from '../../components';
import { fonts, colors } from '../../utils';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import 'moment/locale/id';
import NetInfo from '@react-native-community/netinfo';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { getData } from '../../utils/localStorage';
import 'intl';
import ZavalabsScanner from 'react-native-zavalabs-scanner'
import 'intl/locale-data/jsonp/id';

export default function Loyalty({ navigation, route }) {
  const key = route.params.key ? route.params.key : route.params.key;
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

  const [TMP, setTMP] = useState([]);
  const getLaporan = async () => {

    const tmp = await getData('transaksi');
    const petani = await getData('petani');

    console.log(tmp.filter(i => i.id_petani.substr(0, 2) !== "NM"))

    const grouped = tmp.filter(i => i.id_petani.substr(0, 2) !== 'NM').reduce((acc, curr) => {
      const nama = curr.nama;

      if (!acc[nama]) {
        acc[nama] = {
          nama,
          totalTimbangan: 0,
          totalPoin: 0,
          totalKasModal: 0
        };
      }
      acc[nama].id_petani = curr.id_petani;
      acc[nama].totalTimbangan += parseFloat(curr.timbangan);
      acc[nama].totalPoin = parseFloat(petani.filter(i => i.id == curr.id_petani)[0].poin);
      acc[nama].totalKasModal += parseFloat(curr.kasModal);

      return acc;
    }, {});

    // Ubah object jadi array
    const res_data = Object.values(grouped).sort((a, b) => b.totalTimbangan - a.totalTimbangan);
    console.log(res_data);
    if (key.length > 0) {
      const keyword = key.toLowerCase();

      const filtered = res_data.filter(i =>
        i.nama.toLowerCase().includes(keyword) ||
        i.id_petani.toString().toLowerCase().includes(keyword)
      );
      setData(filtered);
      setTMP(filtered);
    } else {
      setData(res_data);
      setTMP(res_data);
    }

  };

  const simpanEdit = async () => {
    const baru = [...data];
    baru[editIndex] = form;
    await AsyncStorage.setItem('DATA_TRANSAKSI', JSON.stringify(baru));
    setData(baru);
    setEditVisible(false);
  };

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

  const openScanner = () => {
    ZavalabsScanner.showBarcodeReader(result => {
      console.log('barcode : ', result);
      if (result !== null) {
        navigation.navigate('PetaniDetail', {
          id_petani: result
        })
      }

    });
  };

  useEffect(() => {
    const focus = navigation.addListener('focus', getLaporan);
    return focus;
  }, [navigation]);

  // Filter hasil berdasarkan nama petani
  // const filteredData = data.filter(item =>
  //   item.nama?.toLowerCase().includes(search.toLowerCase())
  // );

  const MyList = ({ label, value }) => {
    return (

      <View style={{ flexDirection: 'row', marginBottom: 6 }}>
        <Text style={{ flex: 0.6, fontSize: 12, fontFamily: fonts.primary[400], color: colors.black }}>
          {label}
        </Text>
        <Text style={{ flex: 1, fontSize: 12, fontFamily: fonts.primary[600], color: colors.primary }}>
          {value}
        </Text>
      </View>


    )
  }

  const filterPetani = (x) => {
    console.log(x);

    const keyword = x.toLowerCase();

    const filtered = data.filter(i =>
      i.nama.toLowerCase().includes(keyword) ||
      i.id_petani.toString().toLowerCase().includes(keyword)
    );

    if (x.length === 0) {
      setData(TMP); // Kembalikan ke data asli
    } else if (filtered.length > 0) {
      setData(filtered);
    } else {
      setData([]); // Kosongkan jika tidak ada hasil
    }

    console.log(filtered);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title={key.length > 0 ? 'Petani / Member' : 'Ranking Loyalty'} />

      <View style={{ padding: 20, flex: 1 }}>
        {key.length == 0 && <MyInput onChangeText={x => filterPetani(x)} nolabel placeholder="Pencarian . . ." />}
        <MyGap jarak={10} />
        <FlatList data={data} renderItem={({ item, index }) => {


          return (
            <View
              key={index}
              style={{
                borderRadius: 16,
                backgroundColor: '#FAFAFA',
                borderColor: '#ddd',
                borderWidth: 1,
                padding: 10,
                marginBottom: 16,
              }}>

              <MyList label="Petani" value={item.id_petani + ' - ' + item.nama} />
              <MyList label="Timbangan (Kg)" value={item.totalTimbangan} />
              <MyList label="Poin" value={item.totalPoin} />
              {key.length == 0 &&
                <View style={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  borderRadius: 20,
                  width: 40,
                  height: 40,
                  backgroundColor: colors.primary,
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                  <Text style={{
                    fontFamily: fonts.secondary[800],
                    fontSize: 20,
                    textAlign: 'center',
                    color: colors.white
                  }}>{index + 1}</Text>
                </View>
              }
            </View>
          )
        }} />

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
