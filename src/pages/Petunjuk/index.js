import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'

export default function Petunjuk() {
  const warna = {
    primary: '#324fc9',
    secondary: '#0289df',
    tertiary: '#142b30',

  }
  return (
    <SafeAreaView style={{
      flex: 1, padding: 10,
    }}>

      <Text style={{
        ...styles.judul,
        color: warna.tertiary
      }}>Bismillah</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  judul: {
    fontFamily: fonts.secondary[800],
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,

  },
  strong: {
    fontFamily: fonts.secondary[800],
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 20,

  }
})