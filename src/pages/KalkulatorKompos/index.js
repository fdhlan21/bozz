import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Alert, FlatList } from 'react-native';
import { MyButton, MyGap, MyHeader } from '../../components';
import { colors, fonts } from '../../utils';
import { Table, Row, Rows } from 'react-native-table-component';
import { showMessage } from 'react-native-flash-message';

export default function KalkulatorKompos({ navigation }) {


  const [data, setData] = useState([
    {
      bahan: 'KOTORAN SAPI',
      komposisi: '',
      berat: '',
      content: 81,
      n: 2.40,
      c: 45.6,
      density: 1458,
    },
    {
      bahan: 'ECENG GONDOK',
      komposisi: '',
      berat: '',
      content: 93,
      n: 1.18,
      c: 29.5,
      density: 405,
    },
    {
      bahan: 'SEKAM PADI',
      komposisi: '',
      berat: '',
      content: 14,
      n: 0.30,
      c: 36.0,
      density: 202,
    },
    {
      bahan: 'ABU SEKAM PADI',
      komposisi: '',
      berat: '',
      content: 15,
      n: 0.18,
      c: 4.0,
      density: 150,
    },
    {
      bahan: 'DEDAK',
      komposisi: '',
      berat: '',
      content: 8.978,
      n: 0.605,
      c: 6.12,
      density: 589.944,
    },
    {
      bahan: 'KOTORAN AYAM',
      komposisi: '',
      berat: '',
      content: 37,
      n: 2.70,
      c: 38.0,
      density: 864,
    }

  ]);
  const [BERAT, setBERAT] = useState([0, 0, 0, 0, 0, 0])

  const [hasil, setHasil] = useState({
    RATIO: 0,
    KELEMBABAN: 0,
  })
  const sendData = () => {
    // cek apakah sudah semua di sisi atau belum
    const cek = data.filter(i => i.komposisi.length == 0).length;
    if (cek > 0) {
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: 'Komposisi setiap bahan harus di isi !'
      })
    } else {
      // jika semua komposisi di isi semua lanjut ke step berikutnya/
      let TEMP_1 = [];
      data.map((i, index) => {
        TEMP_1.push({
          bahan: i.bahan,
          komposisi: i.komposisi,
          berat: i.berat,
          content: i.content,
          contentF: 100 - i.content,
          n: i.n,
          c: i.c,
          cnF: i.c / i.n,
          karung: i.komposisi / 2,
          density: i.density,
        })
      });

      // tahap 2
      let total_nitrogen = 0;
      let total_carbon = 0;
      let total_water = 0;
      let total_weight = 0;
      let total_sederhana = 0;
      let TMP_BERAT = [];
      TEMP_1.map((i, index) => {
        let r1 = parseFloat(i.density * (i.contentF / 100) * (i.n / 100));
        let r2 = parseFloat(i.density * (i.contentF / 100) * (i.c / 100));
        let r3 = parseFloat(i.density * (i.content / 100));
        let weight = parseFloat(i.komposisi * i.density);
        let nitrogen = parseFloat(r1 * i.komposisi);
        let carbon = parseFloat(r2 * i.komposisi);
        let water = parseFloat(r3 * i.komposisi);
        let r4 = weight * 0.453592;
        TMP_BERAT.push(r4);

        total_sederhana += r4;


        total_nitrogen += nitrogen;
        total_carbon += carbon;
        total_water += water;
        total_weight += weight;


      });
      // tahap 3

      console.log({
        total_nitrogen: total_nitrogen,
        total_carbon: total_carbon,
        total_water: total_water,
        total_weight: total_weight,
        total_sederhana: total_sederhana,
      });
      let galon_ke_liter = 4.546092;
      let AIR_liter = 0;
      let moisture = total_water / total_weight;
      let solids = 1 - moisture;
      let lbsolidsinmix = total_weight * solids;
      let water_galon = total_water / 8.3;

      let AIR = AIR_liter / galon_ke_liter;
      let extra_water = AIR * 8.3;

      // HASIL
      let mix_carbon = (total_carbon / lbsolidsinmix) * 100;
      let mix_nitrogen = (total_nitrogen / lbsolidsinmix) * 100;

      let mix_water = total_water + extra_water;
      let mix_weight = total_weight + extra_water;


      let HASIL_RATIO = mix_carbon / mix_nitrogen;
      let HASIL_KELEMBABAN = (mix_water / mix_weight) * 100;

      setHasil({
        RATIO: HASIL_RATIO,
        KELEMBABAN: HASIL_KELEMBABAN
      });

      // simpan berat dalam persen


      let TMP_BERAT_INSERT = [];

      TMP_BERAT.map((i, index) => {
        TMP_BERAT_INSERT.push((i / total_sederhana) * 100)
      });
      setBERAT(TMP_BERAT_INSERT)



    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader title="Kalkulator Kompos" />
      <View style={{
        flex: 1,
        padding: 10
      }}>
        <ScrollView>
          <View style={{
            backgroundColor: colors.primary,
            padding: 10,
            marginVertical: 2,
            flexDirection: 'row'
          }}>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                ...fonts.headline5,
                color: colors.white
              }}>BAHAN</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                ...fonts.headline5,
                color: colors.white
              }}>KOMPOSISI</Text>
            </View>
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{
                ...fonts.headline5,
                color: colors.white
              }}>BERAT %</Text>
            </View>
          </View>
          <FlatList data={data} renderItem={({ item, index }) => {
            return (
              <View style={{
                borderColor: colors.primary,
                borderRadius: 12,
                padding: 10,
                borderWidth: 1,
                marginVertical: 2,
                flexDirection: 'row'
              }}>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text style={{
                    ...fonts.caption
                  }}>{item.bahan}</Text>
                </View>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <TextInput onChangeText={x => {
                    let tmp = [...data];
                    tmp[index].komposisi = x;
                    setData(tmp);
                  }} keyboardType='decimal-pad' style={styles.input} />
                </View>
                <View style={{
                  flex: 1,
                  paddingLeft: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <View style={{
                    height: 45,
                    paddingTop: 8,
                    width: '100%',
                  
                    borderRadius: 10,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    width: '80%',
                  }}>
                    <Text style={styles.input2}>{BERAT[index] > 0 ? parseFloat(BERAT[index]).toFixed(0) : '0'}</Text>
                  </View>

                </View>
              </View>
            )
          }} />
          <MyGap jarak={20} />
          <MyButton title="Hitung" onPress={sendData} />
          <View>
            <View style={{ marginTop: 20, padding: 20 }}>
              <Text style={styles.resultTitle}>Hasil C/N Ratio :</Text>
              <Text style={styles.resultSubtitle}>(Target 20 - 40)</Text>
              {/* Hasil C/N Ratio */}
              <View style={[styles.resultBox, { backgroundColor: hasil.RATIO === 0 ? colors.secondary : (hasil.RATIO < 20 || hasil.RATIO > 40 ? colors.danger : colors.secondary) }]}>
              <Text 
  style={[
    styles.resultText, 
    { 
      color: hasil.RATIO > 40 || hasil.RATIO < 20 ? 'white' : colors.coklat 
    }
  ]}
>
  {hasil.RATIO > 0 ? parseFloat(hasil.RATIO).toFixed(0) : ''}
</Text>

              </View>
            </View>

            <View style={{ marginTop: 5, padding: 20 }}>
              <Text style={styles.resultTitle}>Hasil Kelembapan :</Text>
              <Text style={styles.resultSubtitle}>(Target 40 - 65)</Text>
              {/* Hasil Kelembapan */}
              <View style={[styles.resultBox, { backgroundColor: hasil.KELEMBABAN === 0 ? colors.secondary : (hasil.KELEMBABAN < 40 || hasil.KELEMBABAN > 65 ? colors.danger : colors.secondary) }]}>
              <Text 
  style={[
    styles.resultText, 
    { 
      color: hasil.KELEMBABAN > 40 || hasil.KELEMBABAN < 20 ? colors.coklat : colors.white 
    }
  ]}
>
  {hasil.KELEMBABAN > 0 ? parseFloat(hasil.KELEMBABAN).toFixed(0) : ''}
</Text>

              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
  },
  header: {
    height: 60,
    backgroundColor: colors.tertiary,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.coklat,
    textAlign: 'center',
  },
  row: {
    height: 60,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    color: colors.coklat,
    textAlign: 'center',
    padding: 10,
  },
  input: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    color: colors.coklat,
    height: 45,
    width: '80%',
    left: 10,
    fontFamily: fonts.primary[800]
  },
  input2: {

    textAlign: 'center',
    fontSize: 16,
    color: colors.coklat,

    fontFamily: fonts.primary[800]
  },
  resultTitle: {
    fontFamily: fonts.primary[400],
    fontSize: 25,
    color: colors.coklat,
  },
  resultSubtitle: {
    fontFamily: fonts.primary[400],
    fontSize: 15,
    color: colors.coklat,
  },
  resultBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.secondary,
    width: 211,
    marginTop: 20,
  },
  resultText: {
    textAlign: 'center',
    fontFamily: fonts.primary[800],
    fontSize: 20,
    color: colors.coklat,
  },
});
