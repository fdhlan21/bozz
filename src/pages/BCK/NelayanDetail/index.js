import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

export default function NelayanDetail({ navigation, route }) {


    const itemHeader = route.params;

    const [item, setItem] = useState({});
    const [show, setShow] = useState(false);

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({});
    useEffect(() => {

        setLoading(true);
        getData('user').then(u => {
            setUser(u);
            axios.post(apiURL + 'get_kesehatan', {
                fid_user: u.id,
                fid_nelayan: route.params.id
            }).then(rs => {
                setLoading(false);
                console.log(rs.data);
                if (rs.data == null) {
                    Alert.alert(MYAPP, 'Nelayan Belum pernah melakukan skrining !', [
                        { text: 'NANTI' },
                        { text: 'SKRINING SEKARANG', onPress: () => navigation.navigate('AAInput', u) }
                    ]);
                    setShow(false)
                } else {
                    setItem(rs.data);
                    setShow(true)
                }

            })
        })

    }, [])


    const MyDataList = ({ label, value }) => {
        return (
            <View style={{
                marginVertical: 2,
                marginHorizontal: 5,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: 15,
                }}>{label}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[400],
                    fontSize: 15,
                }}>{value}</Text>
            </View>
        )
    }



    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
        }}>
            {!loading && <ScrollView style={{
                flex: 1,
            }} showsVerticalScrollIndicator={false}>

                <View style={{
                    elevation: 1, borderRadius: 5, backgroundColor: colors.white, paddingBottom: 10, marginVertical: 5
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        borderBottomWidth: 1,
                        padding: 5,
                        color: colors.black,
                        borderBottomColor: colors.border,
                        marginBottom: 10,
                    }}>Biodata Nelayan</Text>

                    <MyDataList label="Nama" value={itemHeader.nama_nelayan} />
                    <MyDataList label="Usia" value={itemHeader.usia_nelayan} />
                    <MyDataList label="Jenis Kelamin" value={itemHeader.jenis_kelamin_nelayan} />
                    <MyDataList label="Jenis Nelayan" value={itemHeader.jenis_nelayan} />

                </View>

                <View style={{
                    elevation: 1, borderRadius: 5, backgroundColor: colors.white, paddingBottom: 10, marginVertical: 5
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        borderBottomWidth: 1,
                        padding: 5,
                        color: colors.black,
                        borderBottomColor: colors.border,
                        marginBottom: 10,
                    }}>Data Aktifitas Nelayan</Text>

                    <MyDataList label="Frekuensi Menyelam / Minggu" value={itemHeader.frek_menyelam + 'x'} />
                    <MyDataList label="Frekuensi Bekerja / Menyelam" value={itemHeader.frek_bekerja + 'x'} />
                    <MyDataList label="Kedalaman Menyelam" value={itemHeader.kedalaman_menyelam + ' Meter'} />

                </View>

                <View style={{
                    elevation: 1, borderRadius: 5, backgroundColor: colors.white, paddingBottom: 10, marginVertical: 5
                }}>
                    <Text style={{
                        backgroundColor: colors.primary,
                        fontFamily: fonts.secondary[600],
                        fontSize: 15,
                        borderBottomWidth: 1,
                        padding: 5,
                        color: colors.black,
                        borderBottomColor: colors.border,
                        marginBottom: 10,
                    }}>Data Riwayat Penyakit</Text>
                    <MyDataList label="POK" value={itemHeader.riw_pok} />
                    <MyDataList label="TB" value={itemHeader.riw_tb} />
                    <MyDataList label="Thalasemio" value={itemHeader.riw_thalasemio} />
                    <MyDataList label="Kanker" value={itemHeader.riw_kanker} />
                    <MyDataList label="DM" value={itemHeader.riw_dm} />
                    <MyDataList label="Lupus" value={itemHeader.riw_lupus} />
                    <MyDataList label="Ppok" value={itemHeader.riw_ppok} />
                    <MyDataList label="Penyakit Lainnya" value={itemHeader.riw_lain} />


                </View>

                {show && <View style={{
                    marginTop: 10,
                    backgroundColor: colors.white
                }}>
                    <MyDataList label="Tanggal Skrining" value={item.tanggal} />

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
                            }}>{(item.berat_badan / Math.pow((item.tinggi_badan / 100), 2)).toFixed(1)}</Text>
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

                </View>}


                <View style={{
                    padding: 10,
                }}>
                    <MyButton onPress={() => {
                        Alert.alert(MYAPP, 'Apakah kamu akan hapus nelayan ' + itemHeader.nama_nelayan + ' ?', [
                            { text: 'TIDAK' },
                            {
                                text: 'HAPUS', onPress: () => {
                                    axios.post(apiURL + 'delete_nelayan', {
                                        id: itemHeader.id
                                    }).then(res => {
                                        navigation.goBack();
                                    })
                                }
                            }
                        ])
                    }} Icons="trash" iconColor={colors.white} colorText={colors.white} warna={colors.tiga} title="Hapus Nelayan" />
                </View>

            </ScrollView>}

            {loading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator color={colors.primary} size="large" /></View>}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})