import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { colors, fonts, MyDimensi } from '../../utils';

export default function MyRadio({ label = '', selected, onPress }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.radioButton}>
                    {selected && <View style={styles.radioButtonSelected} />}
                </View>
                {label ? <Text style={styles.radioLabel}>{label}</Text> : null}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    radioButton: {
        width: 24,
        height: 24,
        backgroundColor: colors.white,
        borderRadius: 12,
        borderColor: colors.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        backgroundColor: colors.primary,
        borderRadius: 6,
    },
    radioLabel: {
        marginLeft: 15,
        fontSize: MyDimensi / 4,
        fontFamily: fonts.secondary[600],
        color: colors.primary,
    },
});