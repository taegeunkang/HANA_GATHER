import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import InputBox from '../../components/InputBox';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { checkEmail } from '../../utils/email';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';

const Login = ({ navigation }) => {
  const { t } = useTranslation('login');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [wrongId, setWrongId] = useState(false);
  const [wrongRes, setWrongRes] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const { Layout, Images, Fonts, Colors, FontSize } = useTheme();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const passwordRef = useRef(null);

  const loginSubmit = async () => {
    if (!id && !password) {
      return;
    }
    if (!checkEmail(id)) {
      setWrongId(true);
      return;
    }
    setWrongId(false);
    setWrongRes(false);
    setWrongPassword(false);
    if (id.length >= 0 && password.length >= 0) {
      setLoading(true);
      let response = await fetch(API_URL + '/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: id,
          password: password,
        }),
      });
      let status = response['status'];
      response = await response.json();
      if (status == 200) {
        await AsyncStorage.setItem('token', response.token);
        await AsyncStorage.setItem('refreshToken', response.refreshToken);
        await AsyncStorage.setItem('email', response.email);

        switch (response.initStatus) {
          case 1:
            navigation.navigate('Permission', { before: 'Login' });
            break;
          case 2:
            navigation.navigate('PhoneVerification', { before: 'Login' });
            break;
          case 3:
            navigation.reset({ routes: [{ name: 'MainNavigator' }] });
            break;
        }
      } else if (status == 400) {
        switch (response['code']) {
          case 'U01':
            setWrongRes(true);
            break;
          case 'U02':
            setWrongPassword(true);
            break;
          case 'U08':
            await reIssue();
            await loginSubmit();
            break;
          default:
            alert('서버 에러!');
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const styles = StyleSheet.create({
    loginInput: {
      width: responsiveWidth(370),
      height: responsiveHeight(48),
      borderRadius: responsiveWidth(12),
      backgroundColor: Colors.inputBackground,
      paddingHorizontal: responsiveWidth(10),
      color: Colors.inputContent,
    },
    forgetSentence: {
      width: responsiveWidth(370),
      color: Colors.inputPlaceHolder,
      marginBottom: responsiveHeight(40),
      marginTop: responsiveHeight(20),
    },
    snsLoginSenetence: {
      fontSize: FontSize.small,
      color: Colors.DarkGray,
      marginTop: responsiveHeight(30),
    },
    wrongInput: {
      color: Colors.warn,
      width: responsiveWidth(370),
    },
  });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current.blur();
        passwordRef.current.blur();
      }}
    >
      <SafeAreaView
        style={{ backgroundColor: Colors.contentBackground, flex: 1 }}
      >
        <View
          style={{
            width: '100%',
            height: responsiveHeight(250),
            alignItems: 'center',
            justifyContent: 'flex-end',
            // backgroundColor: 'black',
          }}
        >
          <Image
            source={Images.logo}
            style={{
              width: responsiveWidth(150),
              height: responsiveHeight(150),
            }}
          />
        </View>

        <View style={(Layout.fullWidth, Layout.center)}>
          <InputBox
            title={'이메일'}
            placeholder={t('input.id')}
            onChangeText={e => setId(e.toLowerCase())}
            value={id}
            isWrong={wrongId || wrongRes}
            ref={inputRef}
          />
          {wrongId && (
            <Text style={[styles.wrongInput, Fonts.contentRegualrMedium]}>
              {t('wrongId')}
            </Text>
          )}
          {wrongRes && (
            <Text style={[styles.wrongInput, Fonts.contentRegualrMedium]}>
              {t('wrongInfo')}
            </Text>
          )}

          <InputBox
            title={'비밀번호'}
            placeholder={t('input.password')}
            onChangeText={e => setPassword(e)}
            value={password}
            isWrong={wrongPassword}
            passwordInvisible={true}
            ref={passwordRef}
          />

          {wrongPassword && (
            <Text style={styles.wrongInput}>{t('wrongPassword')}</Text>
          )}
          <Text style={[Fonts.contentRegualrMedium, styles.forgetSentence]}>
            {t('forget')}
          </Text>
          <SubmitButton
            onPress={loginSubmit}
            title={t('loginBtn')}
            loading={loading}
          />

          {/* SNS 로그인*/}

          {/* <Text style={styles.snsLoginSenetence}>{t('snsLogin')}</Text>
        <Sns googleSigin={googleSigin} kakaoSignin={kakaoSignin} /> */}

          <TouchableOpacity
            style={{
              width: responsiveWidth(180),
              height: responsiveHeight(35),
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: responsiveHeight(30),
            }}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={1}
          >
            <Text
              style={[
                Fonts.contentRegualrMedium,
                { color: Colors.inputPlaceHolder },
              ]}
            >
              {t('registerTitle')}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
