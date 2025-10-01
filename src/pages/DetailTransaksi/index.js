import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { colors, fonts } from '../../utils'
import { MyHeader, MyButton, MyGap, MyPicker } from '../../components'
import { launchImageLibrary, launchCamera } from 'react-native-image-picker'
import { useToast } from 'react-native-toast-notifications'

export default function DetailTransaksi({ navigation, route }) {
  const toast = useToast()
  
  // Ambil data transaksi dari parameter
  const { transaction } = route.params || {}
  
  // State untuk status transaksi
  const [selectedStatus, setSelectedStatus] = useState(transaction?.status || 'pending')
  
  // State untuk foto bukti kerja
  const [buktiKerja, setBuktiKerja] = useState(null)
  
  // Options untuk status dropdown
  const statusOptions = [
    { label: 'Selesai', value: 'completed' },
    { label: 'Menunggu', value: 'pending' },
    { label: 'Proses', value: 'process' },
    { label: 'Batal', value: 'cancelled' }
  ]

  // Fungsi untuk upload foto
  const selectImage = () => {
    Alert.alert(
      'Pilih Foto',
      'Pilih foto bukti kerja dari:',
      [
        { text: 'Kamera', onPress: openCamera },
        { text: 'Galeri', onPress: openGallery },
        { text: 'Batal', style: 'cancel' }
      ]
    )
  }

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
    }

    launchCamera(options, (response) => {
      if (response.assets && response.assets[0]) {
        setBuktiKerja(response.assets[0])
      }
    })
  }

  const openGallery = () => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1000,
      maxHeight: 1000,
    }

    launchImageLibrary(options, (response) => {
      if (response.assets && response.assets[0]) {
        setBuktiKerja(response.assets[0])
      }
    })
  }

  // Fungsi untuk update status transaksi
  const updateStatus = () => {
    // Di sini bisa ditambahkan API call untuk update status
    console.log('Update status:', selectedStatus)
    console.log('Bukti kerja:', buktiKerja)
    
    toast.show('Status transaksi berhasil diupdate!', { type: 'success' })
    
    // Kembali ke halaman sebelumnya
    navigation.goBack()
  }

  // Fungsi untuk format harga
  const formatPrice = (price) => {
    return `Rp ${price.toLocaleString('id-ID')}`
  }

  // Fungsi untuk format tanggal
  const formatDate = (date) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ]
    
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    
    return `${day} ${month} ${year}`
  }

  if (!transaction) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.white }}>
        <MyHeader title="Detail Transaksi" />
        <View style={{ 
          flex: 1, 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 20 
        }}>
          <Text style={{
            fontFamily: fonts.secondary[600],
            fontSize: 16,
            color: colors.secondary,
            textAlign: 'center'
          }}>
            Data transaksi tidak ditemukan
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: colors.white
    }}>
      <MyHeader title="Detail Transaksi" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{
          padding: 20,
        }}>
          
          {/* Card Detail Transaksi */}
          <View style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}>
            
            {/* Nama Customer */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                color: colors.secondary,
                marginBottom: 5
              }}>
                Nama Customer
              </Text>
              <Text style={{
                fontFamily: fonts.secondary[700],
                fontSize: 18,
                color: colors.black
              }}>
                {transaction.customerName}
              </Text>
            </View>

            {/* Tanggal */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                color: colors.secondary,
                marginBottom: 5
              }}>
                Tanggal Transaksi
              </Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 16,
                color: colors.black
              }}>
                {formatDate(transaction.date)}
              </Text>
            </View>

            {/* Produk */}
            <View style={{ marginBottom: 15 }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                color: colors.secondary,
                marginBottom: 5
              }}>
                Produk/Layanan
              </Text>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 16,
                color: colors.black,
                lineHeight: 22
              }}>
                {transaction.description}
              </Text>
            </View>

            {/* Biaya */}
            <View style={{ marginBottom: 20 }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                color: colors.secondary,
                marginBottom: 5
              }}>
                Total Biaya
              </Text>
              <Text style={{
                fontFamily: fonts.secondary[700],
                fontSize: 20,
                color: colors.primary
              }}>
                {formatPrice(transaction.amount)}
              </Text>
            </View>

            {/* Status Saat Ini */}
            <View style={{
              backgroundColor: colors.primary,
              borderRadius: 10,
              padding: 15,
              alignItems: 'center'
            }}>
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 14,
                color: 'white',
                marginBottom: 5
              }}>
                Status Saat Ini
              </Text>
              <Text style={{
                fontFamily: fonts.secondary[700],
                fontSize: 16,
                color: 'white'
              }}>
                {statusOptions.find(option => option.value === transaction.status)?.label || 'Tidak Diketahui'}
              </Text>
            </View>
          </View>

          {/* Update Status Section */}
          <View style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[700],
              fontSize: 18,
              color: colors.black,
              marginBottom: 15
            }}>
              Update Status Transaksi
            </Text>

            <MyPicker
              label="Status Baru"
              data={statusOptions}
              value={selectedStatus}
              onValueChange={(value) => setSelectedStatus(value)}
            />
          </View>

          {/* Upload Bukti Kerja Section */}
          <View style={{
            backgroundColor: 'white',
            borderRadius: 15,
            padding: 20,
            marginBottom: 30,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 6,
            elevation: 3,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[700],
              fontSize: 18,
              color: colors.black,
              marginBottom: 15
            }}>
              Upload Bukti Kerja
            </Text>

            {/* Tombol Upload */}
            <TouchableOpacity
              onPress={selectImage}
              style={{
                borderWidth: 2,
                borderColor: colors.primary,
                borderStyle: 'dashed',
                borderRadius: 10,
                padding: 20,
                alignItems: 'center',
                marginBottom: 15
              }}
            >
              <Text style={{
                fontFamily: fonts.secondary[600],
                fontSize: 16,
                color: colors.primary,
                textAlign: 'center'
              }}>
                {buktiKerja ? 'Ganti Foto' : 'Pilih Foto Bukti Kerja'}
              </Text>
              <Text style={{
                fontFamily: fonts.secondary[400],
                fontSize: 12,
                color: colors.secondary,
                textAlign: 'center',
                marginTop: 5
              }}>
                Tap untuk memilih dari kamera atau galeri
              </Text>
            </TouchableOpacity>

            {/* Preview Foto */}
            {buktiKerja && (
              <View style={{
                alignItems: 'center',
                marginBottom: 15
              }}>
                <Image
                  source={{ uri: buktiKerja.uri }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 10,
                    resizeMode: 'cover'
                  }}
                />
                <Text style={{
                  fontFamily: fonts.secondary[500],
                  fontSize: 12,
                  color: colors.secondary,
                  marginTop: 5
                }}>
                  {buktiKerja.fileName || 'foto_bukti_kerja.jpg'}
                </Text>
              </View>
            )}
          </View>

          {/* Tombol Update */}
          <MyButton
            title="UPDATE STATUS TRANSAKSI"
            onPress={updateStatus}
          />

          <MyGap jarak={20} />
        </View>
      </ScrollView>
    </View>
  )
}