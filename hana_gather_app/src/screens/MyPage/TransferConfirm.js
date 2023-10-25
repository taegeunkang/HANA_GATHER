import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import {
  addCommasToNumber,
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import { reIssue } from '../../utils/login';
const TransferConfirm = ({ navigation, route }) => {
  const {
    email,
    nickname,
    profileImage,
    amount,
    accountNumber,
    before,
    dutchPayId,
    meetingId,
    groupDetail,
  } = route.params || { dutchpayId: null, meetingId: null, groupDetail: null };

  const { Colors, Fonts, Images } = useTheme();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBalance = async () => {
    const response = await fetch(API_URL + '/user/profile', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    });

    switch (response.status) {
      case 200:
        const r = await response.json();
        setBalance(r.balance);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await getBalance();
            break;
        }
    }
  };

  const transfer = async () => {
    setLoading(true);
    let response;
    if (dutchPayId != null) {
      response = await fetch(API_URL + '/core/dutchpay/pay', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dutchPayId: dutchPayId,
          to: email,
          amount: amount,
        }),
      });
    } else if (meetingId != null) {
      response = await fetch(
        API_URL + `/core/meeting/pay?meetingId=${meetingId}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          },
        },
      );
    } else {
      response = await fetch(
        API_URL + `/core/transfer?to=${email}&amount=${amount}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
          },
        },
      );
    }
    switch (response.status) {
      case 200:
        console.log('before', before);
        setTimeout(() => {
          setLoading(false);
          navigation.navigate(before, { ...groupDetail });
        }, 1500);

        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await transfer();
            break;
        }
        break;
    }
  };

  useEffect(() => {
    getBalance();
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          width: responsiveWidth(370),
          marginVertical: responsiveHeight(20),
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[Fonts.contentLargeBold, { color: Colors.textBold }]}>
            내 계좌
          </Text>
          <Text style={{ color: Colors.textNormal }}>에서</Text>
        </View>
        {balance && (
          <Text style={{ color: Colors.textNormal }}>
            잔액 {addCommasToNumber(balance)}원
          </Text>
        )}
      </View>

      <View
        style={{
          width: responsiveWidth(370),
          marginBottom: responsiveHeight(20),
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: responsiveHeight(5),
          }}
        >
          {profileImage && (
            <FastImage
              source={{
                uri: API_URL + `/user/profile/image?watch=${profileImage}`,
                priority: FastImage.priority.normal,
              }}
              style={{
                width: responsiveWidth(35),
                height: responsiveHeight(35),
                borderRadius: responsiveWidth(300),
                backgroundColor: Colors.screenBackground,
                marginRight: responsiveWidth(5),
                resizeMode: 'cover',
              }}
            />
          )}
          <Text style={[Fonts.contentLargeBold, { color: Colors.textBold }]}>
            {nickname}
          </Text>
          <Text style={{ color: Colors.textNormal }}>에게</Text>
        </View>
        <Text style={{ color: Colors.textNormal }}>{accountNumber}</Text>
      </View>

      <View style={{ width: responsiveWidth(370) }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text style={[Fonts.contentLargeBold, { color: Colors.textNormal }]}>
            {addCommasToNumber(amount)}원
          </Text>
          <Text style={{ color: Colors.textNormal }}>을 이체하시겠습니까?</Text>
        </View>
        <Text style={{ color: Colors.textNormal }}>
          {numberToWon(amount)}원
        </Text>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: responsiveHeight(10),
        }}
      >
        <SubmitButton title={'확인'} onPress={transfer} loading={loading} />
      </View>
    </SafeAreaView>
  );
};

export default TransferConfirm;
