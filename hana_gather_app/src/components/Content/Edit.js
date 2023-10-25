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
const Edit = ({ close, setProfileImage, reset }) => {
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
          onPress={setProfileImage}
          style={[styles.btn, styles.normal]}
        >
          <Text style={[{ color: Colors.primary }, Fonts.contentMediumMedium]}>
            사진 선택
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reset} style={[styles.btn, styles.normal]}>
          <Text style={[{ color: Colors.primary }, Fonts.contentMediumMedium]}>
            초기화
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
        <TouchableOpacity onPress={close} style={[styles.btn]}>
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

export default Edit;
