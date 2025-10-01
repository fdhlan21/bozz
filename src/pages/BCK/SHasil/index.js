import { Alert, StyleSheet, Text, View, Image, ActivityIndicator, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyHeader, MyInput, MyPicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'
import { maskJs, maskCurrency } from 'mask-js';
import moment from 'moment';

export default function AAInput({ navigation, route }) {

    const [loading, setLoading] = useState(false);
    const [item, setItem] = useState(route.params);
    const [comp, setComp] = useState({});
    console.log('Hasil', route.params)

    const IMT = (item.berat_badan / Math.pow((item.tinggi_badan / 100), 2)).toFixed(1);

    const MyDataList = ({ label, value }) => {
        return (

            <View style={{
                marginVertical: 5, borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                paddingVertical: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 14
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[300],
                    fontSize: 14
                }}>{value}</Text>
            </View>
        )
    }


    // setLoading(false);

    const konsultasi = () => {
        navigation.navigate('AABidan')
    }


    useEffect(() => {
        axios.post(apiURL + 'company').then(c => {
            setComp(c.data);
            console.log(c.data)
        })
    }, [])


    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 20,
        }}>
            <MyHeader menu='Hasil Skrining' />
            <MyGap jarak={20} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <MyDataList label="Nama Nelayan" value={item.nama_nelayan} />
                <MyDataList label="Usia" value={item.usia_nelayan + ' Tahun'} />
                <MyDataList label="Jenis Kelamin" value={item.jenis_kelamin_nelayan} />

                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyDataList label="Tinggi Badan" value={item.tinggi_badan + ' cm'} />
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <MyDataList label="Berat Badan" value={item.berat_badan + ' kg'} />
                    </View>
                </View>


                <Text style={{
                    padding: 10,
                    backgroundColor: colors.primary,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>IMT</Text>
                <View style={{
                    borderWidth: 1,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                }}>
                    {/* grafik IMT */}

                    <View style={{
                        marginTop: 10,
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                height: 50,
                                backgroundColor: colors.satu,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    color: colors.white,
                                    fontSize: 15
                                }}>BB Kurang</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                height: 50,
                                backgroundColor: colors.dua,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    color: colors.white,
                                    fontSize: 15
                                }}>Normal</Text>
                            </View>
                            <View style={{
                                flex: 1,
                                height: 50,
                                backgroundColor: colors.tiga,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    color: colors.white,
                                    fontSize: 15
                                }}>BB Berlebih</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 0.8,
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    color: colors.black,
                                    fontSize: 15
                                }}>16.0</Text>
                            </View>
                            <View style={{
                                flex: 1,

                                justifyContent: 'space-between',
                                flexDirection: 'row',


                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    color: colors.black,
                                    fontSize: 15
                                }}>18.5</Text>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    color: colors.black,
                                    fontSize: 15
                                }}>25.0</Text>
                            </View>
                            <View style={{
                                flex: 0.8,
                                justifyContent: 'center',
                                alignItems: 'flex-end'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[400],
                                    color: colors.black,
                                    fontSize: 15
                                }}>40.0</Text>
                            </View>
                        </View>
                    </View>

                    {/* hasil IMT */}

                    <View style={{
                        marginVertical: 10,
                        borderRadius: 10,
                        padding: 5,
                        backgroundColor: item.hmasa == 'BB Kurang' ? colors.satu : item.hmasa == 'BB Berlebih' ? colors.tiga : colors.dua
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.white,
                            textAlign: 'center'
                        }}>IMT</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 30,
                            color: colors.white,
                            textAlign: 'center'
                        }}>{IMT}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.white,
                            textAlign: 'center'
                        }}>{item.hmasa}</Text>

                    </View>

                    <View style={{
                        marginVertical: 10,
                        borderRadius: 10,
                        padding: 5,
                    }}>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.black,
                            textAlign: 'center'
                        }}>Lingkar Perut</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 30,
                            color: colors.black,
                            textAlign: 'center'
                        }}>{item.lingkar_perut}</Text>
                        <Text style={{
                            fontFamily: fonts.secondary[600],
                            fontSize: 20,
                            color: colors.black,
                            textAlign: 'center'
                        }}>{item.hlingkar_perut}</Text>

                    </View>


                </View>

                <Text style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: colors.primary,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>TD</Text>
                <View style={{
                    borderWidth: 1,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyDataList label="Sistole" value={item.sistole + ' mmHg'} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: item.hsistole == 'Normal' ? colors.dua : item.hsistole == 'Hipotensi' ? colors.satu : colors.tiga
                            }}>{item.hsistole}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyDataList label="Diastole" value={item.diastole + ' mmHg'} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: item.hdiastole == 'Normal' ? colors.dua : item.hdiastole == 'Hipotensi' ? colors.satu : colors.tiga
                            }}>{item.hdiastole}</Text>
                        </View>
                    </View>

                </View>

                <Text style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: colors.primary,
                    textAlign: 'center',
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>Lab Pemkab</Text>
                <View style={{
                    borderWidth: 1,
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors.primary,
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyDataList label="Hemoglobin" value={item.hemoglobin + ' mmHg'} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: item.hhemoglobin == 'Normal' ? colors.dua : item.hhemoglobin == 'Anemia' ? colors.satu : colors.tiga
                            }}>{item.hhemoglobin}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                        }}>
                            <MyDataList label="Gula Darah" value={item.gula_darah + ' mmHg'} />
                            <Text style={{
                                fontFamily: fonts.secondary[600],
                                color: item.hgula_darah == 'Normal' ? colors.dua : item.hgula_darah == 'Hipoglikemi' ? colors.satu : colors.tiga
                            }}>{item.hgula_darah}</Text>
                        </View>
                    </View>

                </View>


            </ScrollView>

            <MyGap jarak={10} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})