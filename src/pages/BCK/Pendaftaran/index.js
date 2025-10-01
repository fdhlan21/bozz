import { View, Text } from 'react-native'
import React from 'react'
import { MyButton, MyButtonSecond, MyGap, MyHeader, MyInput, MyInputSecond, MyPicker } from '../../components'
import { ScrollView } from 'react-native-gesture-handler'
import MyCarouser from '../../components/MyCarouser'

export default function Pendaftaran({navigation}) {
    const MyBack  = () => {
        navigation.goBack();
    }
  return (
    <View style={{flex:1, backgroundColor:"black"}}>
     {/* HEADERS */}
     <MyHeader onPress={MyBack} judul='Pendaftaran' />

     {/* MAIN */}
     <ScrollView style={{padding:10, }}>
    {/* REFERENSI */}
    <MyPicker label="Referensi :" data={[
        { 
            // MASUKAN REFENSINYA DISINI
        }
    ]}/>

    <MyGap jarak={20}/>

    {/* NAMA LENGKAP */}
    <MyInputSecond label="Nama Lengkap" placeholder="Nama Lengkap"/>


    
    <MyGap jarak={20}/>

    {/* NAMA LENGKAP */}
    <MyInputSecond label="Alamat" placeholder="Alamat Lengkap"/>


    <MyGap jarak={20}/>

    {/* NAMA LENGKAP */}
    <MyInputSecond label="Nomor Telephone" placeholder="Nomor Telephone"/>

    
    <MyGap jarak={20}/>

    {/* NAMA LENGKAP */}
    <MyInputSecond label="Nomor Pasport" placeholder="Nomor Pasport"/>

    
    {/* NAMA PHOTO NOMOR PASPORT */}
    {/* MASUKAN PHOTO UPLOAD NOMOR PASPORT */}


    <MyGap jarak={20}/>

{/* NOMOR KTP */}
<MyInputSecond label="Nomor KTP" placeholder="Nomor KTP"/>


{/* MASUKAN PHOTO UPLOAD KTP */}

{/* MASUKAN PHOTO UPLOAD KK */}

{/* MASUKAN PHOTO UPLOAD buku nikah, ijazah, akte lahir :*/}
<MyGap jarak={20}/>
 {/* PILIH PAKET */}
 <MyPicker label="Pilih Paket :" data={[
        { 
            // MASUKAN REFENSINYA DISINI
        }
    ]}/>

<MyGap jarak={20}/>
 {/* ADD ON */}
 <MyPicker label="Add On :" data={[
        { 
            // MASUKAN REFENSINYA DISINI
        }
    ]}/>

<MyGap jarak={20}/>

<MyInputSecond label="Tambahan" placeholder="Tambahan"/>

<MyGap jarak={20}/>

<MyButtonSecond title="Daftar"/>

<MyGap jarak={40}/>

     </ScrollView>
    </View>
  )
}