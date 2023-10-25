import React from 'react';
import { Calendar as C, LocaleConfig } from 'react-native-calendars';
import { useTheme } from '../hooks';
import { responsiveWidth } from '../utils/utils';

LocaleConfig.locales['kr'] = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    'Janv.',
    'Févr.',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil.',
    'Août',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Dimanche',
    'Lundi',
    'Mardi',
    'Mercredi',
    'Jeudi',
    'Vendredi',
    'Samedi',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
};
LocaleConfig.defaultLocale = 'kr';

const Calendar = ({ selectedDays, selectDay }) => {
  const { Fonts, Colors, Images } = useTheme();

  return (
    <C
      style={{ width: responsiveWidth(370) }}
      monthFormat="yyyy MM"
      enableSwipeMonths={true}
      theme={{
        backgroundColor: Colors.contentBackground,
        textSectionTitleColor: Colors.textNormal,
        selectedDayBackgroundColor: Colors.primary,
        selectedDayTextColor: Colors.white,
        todayTextColor: Colors.primary,
        arrowColor: Colors.primary,
        textDayFontFamily: 'SpoqaHanSansNeo-Bold',
        textDayFontSize: responsiveWidth(14),
        textDayFontWeight: 400,
        textDayHeaderFontFamily: 'SpoqaHanSansNeo-Bold',
        textDayHeaderFontSize: responsiveWidth(14),
        textMonthFontFamily: 'SpoqaHanSansNeo-Bold',
        textMonthFontSize: responsiveWidth(16),
        textMonthFontWeight: 'bold',
      }}
      onDayPress={day => {
        selectDay(day.dateString);
      }}
      markedDates={selectedDays}
    />
  );
};

export default Calendar;
