import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';

const Congraturation = ({ navigation, route }) => {
  const { title, description, destination } = route.params;
  const { t } = useTranslation('register');
  const { Colors, Fonts } = useTheme();

  useEffect(() => {
    if (this._confettiView) {
      this._confettiView.startConfetti();
    }
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleBox: {
      flex: 9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'SpoqaHanSansNeo-Bold',
      fontSize: responsiveWidth(36),
      lineHeight: responsiveHeight(46),
      letterSpacing: -responsiveWidth(0.6),
      color: Colors.textBold,
    },

    btn: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: responsiveHeight(50),
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={Fonts.contentMediumMedium}>{description}</Text>
      </View>
      <View style={styles.btn}>
        <SubmitButton
          title={
            destination === 'Login' ? t('complete.return') : t('complete.home')
          }
          onPress={() => navigation.reset({ routes: [{ name: destination }] })}
        />
      </View>
    </View>
  );
};

export default Congraturation;
