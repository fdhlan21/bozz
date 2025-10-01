import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  StatusGizi,
  Imt,
  Take,
  StatusGiziHasil,
  DataIbuHamil,
  DataPemeriksaanIbuHami,
  SubDataPemeriksaanIbuHami,
  IbuHamil,
  TrisemesterI,
  TrisemesterII1,
  TrisemesterIII1,
  TrisemesterIII2,
  TrisemesterIII3,
  IbuBersalin,
  IbuNifas,
  IbuNifasKF,
  VideoMateri,
  TanyaJawab,
  Artikel,
  Kuesioner,
  TrisemesterII2,
  InfoLayananKesehatan,
  InfoEdukasiPenyakit,
  InfoEdukasiPenyakitKanker,
  InfoEdukasiPenyakitStroke,
  InfoEdukasiPenyakitJantung,
  InfoEdukasiPenyakitGinjal,
  InfoEdukasiPenyakitDiabetes,
  InteraksiBersamaTim,
  TentangAplikasi,
  InfoEdukasiPenyakitStunting,
  PrintKainRoll,
  PrintJersey,
  CetakSample,
  CetakSampleKainRoll,
  CetakSampleHijab,
  CetakSampleJersey,
  PrintHijab,
  Riwayat,
  MulaiPage,
  Indentitas,
  HasilTekananDarah,
  SubRiwayatPemeriksaanLaboratorium,
  Gula,
  ProfilLipid,
  LainLain,
  RiwayatPemeriksaanRadiologis,
  RiwayatObat,
  EKG,
  PenilaianNyeri,
  Rekomendasi,
  KalkulatorKompos,
  Petunjuk,
  CheckHargaStock,
  BuatPenawaran,
  TambahPenawaran,
  DonwnloadBrosur,
  BuktiPengeluaran,
  TambahBuktiPengeluaran,
  HasilBuatPenawaran,
  TambahData,
  DataPetani,
  TambahPetani,
  TambahTransaksi,
  DataLaporan,
  BackupRestore,
  Royalti,
  EditTransaksi,
  PetaniDetail,
  Profit,
  ProfitList,
  Pelanggan,
  PelangganAdd,
  PelangganEdit,
  Transaksi,
  TransaksiAdd,
  TransaksiEdit,
  PelangganDetail,
  Supplier,
  SupplierAdd,
  SupplierEdit,
  SupplierDetail,
  Barang,
  BarangAdd,
  BarangDetail,
  BarangEdit,
  Jual,
  JualAdd,
  JualEdit,
  JualDetail,
  BarangCart,
  Checkout,
  ProdukDetail,
  ChoosePage,
  HomePetugas,
} from '../pages';
import {colors} from '../utils';
import {Icon} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomNavigator} from '../components';
import DetailTransaksi from '../pages/DetailTransaksi';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator
      initialRouteName="Splash"
      tabBar={props => <BottomNavigator {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Account} />
    </Tab.Navigator>
  );
};

export default function Router() {
  return (
    <Stack.Navigator initialRouteName="">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      
      <Stack.Screen
        name="ChoosePage"
        component={ChoosePage}
        options={{
          headerShown: false,
        }}
      />

       <Stack.Screen
        name="HomePetugas"
        component={HomePetugas}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Pelanggan"
        component={Pelanggan}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DetailTransaksi"
        component={DetailTransaksi}
        options={{
          headerShown: false,
        }}
      />


      <Stack.Screen
        name="CheckOut"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />

      
      <Stack.Screen
        name="ProdukDetail"
        component={ProdukDetail}
        options={{
          headerShown: false,
        }}
      />



      <Stack.Screen
        name="PelangganAdd"
        component={PelangganAdd}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PelangganEdit"
        component={PelangganEdit}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PelangganDetail"
        component={PelangganDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Supplier"
        component={Supplier}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SupplierAdd"
        component={SupplierAdd}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SupplierEdit"
        component={SupplierEdit}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SupplierDetail"
        component={SupplierDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Barang"
        component={Barang}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BarangAdd"
        component={BarangAdd}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BarangDetail"
        component={BarangDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BarangEdit"
        component={BarangEdit}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Transaksi"
        component={Transaksi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Jual"
        component={Jual}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JualAdd"
        component={JualAdd}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JualEdit"
        component={JualEdit}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="JualDetail"
        component={JualDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BarangCart"
        component={BarangCart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransaksiAdd"
        component={TransaksiAdd}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TransaksiEdit"
        component={TransaksiEdit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profit"
        component={Profit}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EditTransaksi"
        component={EditTransaksi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="PetaniDetail"
        component={PetaniDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BuatPenawaran"
        component={BuatPenawaran}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DataPetani"
        component={DataPetani}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TambahTransaksi"
        component={TambahTransaksi}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TambahData"
        component={TambahData}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="TambahPetani"
        component={TambahPetani}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DataLaporan"
        component={DataLaporan}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BackupRestore"
        component={BackupRestore}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Royalti"
        component={Royalti}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HasilBuatPenawaran"
        component={HasilBuatPenawaran}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CheckHargaStock"
        component={CheckHargaStock}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="KalkulatorKompos"
        component={KalkulatorKompos}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Petunjuk"
        component={Petunjuk}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: false,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.white,
          },
          headerTintColor: '#000',
        }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProfitList"
        component={ProfitList}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
