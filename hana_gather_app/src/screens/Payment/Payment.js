import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from '../../hooks';
import InputBox from '../../components/InputBox';
import { useState, useLayoutEffect, useEffect, useRef } from 'react';
import SubmitButton from '../../components/SubmitButton';
import {
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import More from '../../components/Content/More';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { API_URL } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { reIssue } from '../../utils/login';
const Payment = ({ navigation, route }) => {
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
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const submit = async () => {
    setLoading(true);

    const friendsEmail = [];

    for (let i = 0; i < friends.length; i++) {
      friendsEmail.push(friends[i].email);
    }

    const response = await fetch(API_URL + '/core/dutchpay', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requester: await AsyncStorage.getItem('email'),
        totalAmount: amount,
        amountPerPerson: amount / (friends.length + 1),
        member: friendsEmail,
      }),
    });

    switch (response.status) {
      case 200:
        const r = await response.json();
        navigation.navigate('DutchPayStatus', {
          before: 'Payment',
          dutchPayId: r,
        });
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
    }

    setLoading(false);
  };

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
        inputRef.current.blur();
      }}
    >
      <SafeAreaView style={styles.container}>
        <InputBox
          title={'금액'}
          placeholder={'금액 입력'}
          value={amount}
          onChangeText={e => setAmount(e)}
          keyboardType={'numeric'}
          ref={inputRef}
        />

        <View
          style={{
            width: responsiveWidth(370),
            marginTop: responsiveHeight(20),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: responsiveHeight(20),
            }}
          >
            <Text
              style={[
                Fonts.contentMediumBold,
                { marginRight: responsiveWidth(5), color: Colors.textBold },
              ]}
            >
              인원
            </Text>
            <TouchableOpacity
              onPress={() => navigation.push('SearchUser1')}
              style={{
                width: responsiveWidth(25),
                height: responsiveHeight(25),
              }}
            >
              <Image
                source={Images.plus01}
                style={{
                  width: responsiveWidth(25),
                  height: responsiveHeight(25),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>

          {friends && friends.length > 0 && (
            <View>
              {friends.map((friend, index) => {
                if (index > 2) return;

                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage
                      key={index}
                      source={{
                        uri:
                          API_URL +
                          `/user/profile/image?watch=${friend.profileImage}`,
                        priority: FastImage.priority.normal,
                      }}
                      style={{
                        width: responsiveWidth(35),
                        height: responsiveHeight(35),
                        marginBottom: responsiveHeight(5),
                        borderRadius: responsiveWidth(100),
                        resizeMode: 'cover',
                        marginRight: responsiveWidth(5),
                      }}
                    />

                    <Text
                      style={[
                        Fonts.contentMediumMedium,
                        { color: Colors.textNormal },
                      ]}
                    >
                      {friend.nickname}
                    </Text>
                  </View>
                );
              })}
              {friends.length - 3 > 0 && <More count={friends.length - 3} />}
            </View>
          )}
          {amount > 0 && friends && friends.length > 0 && (
            <View style={{ marginTop: responsiveHeight(20) }}>
              <Text
                style={[Fonts.contentMediumBold, { color: Colors.textBold }]}
              >
                1인당 정산 금액
              </Text>
              <Text
                style={[Fonts.contentLargeBold, { color: Colors.textBold }]}
              >
                {numberToWon(amount / (friends.length + 1))}원
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            paddingBottom: responsiveHeight(10),
          }}
        >
          <SubmitButton
            title={'결제 요청'}
            onPress={submit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Payment;
