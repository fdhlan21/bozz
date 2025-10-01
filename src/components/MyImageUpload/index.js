import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Color, colors, fonts } from '../../utils';
import { Icon } from 'react-native-elements';


export default function MyImageUpload({ 
  label = 'Foto Tanda Tangan',
  onImagePicked,
  imageUri

 }) {
  const [selectedImage, setSelectedImage] = useState(imageUri || null);

  const pickImage = () => {
    // Opsi untuk mengatur gambar dari galeri
    const options = {
      mediaType: 'photo',
      quality: 0.7, // Mengatur kualitas gambar agar tidak terlalu besar
      maxWidth: 800, // Batas ukuran lebar gambar
      maxHeight: 800, // Batas ukuran tinggi gambar
      includeBase64: true, // Menambahkan opsi ini agar gambar dikonversi ke base64
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Error', 'Error picking the image.');
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        const base64Image = `data:${response.assets[0].type};base64,${response.assets[0].base64}`;
        setSelectedImage(imageUri);
        
        // Kirim gambar base64 ke parent component
        if (onImagePicked) {
          onImagePicked(base64Image); // Gambar dikirim dalam format base64
        }
      }
    });
  };

  return (
    <View style={{ marginBottom: 20 }}>
      {label && (
        <Text style={{
          fontFamily: fonts.primary[600],
          color: colors.primary,
          marginBottom: 5,
          fontSize: 15,
          marginTop:10
        }}>
          {label}
        </Text>
      )}
      
      <TouchableOpacity onPress={pickImage} style={[styles.container, selectedImage && styles.containerWithImage]}>
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.imageSelected}
            />
          ) : (
            <View style={{
              alignItems: "center",
              width: '100%',
            }}>
              <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 0,
                backgroundColor: '#D9D9D9',
                width: "50%",
                height: 40,
                borderRadius: 5,
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: Color.blueGray[400]
              }}>
                <Icon type="ionicon" name="image-outline" size={25} color={colors.white} />
                <Text style={{
                  fontFamily: fonts.primary[500],
                  fontSize: 15,
                  fontStyle: "italic",
                  left: 5,
                  color: colors.white,
                }}>Unggah Foto</Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: colors.border,
    backgroundColor: '#F6F6F6',
    justifyContent: 'center',
  },
  containerWithImage: {
    height: 120, // Ubah tinggi container menjadi 120 jika gambar sudah dipilih
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
  },
  imageSelected: {
    width: 100,
    height: 100, // Gambar menjadi 100x100 setelah dipilih
    borderRadius: 10,
    alignSelf:"center"
  },
});