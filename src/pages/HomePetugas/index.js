import {StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, fonts} from '../../utils';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');

// Fungsi untuk format tanggal manual
const formatDate = (date) => {
  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];
  
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  
  return `${day} ${month} ${year}`;
};

export default function HomePetugas({navigation}) {
  const [user] = useState({});
  const [transactions] = useState([
    {
      id: 1,
      customerName: 'Budi Santoso',
      date: new Date(2023, 6, 15),
      description: 'Nidi & Slo Industri Daya 450 VA - 10600 VA',
      status: 'completed',
      amount: 75000
    },
    {
      id: 2,
      customerName: 'Ani Wijaya',
      date: new Date(2023, 6, 14),
      description: 'Nidi Slo Home Charging Daya 450 VA - 10600 VA',
      status: 'pending',
      amount: 75000
    },
    {
      id: 3,
      customerName: 'Rudi Hermawan',
      date: new Date(2023, 6, 13),
      description: 'Nidi & Slo Industri Daya 450 VA - 10600 VA',
      status: 'failed',
      amount: 75000
    },
    {
      id: 4,
      customerName: 'Siti Nurhaliza',
      date: new Date(2023, 6, 12),
      description: 'Nidi Slo Home Charging Daya 450 VA - 10600 VA',
      status: 'completed',
      amount: 75000
    },
    {
      id: 5,
      customerName: 'Agus Suparman',
      date: new Date(2023, 6, 11),
      description: 'Nidi & Slo Industri Daya 450 VA - 10600 VA',
      status: 'completed',
      amount: 75000
    },
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#4CAF50';
      case 'pending': return '#FFC107';
      case 'failed': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Selesai';
      case 'pending': return 'Menunggu';
      case 'failed': return 'Gagal';
      default: return 'Tidak Diketahui';
    }
  };

  const navigateToDetail = (transaction) => {
    navigation.navigate('DetailTransaksi', { transaction });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8AB05', '#006DAB']}
        style={styles.headerGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greetingText}>Selamat datang,</Text>
            <Text style={styles.greetingText}>{user.nama_lengkap || 'Petugas'}</Text>
          </View>
          <FastImage
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </LinearGradient>

      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Transaction Cards */}
        <View style={styles.transactionsContainer}>
          {transactions.map((transaction, index) => (
            <TouchableOpacity 
              key={transaction.id} 
              style={[
                styles.transactionCard,
                index === 0 && {marginTop: -50} // First card overlaps the header
              ]}
              onPress={() => navigateToDetail(transaction)}>
              
              <View style={styles.transactionHeader}>
                <Text style={styles.customerName}>{transaction.customerName}</Text>
                <Text style={styles.transactionDate}>
                  {formatDate(transaction.date)}
                </Text>
              </View>
              
              <Text style={styles.transactionDescription} numberOfLines={2}>
                {transaction.description}
              </Text>
              
              <View style={styles.transactionFooter}>
                <View style={[
                  styles.statusBadge,
                  {backgroundColor: getStatusColor(transaction.status)}
                ]}>
                  <Text style={styles.statusText}>{getStatusText(transaction.status)}</Text>
                </View>
                
                <Text style={styles.amountText}>Rp {transaction.amount.toLocaleString('id-ID')}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerGradient: {
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    top: 10
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  greetingText: {
    fontFamily: fonts.secondary[600],
    fontSize: 20,
    color: 'white',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  transactionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 80
  },
  transactionCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  customerName: {
    fontFamily: fonts.secondary[600],
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  transactionDate: {
    fontFamily: fonts.secondary[400],
    fontSize: 12,
    color: '#777',
    marginLeft: 10,
  },
  transactionDescription: {
    fontFamily: fonts.secondary[400],
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
    lineHeight: 20,
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    minWidth: 80,
  },
  statusText: {
    fontFamily: fonts.secondary[500],
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  amountText: {
    fontFamily: fonts.secondary[600],
    fontSize: 14,
    color: colors.primary,
  },
});