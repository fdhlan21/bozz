import { View, Text, ScrollView, TouchableNativeFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyCalendar, MyHeader, MyImageUpload, MyInput, MyPicker } from '../../components'
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { MYAPP } from '../../utils/localStorage';

export default function TambahBuktiPengeluaran({navigation}) {

    const [data, setData] = useState({
        tanggal: new Date(),
        jenis_pengeluaran: '',
        nominal: '',
        nama_karyawan:'',
        tujuan_pengeluaran: '',
        bukti_nota: null,
    });

    const handleDateChange = (date) => {
        console.log("Tanggal yang dipilih:", date);
        setData({ ...data, tanggal: date });
    };

    const handleKirim = () => {
        if (data.jenis_pengeluaran.length === '' || data.nominal.length === '' || data.nama_karyawan.length === '' || data.bukti_nota === null) {
            showMessage({
                type:'danger',
                color:'white',
                backgroundColor:colors.danger,
                position:"top",
                style:{borderBottomLeftRadius:10, borderBottomRightRadius:10,},
                textStyle:{fontFamily:fonts.primary[600], textAlign:"center"},
                message:"Mohon Semua Field Diisi!"
            });
        } else if (data.jenis_pengeluaran.length === '') {
            showMessage({
                type:'danger',
                color:'white',
                backgroundColor:colors.danger,
                position:"top",
                style:{borderBottomLeftRadius:10, borderBottomRightRadius:10,},
                textStyle:{fontFamily:fonts.primary[600], textAlign:"center"},
                message:"Mohon Isi Jenis Pengeluaran!"
            });
        } else if (data.nominal.length === '') {
            showMessage({
                type:'danger',
                color:'white',
                backgroundColor:colors.danger,
                position:"top",
                style:{borderBottomLeftRadius:10, borderBottomRightRadius:10,},
                textStyle:{fontFamily:fonts.primary[600], textAlign:"center"},
                message:"Mohon Isi Nominal!"
            });
        } else  if (data.nama_karyawan.length === '') {
            showMessage({
                type:'danger',
                color:'white',
                backgroundColor:colors.danger,
                position:"top",
                style:{borderBottomLeftRadius:10, borderBottomRightRadius:10,},
                textStyle:{fontFamily:fonts.primary[600], textAlign:"center"},
                message:"Mohon Isi Nama Karyawan!"
            });
        } else if (data.bukti_nota === null) {
            showMessage({
                type:'danger',
                color:'white',
                backgroundColor:colors.danger,
                position:"top",
                style:{borderBottomLeftRadius:10, borderBottomRightRadius:10,},
                textStyle:{fontFamily:fonts.primary[600], textAlign:"center"},
                message:"Mohon Isi Nama Karyawan!"
            });
        } else {
            console.log("Data yang di kirim : ", data);

            axios
            .post('API KEY', data)
            .then((res) => {
                if (res.data.status == 'success') {
                    console.log(res.data);
                    Alert.alert(MYAPP, "Data Berhasil Disimpan!")
                } else if (res.data.status == '404') {
                    Alert.alert(MYAPP, "Terjadi Kesahalan!");
                } else {
                    showMessage({
                        position:'top',
                        type:'danger',
                        message:"Error Server",
                        backgroundColor:colors.danger,
                        color:colors.white,
                        style:{borderBottomLeftRadius:10, borderBottomRightRadius:10}
                    })
                }
                
            })
            .catch(err => {
                console.error(err);
            })
        }
    };

  return (
    <View style={{
        flex:1,
        backgroundColor:colors.white,
    }}>
      <View>
        <MyHeader title='Bukti Pengeluaran Kegiatan'/>
      </View>

      <ScrollView>
        <View style={{
            padding:10,

        }}>

        <MyCalendar
         label='Tanggal :'
        value={data.tanggal || new Date()}
        onDateChange={handleDateChange}
         />

        <MyInput 
        label='Jenis Pengeluaran' 
        placeholder='Isi Jawaban' 
        colorlabel={colors.primary}
        value={data.jenis_pengeluaran}
        onChangeText={(x) => setData({...data,'jenis_pengeluaran' : x})}
        
        />

        <MyInput 
        label='Nominal' 
        placeholder='Isi Jawaban' 
        colorlabel={colors.primary}
        value={data.nominal}
        onChangeText={(x) => setData({...data,'nominal' : x})}
        
        />

        <MyInput 
        label='Nama Karyawan' 
        placeholder='Isi Jawaban' 
        colorlabel={colors.primary}
        value={data.nama_karyawan}
        onChangeText={(x) => setData({...data,'nama_karyawan': x})}
        />

        <MyPicker 
        label="Tujuan Pengelauran" 
        data={[
            {label:'Kebutuhan Umum Kantor', value:'Keperluan Umum Kantor'},
            {label:'Project', value:'Project'},
            {label:'Service', value:'Service'},
            {label:'Entertain', value:'Entertrain'},
        ]}
        value={data.tujuan_pengeluaran}
        onChangeText={(x) => setData({...data,'tujuan_pengeluaran' : x})}
        />

        <MyImageUpload label='Bukti Foto Nota' onImagePicked={(x) => setData({...data,'bukti_nota' : x})}/>




        <View style={{
        padding:10,
        marginTop:20
      }}>
        <TouchableNativeFeedback onPress={handleKirim}>
            <View style={{
                padding:10,
                backgroundColor:colors.primary,
                borderRadius:30

            }}>

            <Text style={{
                fontFamily:fonts.primary[600],
                color:colors.white,
                textAlign:"center",
            }}>Simpan</Text>

            </View>
        </TouchableNativeFeedback>
      </View>
        </View>
      </ScrollView>

    </View>
  )
}