import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate, responsiveHeight, responsiveWidth } from '../utils/utils';
import { useTheme } from '../hooks';

const DateTimePicker = (
  onConfirm,
  visible,
  setVisible,
  date,
  time,
  onCancel,
) => {
  const { Fonts, Colors, Images } = useTheme();

  return <View></View>;
};

export default DateTimePicker;
