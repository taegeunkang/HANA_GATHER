import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import User from '../../components/Content/User';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import {
  formatDate,
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import { reIssue } from '../../utils/login';
const DutchPayStatus = ({ navigation, route }) => {
  const { before, dutchPayId } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () =>
        before == 'Payment' ? (
          <></>
        ) : (
          <HeaderLeftButton
            onPress={() => {
              navigation.pop();
            }}
            close={true}
          />
        ),
    });
  });

  const { Fonts, Colors } = useTheme();
  const [status, setStatus] = useState(null);
  const [payed, setPayed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const init = async () => {
    await getPayoutStatus();
  };

  const getPayoutStatus = async () => {
    const response = await fetch(
      API_URL + `/core/dutchpay/status?dutchPayId=${dutchPayId}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );

    switch (response.status) {
      case 200:
        const r = await response.json();
        const myId = await AsyncStorage.getItem('email');
        for (let i = 0; i < r.members.length; i++) {
          if (r.members[i].memberId == myId && r.members[i].payed) {
            setPayed(true);
          }
        }
        setStatus(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await getPayoutStatus();
            break;
        }
        break;
    }
  };
  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    await init();

    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    init();
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
      {status ? (
        <>
          <ScrollView
            style={{ flex: 8 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Colors.primary}
                colors={[Colors.primary]}
                style={{ backgroundColor: Colors.contentBackground }}
              />
            }
          >
            <View
              style={{
                width: responsiveWidth(370),
                alignItems: 'flex-start',
                marginTop: responsiveHeight(20),
              }}
            >
              <Text
                style={[Fonts.contentLargeBold, { color: Colors.textBold }]}
              >
                {formatDate(status.createdDate)}
              </Text>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: responsiveHeight(10),
                  }}
                >
                  <Text
                    style={[
                      {
                        color: Colors.textNormal,
                        marginRight: responsiveWidth(5),
                      },
                      Fonts.contentMediumRegualr,
                    ]}
                  >
                    총 금액
                  </Text>
                  <Text
                    style={[Fonts.contentLargeBold, { color: Colors.textBold }]}
                  >
                    {numberToWon(status.totalAmount)}원
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={[
                      {
                        color: Colors.textNormal,
                        marginRight: responsiveWidth(5),
                      },
                      Fonts.contentMediumRegualr,
                    ]}
                  >
                    정산금액 1인당
                  </Text>
                  <Text
                    style={[Fonts.contentLargeBold, { color: Colors.textBold }]}
                  >
                    {numberToWon(status.amountPerPerson)}원
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                width: responsiveWidth(370),
                marginTop: responsiveHeight(50),
                alignItems: 'center',
              }}
            >
              <View
                style={{ width: '100%', marginBottom: responsiveHeight(20) }}
              >
                <Text
                  style={[Fonts.contentLargeBold, { color: Colors.textBold }]}
                >
                  결제 여부
                </Text>
              </View>
              {status &&
                status.members.map((member, index) => (
                  <User key={index} {...member} />
                ))}
            </View>
          </ScrollView>
          <View
            style={{
              flex: 0.3,
              height: '100%',
              justifyContent: 'flex-end',
              paddingBottom: responsiveHeight(10),
            }}
          >
            {before == 'Notification' ? (
              <SubmitButton
                title={payed ? '닫기' : '결제하기'}
                onPress={() => {
                  if (payed) {
                    navigation.pop();
                  } else {
                    navigation.navigate('HomeTransferConfirm', {
                      email: status.requester,
                      nickname: status.requesterNickname,
                      profileImage: status.requesterProfileImage,
                      amount: status.amountPerPerson,
                      accountNumber: status.requesterAccountNumber,
                      dutchPayId: dutchPayId,
                      before: before,
                    });
                  }
                }}
              />
            ) : (
              <SubmitButton
                title={payed ? '홈으로' : '결제하기'}
                onPress={() =>
                  navigation.navigate(
                    payed ? 'DutchPayList' : 'HomeTransferConfirm',
                    {
                      email: status.requester,
                      nickname: status.requesterNickname,
                      profileImage: status.requesterProfileImage,
                      amount: status.amountPerPerson,
                      accountNumber: status.requesterAccountNumber,
                      dutchPayId: dutchPayId,
                      before: before,
                    },
                  )
                }
              />
            )}
          </View>
        </>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default DutchPayStatus;
