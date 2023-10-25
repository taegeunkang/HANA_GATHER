import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import OngoingPayout from '../../components/Content/OngoingPayOut';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';
const DutchPayList = ({ navigation }) => {
  const { Fonts, Colors, Images } = useTheme();
  const [dutchPayList, setDutchPayList] = useState(null);
  const [dutchPayListPage, setDutchPayListPage] = useState(0);
  const [dutchPayListPageSize, setDutchPayListPageSize] = useState(20);
  const [dutchPayListLoading, setDutchPayListLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);

  const initDutchPayList = async () => {
    const response = await fetch(
      API_URL +
        `/core/home/dutchpay/list/vertical?page=${0}&size=${dutchPayListPageSize}`,
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
        setDutchPayList(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initDutchPayList();
            break;
        }
        break;
    }
  };

  const fetchDutchPayList = async () => {
    setDutchPayListLoading(true);
    const response = await fetch(
      API_URL +
        `/core/home/dutchpay/list/vertical?page=${
          dutchPayListPage + 1
        }&size=${dutchPayListPageSize}`,
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
        if (r.length > 0) setDutchPayListPage(dutchPayListPage + 1);
        let a = dutchPayList;
        a = a.concat(r);
        setDutchPayList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchDutchPayList();
            break;
        }
    }

    setDutchPayListLoading(false);
  };

  const init = async () => {
    setInitLoading(true);
    await initDutchPayList();
    setInitLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {initLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </View>
      ) : (
        <ScrollView
          horizontal={false}
          nestedScrollEnabled={true}
          onScroll={({ nativeEvent }) => {
            if (dutchPayListLoading) return;

            const isCloseToBottom =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - responsiveHeight(30);
            if (isCloseToBottom) {
              fetchDutchPayList();
            }
          }}
          scrollEventThrottle={400}
          style={{
            backgroundColor: Colors.contentBackground,
          }}
        >
          {dutchPayList &&
            dutchPayList.map((dutchPay, index) => (
              <View
                key={index}
                style={{
                  marginBottom: responsiveHeight(10),
                  position: 'relative',
                  borderBottomColor: Colors.screenBackground,
                  borderBottomWidth: responsiveHeight(3),
                }}
              >
                <OngoingPayout
                  createdDate={dutchPay.createdDate}
                  profileImages={dutchPay.memberProfileImages}
                  totalAmount={dutchPay.totalAmount}
                  onPress={() =>
                    navigation.navigate('HomeDutchPayStatus', {
                      before: 'DutchPayList',
                      dutchPayId: dutchPay.dutchPayId,
                    })
                  }
                />
                {dutchPay.allPayed ? (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: responsiveHeight(20),
                      right: responsiveWidth(20),
                      borderRadius: responsiveWidth(8),
                      backgroundColor: Colors.buttonFirstBackground,
                      width: responsiveWidth(40),
                      height: responsiveHeight(30),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={[
                        Fonts.contentRegualrMedium,
                        { color: Colors.buttonFirstContent },
                      ]}
                    >
                      완료
                    </Text>
                  </View>
                ) : (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: responsiveHeight(20),
                      right: responsiveWidth(20),
                      borderRadius: responsiveWidth(8),
                      backgroundColor: Colors.buttonSecondBackground,
                      width: responsiveWidth(40),
                      height: responsiveHeight(30),
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={[
                        Fonts.contentRegualrMedium,
                        { color: Colors.buttonSecondContent },
                      ]}
                    >
                      미완료
                    </Text>
                  </View>
                )}
              </View>
            ))}
        </ScrollView>
      )}
    </>
  );
};

export default DutchPayList;
