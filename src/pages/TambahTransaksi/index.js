import {
  View,
  Text,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { MyCalendar, MyHeader, MyInput, MyPicker } from '../../components';
import { colors, fonts } from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';
import { getData, MYAPP, storeData } from '../../utils/localStorage';

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

export default function TambahTransaksi({ navigation, route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tanggal, setTanggal] = useState('');
  const [kasAwal, setKasAwal] = useState('');
  const [timbangan, setTimbangan] = useState('');
  const [inventory, setInventory] = useState('');
  const [pemasukan, setPemasukan] = useState('');
  const [pengeluaran, setPengeluaran] = useState('');
  const [kasModal, setKasModal] = useState('Rp0');
  const [pilihRumus, setPilihRumus] = useState('pemasukan');

  const [member, setMember] = useState(true);
  const [poinku, setPoinku] = useState('');
  const [barang, setBarang] = useState('');
  const [beban, setBeban] = useState('');


  const [petani, setPetani] = useState([]);
  const [okepetani, setOkepetani] = useState({
    id_petani: '',
    nama: '',
  })

  const [transaksi, setTransaksi] = useState([]);

  const getLaporan = async () => {
    getData('transaksi').then(res => {
      console.log(res);
      const tmp = res ? res : [];
      const sorted = [...tmp].reverse();
      setTransaksi(sorted);
    })
  };



  useEffect(() => {
    getLaporan();

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
    const data = {
      tanggal,
      kasAwal,
      timbangan,
      inventory,
      pemasukan,
      pengeluaran,
      kasModal,
      poinku,
      barang,
      beban
    };

    try {

      if (okepetani.id_petani.length == 0) {
        Alert.alert(MYAPP, 'Petani belum dipilih !')
      } else {
        if (member) {


          getData('petani').then(res => {
            let tmp = res ? res : []; // 
            let updated = [...tmp];
            let editIndex = updated.findIndex(item => item.id === okepetani.id_petani);
            console.log(editIndex);

            if (route.params.tipe !== 'Kakao') {
              updated[editIndex] = {
                ...updated[editIndex],
                poin: parseFloat(updated[editIndex].poin) - parseFloat(data.poinku),
                last_update: moment().format('YYYYMMDDHHmmss'),
              };

            } else {
              updated[editIndex] = {
                ...updated[editIndex],
                poin: parseFloat(updated[editIndex].poin) + parseFloat(data.timbangan),
                last_update: moment().format('YYYYMMDDHHmmss'),
              };
            }
            // Simpan kembali ke localStorage
            storeData('petani', updated);


          })


        }


        getData('transaksi').then(res => {
          let tmp = res ? res : [];
          const KIRIM = {
            ...data,
            id: 'TR' + moment().format('YYMMDDHHmmss'),
            tipe: route.params.tipe,
            id_petani: okepetani.id_petani,
            nama: okepetani.nama,

            kasAwal: parseNumber(data.kasAwal),
            pemasukan: parseNumber(data.pemasukan),
            pengeluaran: parseNumber(data.pengeluaran),
            kasModal: parseNumber(data.kasModal),
            poinku: data.poinku,
            barang: data.barang,
            beban: data.beban,
            last_update: moment().format('YYYYMMDDHHmmss'),
          }


          tmp.push(KIRIM); // tambahkan data baru
          storeData('transaksi', tmp);
          setModalVisible(true);
          setTimeout(() => {
            setModalVisible(false);
            navigation.replace('MainApp');
          }, 500);


        })
      }




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

    getData('transaksi').then(trx => {
      if (trx.length > 0) {
        setKasAwal(formatRupiah(trx[trx.length - 1].kasModal))
      } else {
        setKasAwal('')
      }
    })
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <MyHeader title={`Tambah Transaksi ` + route.params.tipe} />

      <ScrollView>
        <View style={{ padding: 20 }}>
          <MyCalendar
            label="Tanggal :"
            placeholder="Pilih Tanggal"
            iconname="calendar"
            value={tanggal}
            onDateChange={(date) => setTanggal(date)}
          />

          <View style={{
            flexDirection: 'row',
            paddingVertical: 20,

          }}>
            <TouchableOpacity onPress={() => setMember(!member)} style={{
              borderWidth: 1,
              paddingHorizontal: 10,
              backgroundColor: member ? colors.primary : colors.white,
              paddingVertical: 4,
              borderRadius: 10,
              marginRight: 10,
            }}>
              <Text style={{
                color: member ? colors.white : colors.primary,
                fontFamily: fonts.secondary[600]
              }}>Member</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMember(!member)} style={{
              borderWidth: 1,
              backgroundColor: !member ? colors.primary : colors.white,
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 10,
              marginRight: 10,
            }}>
              <Text style={{
                color: !member ? colors.white : colors.primary,
                fontFamily: fonts.secondary[600]
              }}>Non-Member</Text>
            </TouchableOpacity>
          </View>


          {route.params.tipe == 'Kakao' &&
            <MyInput
              label="Beban Beban Lain :"
              placeholder="Isi Beban Beban Lain"
              value={beban}

              onChangeText={(val) => setBeban(val)}
            />
          }
          {member &&

            <MyPicker label="Petani / Member" iconname='person' onChangeText={x => {

              let pe = x.split("_");
              setOkepetani({
                id_petani: pe[0],
                nama: pe[1]
              });

            }} data={petani} />
          }

          {!member && <MyInput
            label="Nama Petani:"
            placeholder="Isi petani"

            onChangeText={(val) => {
              setOkepetani({
                id_petani: 'NM' + moment().format('ymdhms'),
                nama: val
              });
            }}
          />
          }



          <MyInput
            label="Kas/Modal Awal :"
            placeholder="Isi Kas/Modal Awal"
            value={kasAwal}
            keyboardType="numeric"
            onChangeText={(val) => setKasAwal(formatRupiah(val))}
          />

          <MyInput
            label={route.params.tipe !== 'Kakao' ? `Item :` : `Timbangan (Kg) :`}
            placeholder={route.params.tipe !== 'Kakao' ? `Isi Item` : `Isi Timbangan (Kg) :`}
            value={timbangan}
            keyboardType="numeric"
            onChangeText={setTimbangan}
          />

          {route.params.tipe !== 'Kakao' && <MyInput
            label={"Nama Barang"}
            placeholder={`Isi Nama barang`}
            value={barang}
            onChangeText={setBarang}
          />}

          {route.params.tipe !== 'Kakao' && <MyInput
            label={"Poin"}
            placeholder={`Isi Poin dipakai`}
            value={poinku}
            keyboardType="numeric"
            onChangeText={setPoinku}
          />}


          <MyInput
            label="Inventory :"
            placeholder="Isi Inventory"
            value={inventory}
            keyboardType="numeric"
            onChangeText={setInventory}
          />

          <MyInput
            label={route.params.tipe !== 'Kakao' ? `Penjualan :` : `Pemasukan :`}
            placeholder={route.params.tipe !== 'Kakao' ? `Isi Penjualan` : `Isi Pemasukan :`}
            value={pemasukan}
            keyboardType="numeric"
            onChangeText={(val) => setPemasukan(formatRupiah(val))}
          />

          <MyInput
            label={route.params.tipe !== 'Kakao' ? `Pembelian : ` : `Pengeluaran :`}
            placeholder={route.params.tipe !== 'Kakao' ? `Isi Pembelian` : `Isi Pengeluaran`}
            value={pengeluaran}
            keyboardType="numeric"
            onChangeText={(val) => setPengeluaran(formatRupiah(val))}
          />

          {(pemasukan && pengeluaran) ? (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontFamily: fonts.primary[600], marginBottom: 6 }}>
                Gunakan perhitungan dari:
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 30,

                  overflow: 'hidden',
                }}>
                <Picker
                  selectedValue={pilihRumus}
                  onValueChange={(itemValue) => setPilihRumus(itemValue)}>
                  <Picker.Item label="Pemasukan" value="pemasukan" />
                  <Picker.Item label="Pengeluaran" value="pengeluaran" />
                </Picker>
              </View>
            </View>
          ) : null}

          <MyInput
            label="Kas/Modal :"
            value={kasModal}
            editable={false}
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
