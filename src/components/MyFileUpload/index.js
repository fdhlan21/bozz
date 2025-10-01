import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { Color, colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';

export default function MyFileUploader({
  label,
  iconname = 'upload',
  onFileChange,
  borderColor = Color.blueGray[300],
}) {
  const [fileName, setFileName] = useState('');

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      if (result) {
        // Update nama file yang dipilih
        setFileName(result[0].name);

        // Pastikan onFileChange adalah fungsi sebelum memanggilnya
        if (typeof onFileChange === 'function') {
          onFileChange(result[0]);
        } else {
          console.warn('onFileChange prop is not a function');
        }
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error picking file:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={pickFile} style={[styles.button, { borderColor: borderColor }]}>
        
        <Text style={styles.fileNameText}>
          {fileName ? fileName : 'Pilih File'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    ...fonts.subheadline3,
    color: colors.primary,
    marginBottom: 8,
  },
  button: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingLeft: 12,
  },
  fileNameText: {
    ...fonts.body3,
    flex: 1,
    paddingLeft: 10,
    color: Color.blueGray[900],
  },
});
