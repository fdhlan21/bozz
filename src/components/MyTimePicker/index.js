import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyTimePicker({
  label,
  iconname = 'time',
  onTimeChange,
  value,
  borderColor = Color.blueGray[300],
}) {
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(value || new Date());

  const onChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShow(false);
    setTime(currentTime);
    onTimeChange(currentTime);
  };

  const showTimepicker = () => {
    setShow(true);
  };

  return (
    <View style={{}}>
      <Text style={{
        ...fonts.subheadline3,
        color: colors.primary,
        marginBottom: 8,
      }}>{label}</Text>
      <TouchableOpacity onPress={showTimepicker} style={{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: borderColor,
        backgroundColor: 'white',
        paddingLeft: 12,
      }}>
        <Icon type='ionicon' name={iconname} color={Color.blueGray[300]} size={24} />
        <Text style={{
          ...fonts.body3,
          flex: 1,
          paddingLeft: 10,
          color: Color.blueGray[900],
        }}>
          {time ? time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Pilih Waktu'}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="timePicker"
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
