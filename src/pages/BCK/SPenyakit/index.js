import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, fonts } from '../../utils'

export default function SPenyakit() {
    return (
        <View style={{
            flex: 1,
            padding: 10,
        }}>

            <ScrollView>

                {/* Scabies */}
                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        color: colors.white
                    }}>Scabies</Text>
                    <Text style={{
                        backgroundColor: colors.border,
                        padding: 10,
                        textAlign: 'center',
                        color: colors.black
                    }}>Scabies adalah kudis yang muncul akibat serangan tungau atau kutu berukuran sangat kecil. Ini bisa membuat kucing langsung gatal-gatal ketika pertama kali terkena. Sedangkan penyakit jamur pada kucing atau biasa dikenal ring worm maupun dermatophytosis disebabkan oleh kelompok jamur dermatophytes.</Text>
                </View>


                {/* Cacingan */}
                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        color: colors.white
                    }}>Cacingan</Text>
                    <Text style={{
                        backgroundColor: colors.border,
                        padding: 10,
                        textAlign: 'center',
                        color: colors.black
                    }}>Kucing bisa cacingan melalui kontak dengan telur cacing di kotoran, makanan, atau hewan buruannya. Cacing yang biasa menyerang kucing adalah cacing pita, cacing gelang, dan cacing tambang.</Text>
                </View>

                {/* Colibacillosis */}
                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        color: colors.white
                    }}>Colibacillosis</Text>
                    <Text style={{
                        backgroundColor: colors.border,
                        padding: 10,
                        textAlign: 'center',
                        color: colors.black
                    }}>Escherichia coli atau E. coli adalah bakteri yang akan menyerang saluran pencernaan. Bakteri E. coli memiliki ratusan strain yang berbeda, dan mayoritas tidak membahayakan. Bakteri E. coli biasanya menyerang kucing yang memiliki kekebalan tubuh yang rendah, seperti anak kucing dan kucing tua.</Text>
                </View>

                {/* Panleukopenia */}
                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        color: colors.white
                    }}>Panleukopenia</Text>
                    <Text style={{
                        backgroundColor: colors.border,
                        padding: 10,
                        textAlign: 'center',
                        color: colors.black
                    }}>Panleukopenia adalah penyakit menular yang disebabkan oleh parvovirus. Virus ini sangat rentan menyerang anak kucing dan tidak menginfeksi manusia. Panleukopenia menginfeksi kucing dengan cara membunuh sel-sel yang aktif membelah di sumsum tulang, usus dan janin yang sedang berkembang. Meski lebih rentan menyerang anak kucing, kucing dari segala usia juga dapat terinfeksi panleukopenia, terutama pada kucing yang tidak mendapat vaksinasi.</Text>
                </View>


                {/* Panleukopenia */}
                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        color: colors.white
                    }}>Feline Lower Urinary Tract Disease</Text>
                    <Text style={{
                        backgroundColor: colors.border,
                        padding: 10,
                        textAlign: 'center',
                        color: colors.black
                    }}>Feline Lower Urinary Tract Disease(FLUTD) atau lebih sering disebut dengan Feline Urinary Syndrome (FUS) adalah penyakit yang menyerang saluran perkencingan bagian bawah pada kucing.</Text>
                </View>

                {/* Chlamydia */}
                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        padding: 10,
                        color: colors.white
                    }}>Chlamydia </Text>
                    <Text style={{
                        backgroundColor: colors.border,
                        padding: 10,
                        textAlign: 'center',
                        color: colors.black
                    }}>Chlamydiosis merupakan penyakit pada kucing yang disebabkan oleh bakteri Chlamydia psitacii (Chlamydophila felis). Bakteri ini menyerang saluran pernafasan bagian atas pada kucing sehingga menyebabkan flu.</Text>
                </View>



            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({})