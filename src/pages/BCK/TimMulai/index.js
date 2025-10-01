import { Alert, StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';
import ViewShot from "react-native-view-shot";
import Orientation from 'react-native-orientation-locker';
import Share from 'react-native-share';

export default function TimMulai({ navigation, route }) {
    const [data, setData] = useState([]);


    navigation.setOptions({
        title: 'PENILAIAN SET ' + route.params.set
    })

    const isFocused = useIsFocused();
    useEffect(() => {
        console.log(Orientation.getInitialOrientation())
        if (isFocused) {
            __getTransaction(route.params.id);
            Orientation.lockToLandscapeLeft();

        }

    }, [isFocused]);


    const __getTransaction = (x) => {
        axios.post(apiURL + 'tim_data_pemain_mulai.php', {
            fid_tim: x
        }).then(rz => {
            setData(rz.data);
            console.log(rz.data)
        })
    }



    const [pilih, setPilih] = useState({
        0: {
            'Service': {
                A: false,
                R: false,
                E: false
            },
            'Receive': {
                A: false,
                R: false,
                E: false
            },
            'Set': {
                A: false,
                R: false,
                E: false
            },
            'Spike': {
                A: false,
                R: false,
                E: false
            },
            'Block': {
                A: false,
                R: false,
                E: false
            },
            'Dig': {
                A: false,
                R: false,
                E: false
            }
        },
        1: {
            'Service': {
                A: false,
                R: false,
                E: false
            },
            'Receive': {
                A: false,
                R: false,
                E: false
            },
            'Set': {
                A: false,
                R: false,
                E: false
            },
            'Spike': {
                A: false,
                R: false,
                E: false
            },
            'Block': {
                A: false,
                R: false,
                E: false
            },
            'Dig': {
                A: false,
                R: false,
                E: false
            }
        },
        2: {
            'Service': {
                A: false,
                R: false,
                E: false
            },
            'Receive': {
                A: false,
                R: false,
                E: false
            },
            'Set': {
                A: false,
                R: false,
                E: false
            },
            'Spike': {
                A: false,
                R: false,
                E: false
            },
            'Block': {
                A: false,
                R: false,
                E: false
            },
            'Dig': {
                A: false,
                R: false,
                E: false
            }
        },
        3: {
            'Service': {
                A: false,
                R: false,
                E: false
            },
            'Receive': {
                A: false,
                R: false,
                E: false
            },
            'Set': {
                A: false,
                R: false,
                E: false
            },
            'Spike': {
                A: false,
                R: false,
                E: false
            },
            'Block': {
                A: false,
                R: false,
                E: false
            },
            'Dig': {
                A: false,
                R: false,
                E: false
            }
        },
        4: {
            'Service': {
                A: false,
                R: false,
                E: false
            },
            'Receive': {
                A: false,
                R: false,
                E: false
            },
            'Set': {
                A: false,
                R: false,
                E: false
            },
            'Spike': {
                A: false,
                R: false,
                E: false
            },
            'Block': {
                A: false,
                R: false,
                E: false
            },
            'Dig': {
                A: false,
                R: false,
                E: false
            }
        },
        5: {
            'Service': {
                A: false,
                R: false,
                E: false
            },
            'Receive': {
                A: false,
                R: false,
                E: false
            },
            'Set': {
                A: false,
                R: false,
                E: false
            },
            'Spike': {
                A: false,
                R: false,
                E: false
            },
            'Block': {
                A: false,
                R: false,
                E: false
            },
            'Dig': {
                A: false,
                R: false,
                E: false
            }
        },
    });



    const sendServer = (x, y, z, i) => {

        console.log('index', i)

        {
            const dd = {
                fid_tim: route.params.id,
                set: route.params.set,
                fid_pemain: z,
                jenis: x,
                tipe: y,
                nilai: 1,
            }

            showMessage({
                backgroundColor: y == 'A' ? colors.success : y == 'R' ? colors.secondary : colors.danger,
                color: colors.black,
                message: x + ' Nilai  ' + y
            })

            // let tmp = pilih;
            // let jenis = x;
            // console.log('terpilih', tmp[i][x][y])

            // tmp[i][x][y] = true;

            // setTimeout(() => {
            //     console.warn(tmp);
            // }, 200)

            // // console.warn(pilih);
            // setPilih(tmp);


            axios.post(apiURL + 'add.php', dd).then(res => {
                console.log(res.data);
            })
        }
    }





    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.primary,
            padding: 10,


        }}>

            <View style={{
                flex: 1

            }}>
                <View style={{
                    padding: 2,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    flexDirection: 'row',
                    backgroundColor: colors.white
                    // borderWidth: 2,
                }}>

                    <View style={{
                        flex: 1.5,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            color: colors.primary,
                        }}>Nama Pemain</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            color: colors.primary,
                        }}>Service</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            color: colors.primary,
                        }}>Receive</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            color: colors.primary,
                        }}>Set</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            color: colors.primary,
                        }}>Spike</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            color: colors.primary,
                        }}>Block</Text>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: fonts.secondary[600],
                            fontSize: windowWidth / 35,
                            color: colors.primary,
                        }}>Dig</Text>
                    </View>
                </View>
                {data.map((item, index) => {
                    return (
                        <View style={{
                            padding: 1,
                            flexDirection: 'row',
                            backgroundColor: item.posisi % 2 == 1 ? colors.white : colors.zavalabs
                            // borderWidth: 2,
                        }}>
                            <View style={{
                                flex: 1.5,
                                flexDirection: 'row'
                            }}>
                                <Text style={{
                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 35,
                                    color: colors.primary,
                                }}>{item.posisi}. </Text>

                                <Text style={{
                                    // flex: 1,

                                    fontFamily: fonts.secondary[600],
                                    fontSize: windowWidth / 35,
                                    color: colors.primary,
                                }}>{item.nama_pemain}
                                </Text>

                            </View>

                            {/* serveice */}
                            <View style={{
                                borderLeftWidth: 1,
                                borderLeftColor: colors.black,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <TouchableOpacity onPress={() => sendServer('Service', 'A', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,

                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Service', 'R', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>R</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Service', 'E', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>E</Text>
                                </TouchableOpacity>
                            </View>

                            {/* receive */}
                            <View style={{
                                borderLeftWidth: 1,
                                borderLeftColor: colors.black,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <TouchableOpacity onPress={() => sendServer('Receive', 'A', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Receive', 'R', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>R</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Receive', 'E', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>E</Text>
                                </TouchableOpacity>
                            </View>
                            {/* set */}
                            <View style={{
                                flex: 1,
                                borderLeftWidth: 1,
                                borderLeftColor: colors.black,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <TouchableOpacity onPress={() => sendServer('Set', 'A', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Set', 'R', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>R</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Set', 'E', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>E</Text>
                                </TouchableOpacity>
                            </View>
                            {/* spke */}
                            <View style={{
                                borderLeftWidth: 1,
                                borderLeftColor: colors.black,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <TouchableOpacity onPress={() => sendServer('Spike', 'A', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Spike', 'R', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>R</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Spike', 'E', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>E</Text>
                                </TouchableOpacity>
                            </View>
                            {/* Block */}
                            <View style={{
                                borderLeftWidth: 1,
                                borderLeftColor: colors.black,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <TouchableOpacity onPress={() => sendServer('Block', 'A', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Block', 'R', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>R</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Block', 'E', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>E</Text>
                                </TouchableOpacity>
                            </View>
                            {/* dig */}
                            <View style={{
                                borderLeftWidth: 1,
                                borderLeftColor: colors.black,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}>
                                <TouchableOpacity onPress={() => sendServer('Dig', 'A', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>A</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Dig', 'R', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>R</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => sendServer('Dig', 'E', item.id, index)} style={{
                                    height: 30,
                                    width: 30,
                                    borderRadius: 15,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderWidth: 1,
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontFamily: fonts.secondary[600],
                                        fontSize: windowWidth / 35,
                                        color: colors.primary,
                                    }}>E</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}

            </View>

            <MyButton onPress={() => navigation.navigate('TimHasil', {
                id: route.params.id,
                set: route.params.set
            })} title="Lihat Hasil" />


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})