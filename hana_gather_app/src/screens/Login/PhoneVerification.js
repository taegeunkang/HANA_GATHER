import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import InputBox from '../../components/InputBox';
import BackAlert from '../../components/Register/BackAlert';
import SubmitButton2 from '../../components/SubmitButton2';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { checkMobile } from '../../utils/email';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const PhoneVerification = ({ navigation, route }) => {
  const { before } = route.params || { before: null };
  const { Fonts, Colors, Images } = useTheme();
  const { t } = useTranslation('register');
  const [backButton, setBackButton] = useState(false);
  const [modlaVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [messageSending, setMessageSending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [expired, setExpired] = useState(false);
  const [wrongCode, setWrongCode] = useState(false);
  const [alreadyVerified, setAlreadyVerified] = useState(false);
  const [code, setCode] = useState(null);
  const [remianTime, setRemainTime] = useState(180);
  const [resendAvailable, setResendAvailable] = useState(true);
  const [wrongReg, setWrongReg] = useState(false);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        before == 'StartUp' ? (
          <></>
        ) : (
          <HeaderLeftButton
            onPress={() => {
              setBackButton(true);
              setModalVisible(true);
            }}
          />
        ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            if (!verified) {
              Alert.alert('인증이 완료되지 않았습니다.');
            } else {
              navigation.navigate('Account');
            }
          }}
          style={{
            backgroundColor: Colors.transparent,
            width: responsiveWidth(60),
            height: responsiveHeight(30),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              Fonts.contentMediumBold,
              {
                color: Colors.primary,
              },
            ]}
          >
            완료
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  const countTime = () => {
    time = '';

    minutes = Math.floor(remianTime / 60);
    if (minutes < 0) minutes = 0;
    if (minutes < 10) minutes = '0' + minutes;

    seconds = Math.floor(remianTime % 60, 2);
    if (seconds < 0) seconds = 0;
    if (seconds < 10) seconds = '0' + seconds;

    time = minutes + ':' + seconds;
    return time;
  };
  // 문자를 전송한지 1분이 지나지 않았다면 재전송 불가
  const checkMessageResendAvailable = () => {
    let r = countTime(remianTime);
    let min = r.substring(0, 2);
    if (parseInt(min) >= 2) {
      return false;
    }
    return true;
  };

  const sendMessage = async () => {
    if (checkMobile(phone) && sent && !checkMessageResendAvailable()) {
      setResendAvailable(false);
      return;
    }
    setResendAvailable(true);
    if (checkMobile(phone)) {
      // 이메일 형식이 맞다면
      setWrongReg(false);
      setMessageSending(true);
      let response = await fetch(API_URL + '/mobile/send?mobile=' + phone, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      });
      let status = response['status'];

      response = await response.json();

      setMessageSending(false);
      if (status == 200) {
        let timestamp = Date.parse(response['expiredDate']);
        let expiredDate = new Date(timestamp);
        let now = new Date();
        let remain = (expiredDate.getTime() - now.getTime()) / 1000;
        setRemainTime(remain);
        setSent(true);
        setWrongCode(false);
        setAlreadyVerified(false);
        setExpired(false);
        setCode('');
      } else {
        switch (response['code']) {
          case 'M06':
            alert(t('error.sent'));
            break;
          case 'M05':
            alert('이미 가입된 핸드폰입니다.');
        }
      }
    } else {
      setWrongReg(true);
    }
  };

  const verifyCode = async () => {
    let response = await fetch(
      API_URL + '/mobile/verify?mobile=' + phone + '&key=' + code,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );

    if (response['status'] == 200) {
      setWrongCode(false);
      setAlreadyVerified(false);
      setExpired(false);
      setVerified(true);
    } else {
      response = await response.json();

      switch (response['code']) {
        case 'M07':
          setExpired(false);
          setAlreadyVerified(false);
          setWrongCode(true);
          break;
        case 'M05':
          setExpired(false);
          setWrongCode(false);
          setAlreadyVerified(true);
          break;
        case 'M03':
          setWrongCode(false);
          setAlreadyVerified(false);
          setExpired(true);
          break;
      }
    }
  };

  useEffect(() => {
    if (sent) {
      let timer = setTimeout(() => {
        if (remianTime > 0) setRemainTime(remianTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
    },
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (inputRef.current) {
          inputRef.current.blur();
        }
        if (inputRef1.current) {
          inputRef1.current.blur();
        }
      }}
    >
      <View style={styles.container}>
        <Modal visible={modlaVisible} animationType={'fade'} transparent={true}>
          <BackAlert
            cancle={() => setModalVisible(false)}
            go_back={() => {
              setModalVisible(false);
              navigation.reset({ routes: [{ name: 'Login' }] });
            }}
            title={'설정이 거의 완료되었습니다.'}
            description={
              '설정이 완료되지 않으면 서비스 이용이 불가능합니다.\n 나가시겠습니까?'
            }
          />
        </Modal>
        <View style={{ marginTop: responsiveHeight(50) }} />

        <InputBox
          title={'휴대폰 번호'}
          placeholder={'휴대폰 번호를 입력해 주세요 ex) 01012345678'}
          value={phone}
          onChangeText={e => setPhone(e)}
          keyboardType={'numeric'}
          ref={inputRef}
        />

        {/* 이메일 형식이 아닌 경우 */}
        {wrongReg && !sent && (
          <View
            style={{
              width: responsiveWidth(370),
              alignItems: 'flex-start',
              marginTop: responsiveHeight(5),
            }}
          >
            <Text
              style={[
                Fonts.contentRegualrMedium,
                {
                  color: Colors.warn,
                },
              ]}
            >
              잘못된 형식입니다. ex) 010-1234-5678
            </Text>
          </View>
        )}

        <View style={{ marginTop: responsiveHeight(10) }} />
        {!verified ? (
          <SubmitButton2
            title={!sent ? '전송' : '재전송'}
            onPress={sendMessage}
            loading={messageSending}
          />
        ) : (
          <View
            style={{
              width: responsiveWidth(370),
              height: responsiveHeight(48),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.buttonSecondBackground,
              borderRadius: responsiveWidth(12),
              flexDirection: 'row',
            }}
          >
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  color: Colors.buttonSecondContent,
                },
              ]}
            >
              {t('verify.complete')}
            </Text>
          </View>
        )}
        {!resendAvailable && (
          <View
            style={{
              width: responsiveWidth(370),
              alignItems: 'flex-start',
              marginTop: responsiveHeight(5),
            }}
          >
            <Text
              style={[
                Fonts.contentRegualrMedium,
                {
                  color: Colors.warn,
                },
              ]}
            >
              {t('error.sentResent')}
            </Text>
          </View>
        )}

        <View style={{ marginTop: responsiveHeight(20) }} />

        {/* 인증코드 확인  */}
        {sent && (
          <>
            <View
              style={{
                width: responsiveWidth(370),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <View>
                <View
                  style={[
                    {
                      width: responsiveWidth(310),
                      height: responsiveHeight(26),
                      backgroundColor: Colors.contentBackground,
                    },
                  ]}
                >
                  <Text style={[Fonts.inputHeader, { color: Colors.textBold }]}>
                    {'인증코드 입력'}
                  </Text>
                </View>

                <View
                  style={[
                    {
                      width: responsiveWidth(310),
                      height: responsiveHeight(48),
                      borderRadius: responsiveWidth(12),
                      backgroundColor: Colors.inputBackground,
                      color: Colors.inputContent,
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: responsiveWidth(10),
                    },
                    expired || wrongCode || alreadyVerified
                      ? {
                          borderWidth: responsiveWidth(1),
                          borderColor: Colors.red,
                        }
                      : {},
                  ]}
                >
                  <TextInput
                    placeholder={t('verify.placeholder')}
                    placeholderTextColor={Colors.inputPlaceHolder}
                    style={{ flex: 1, backgroundColor: Colors.inputBackground }}
                    onChangeText={e => setCode(e)}
                    keyboardType="numeric"
                    value={code}
                    maxLength={6}
                    editable={!verified}
                    ref={inputRef1}
                  />
                  <Text
                    style={{
                      fontFamily: 'SpoqaHanSansNeo-Medium',
                      color: Colors.warn,
                      fontSize: responsiveWidth(12),
                      lineHeight: responsiveHeight(18),
                      letterSpacing: responsiveWidth(-0.6),
                    }}
                  >
                    {!verified ? countTime(remianTime) : ''}
                  </Text>
                </View>
              </View>
              {!verified ? (
                <SubmitButton2
                  onPress={verifyCode}
                  title={t('verify.verifyButton')}
                  width={50}
                  height={50}
                />
              ) : (
                <View
                  style={{
                    width: responsiveWidth(50),
                    height: responsiveHeight(50),
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: Colors.primary,
                    borderRadius: responsiveWidth(12),
                    flexDirection: 'row',
                  }}
                >
                  <Image
                    source={Images.confirmed}
                    style={{
                      width: responsiveWidth(35),
                      height: responsiveHeight(35),
                    }}
                  />
                </View>
              )}
            </View>
            {expired && (
              <View
                style={{
                  width: responsiveWidth(370),
                  alignItems: 'flex-start',
                  marginTop: responsiveHeight(5),
                }}
              >
                <Text
                  style={{
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                    color: '#E44949',
                    fontSize: responsiveWidth(12),
                    lineHeight: responsiveHeight(18),
                    letterSpacing: responsiveWidth(-0.6),
                  }}
                >
                  {t('verify.expired')}
                </Text>
              </View>
            )}
            {wrongCode && (
              <View
                style={{
                  width: responsiveWidth(370),
                  alignItems: 'flex-start',
                  marginTop: responsiveHeight(5),
                }}
              >
                <Text
                  style={{
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                    color: '#E44949',
                    fontSize: responsiveWidth(12),
                    lineHeight: responsiveHeight(18),
                    letterSpacing: responsiveWidth(-0.6),
                  }}
                >
                  {t('verify.wrongCode')}
                </Text>
              </View>
            )}
            {alreadyVerified && (
              <View
                style={{
                  width: responsiveWidth(370),
                  alignItems: 'flex-start',
                  marginTop: responsiveHeight(5),
                }}
              >
                <Text
                  style={{
                    fontFamily: 'SpoqaHanSansNeo-Medium',
                    color: '#E44949',
                    fontSize: responsiveWidth(12),
                    lineHeight: responsiveHeight(18),
                    letterSpacing: responsiveWidth(-0.6),
                  }}
                >
                  {t('verify.exist')}
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PhoneVerification;
