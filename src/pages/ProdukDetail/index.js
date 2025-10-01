import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import React from 'react';
import { colors, fonts } from '../../utils';
import { MyHeader } from '../../components';
import { ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProdukDetail({ navigation, route }) {
  // Get product data from navigation params
  const { product } = route.params || {
    product: {
      id: 1,
      name: 'Sweater Rajut Premium',
      price: 249000, // Fix: gunakan number, bukan string 'Rp 249.000'
      description: 'Sweater premium dengan bahan rajutan halus yang nyaman dipakai untuk segala musim. Tersedia dalam berbagai ukuran dan warna.',
      image: require('../../assets/product_placeholder.jpg'),
    },
  };

  const handleBuyNow = () => {
    navigation.navigate('CheckOut', { product }); // Kirim product ke Checkout
  };

  const openWhatsApp = () => {
    const message = `Halo, saya tertarik dengan produk ${product.name} (Rp ${product.price.toLocaleString()}). Bisa dibantu?`;
    Linking.openURL(`whatsapp://send?phone=6281234567890&text=${encodeURIComponent(message)}`);
  };

  return (
    <View style={styles.container}>
      <MyHeader title="Produk Detail" onPress={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <FastImage
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>Rp {product.price.toLocaleString()}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi Produk</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.helpButton} onPress={openWhatsApp}>
          <Icon name="chatbubble-ellipses" size={20} color={colors.primary} />
          <Text style={styles.helpButtonText}>Bantuan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles tetap sama
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  imageContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  infoContainer: {
    padding: 20,
    paddingTop: 0,
  },
  productName: {
    fontFamily: fonts.secondary[700],
    fontSize: 22,
    color: colors.dark,
    marginBottom: 5,
  },
  productPrice: {
    fontFamily: fonts.secondary[600],
    fontSize: 20,
    color: colors.primary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    color: colors.dark,
    marginBottom: 10,
  },
  productDescription: {
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    color: colors.dark,
    lineHeight: 20,
  },
  actionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  helpButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    marginRight: 10,
  },
  helpButtonText: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: colors.primary,
    marginLeft: 8,
  },
  buyButton: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  buyButtonText: {
    fontFamily: fonts.secondary[700],
    fontSize: 16,
    color: colors.white,
  },
});
