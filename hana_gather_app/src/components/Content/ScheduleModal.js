import { useTranslation } from 'react-i18next';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const ScheduleModal = ({ cancel, onCustom, onNormal }) => {
  const { t } = useTranslation('register');
  const { Fonts, Colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0, 0.3)',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    content: {
      width: responsiveWidth(370),
      borderRadius: responsiveWidth(12),
      backgroundColor: Colors.contentBackground,
    },
    btn: {
      width: responsiveWidth(370),
      height: responsiveHeight(70),
      alignItems: 'center',
      justifyContent: 'center',
    },

    last: {
      marginVertical: responsiveHeight(10),
      backgroundColor: Colors.contentBackground,
      borderRadius: responsiveWidth(12),
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={onCustom}
          style={[styles.btn, styles.normal]}
        >
          <Text style={[{ color: Colors.primary }, Fonts.contentMediumMedium]}>
            일반 일정 생성
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onNormal}
          style={[styles.btn, styles.normal]}
        >
          <Text style={[{ color: Colors.primary }, Fonts.contentMediumMedium]}>
            하나모여 간편예약 일정 생성
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.last,
          {
            width: responsiveWidth(370),
            height: responsiveHeight(70),

            backgroundColor: Colors.screenBackground,
            borderRadius: responsiveWidth(12),
          },
        ]}
      >
        <TouchableOpacity onPress={cancel} style={[styles.btn]}>
          <Text
            style={[
              Fonts.contentMediumMedium,
              {
                color: Colors.warn,
              },
            ]}
          >
            취소
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ScheduleModal;
