import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import InputBox from '../../components/InputBox';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import {
  calcKeyboardHeight,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import { reIssue } from '../../utils/login';

const TransferInform = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
          }}
          close={true}
        />
      ),
    });
  });
  const { friends } = route.params || { friends: null };
  const { Fonts, Colors, Images } = useTheme();
  const [amount, setAmount] = useState(null);
  const [account, setAccount] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(false);
  const accountRef = useRef(null);
  const inputRef = useRef(null);

  const submit = async () => {
    if (
      !account ||
      (account && account.length < 14) ||
      !amount ||
      (amount && amount == 0)
    ) {
      Alert.alert('정보를 입력해 주세요.');
      return;
    }
    setLoading(true);

    const response = await fetch(
      API_URL + `/user/search/account?account=${account}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          'Content-Type': 'application/json',
        },
      },
    );
    switch (response.status) {
      case 200:
        const r = await response.json();
        setUserInfo(r);
        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await submit();
            break;
        }
        break;
      case 404:
        Alert.alert('사용자를 찾을 수 없습니다.');
        break;
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    // setLoading(false);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
    },
  });
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        width: Dimensions.get('screen').width,
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={calcKeyboardHeight(
        Dimensions.get('screen').height,
      )}
    >
      <View style={styles.container}>
        <View style={{ height: responsiveHeight(10) }} />
        <InputBox
          title={'계좌번호'}
          placeholder={'계좌번호 입력'}
          value={account}
          onChangeText={e => setAccount(e)}
          keyboardType={'numeric'}
          ref={accountRef}
        />

        <InputBox
          title={'금액'}
          placeholder={'금액 입력'}
          value={amount}
          onChangeText={e => setAmount(e)}
          keyboardType={'numeric'}
          ref={inputRef}
        />
        {!loading && userInfo && (
          <View
            style={{
              flex: 8,
              height: responsiveHeight(150),
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <View
              style={{
                width: responsiveWidth(130),
                height: responsiveHeight(80),
                alignItems: 'flex-start',
                marginLeft: responsiveWidth(10),
                marginTop: responsiveHeight(10),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginBottom: responsiveHeight(10),
                }}
              >
                <FastImage
                  source={{
                    uri:
                      API_URL +
                      `/user/profile/image?watch=${userInfo.profileImage}`,
                    priority: FastImage.priority.normal,
                  }}
                  style={{
                    width: responsiveWidth(35),
                    height: responsiveWidth(35),
                    resizeMode: 'cover',
                    borderRadius: responsiveWidth(100),
                    marginRight: responsiveWidth(5),
                  }}
                />

                <Text
                  style={[Fonts.contentMediumBold, { color: Colors.textBold }]}
                >
                  {userInfo.nickname}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={Images.bank}
                  style={{
                    width: responsiveWidth(25),
                    height: responsiveHeight(25),
                    resizeMode: 'contain',
                    borderRadius: responsiveWidth(100),
                    marginRight: responsiveWidth(5),
                  }}
                />
                <Text style={[Fonts.contentMediumBold]}>
                  {userInfo.accountNumber}
                </Text>
              </View>
            </View>
          </View>
        )}

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: responsiveHeight(10),
          }}
        >
          <SubmitButton
            title={!userInfo ? '확인' : '다음'}
            onPress={
              !userInfo
                ? submit
                : () =>
                    navigation.navigate('TransferConfirm', {
                      email: userInfo.email,
                      nickname: userInfo.nickname,
                      profileImage: userInfo.profileImage,
                      amount: amount,
                      accountNumber: userInfo.accountNumber,
                      before: 'MyPage',
                    })
            }
            loading={loading}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TransferInform;
