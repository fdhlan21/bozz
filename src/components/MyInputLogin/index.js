import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { Color, colors } from '../../utils/colors';
import { MyDimensi, fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function MyInputLogin({
  onFocus,
  label,
  nolabel = false,
  borderColor = Color.blueGray[300],
  backgroundColor = colors.white,
  editable,
  icon = true,
  maxLength,
  iconname,
  onChangeText,
  value,
  borderWidth = 1,
  textColor = colors.black,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  autoFocus,
  multiline,
  label2,
  styleLabel,
  colorIcon = colors.black,
}) {

  const [tutup, setTutup] = useState(true);
  return (
    <View style={{marginTop:20}}>
      <Text style={{
        ...fonts.subheadline3,
        color: colors.white,
        marginBottom: 8,
      }}>{label}</Text>
      <View style={{
        height: 50,
      }}>
        <View style={{
          position: 'absolute',
          left: 12,
          top: 13,
        }}>
          <Icon type='ionicon' name={iconname} color={Color.blueGray[300]} size={24} />
        </View>
        <TextInput
          maxLength={maxLength}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          value={value}
          placeholderTextColor={Color.blueGray[400]}

          editable={editable}

          multiline={multiline}
          autoFocus={autoFocus}
          onFocus={onFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? tutup : false}




          autoCapitalize="none"


          style={{
            ...fonts.body3,
            flex: 1,
            paddingLeft: 10,
            height: 50,
            paddingHorizontal: 12,
            color: Color.blueGray[900],
            borderWidth: 1,
            borderRadius: 8,
            borderColor: borderColor,
            backgroundColor:'white'
          }} />
        {secureTextEntry &&
          <TouchableOpacity onPress={() => {
            if (tutup) {
              setTutup(false);
            } else {
              setTutup(true);
            }
          }} style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
          }}>
            <Icon type="ionicon" name={!tutup ? 'eye-off' : 'eye'} color={colors.border} size={18} />
          </TouchableOpacity>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
