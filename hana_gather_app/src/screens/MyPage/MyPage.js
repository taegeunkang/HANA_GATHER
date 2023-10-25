import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Transaction from '../../components/Content/Transcation';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';
import {
  addCommasToNumber,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
const MyPage = ({ navigation }) => {
  const { Fonts, Colors, Images } = useTheme();
  const [profile, setProfile] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [transferHistory, setTransferHistory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const init = async () => {
    await getProfile();
    await getTransferHistory();
  };

  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    setPage(0);
    await init();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const getProfile = async () => {
    const response = await fetch(API_URL + '/user/profile', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    });

    switch (response.status) {
      case 200:
        const r = await response.json();
        setProfile(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await getProfile();
            break;
        }
        break;
    }
  };

  const getTransferHistory = async () => {
    const response = await fetch(
      API_URL + `/core/transfer/history?page=${0}&size=${size}`,
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
        setTransferHistory(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await getTransferHistory();
            break;
        }
        break;
    }
    setPage(0);
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(
      API_URL + `/core/transfer/history?page=${page + 1}&size=${size}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );
    if (response.status == 200) {
      const r = await response.json();

      if (r.length > 0) setPage(page + 1);

      let a = transferHistory;
      a = a.concat(r);
      setTransferHistory(a);
    } else if (response.status == 400) {
      const k = await response.json();

      switch (k['code']) {
        case 'U08':
          await reIssue();
          await fetchData();
          break;
      }
    }
    setLoading(false);
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
      {profile && (
        <>
          <View
            style={{
              width: responsiveWidth(370),
              height: responsiveHeight(55),
              backgroundColor: Colors.contentBackground,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: responsiveWidth(10),
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                height: responsiveHeight(55),
              }}
            >
              <FastImage
                source={{
                  uri:
                    API_URL +
                    `/user/profile/image?watch=${profile.profileImage}`,
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

              <Text style={Fonts.contentMediumBold}>{profile.nickname}</Text>
            </View>

            <Image
              source={Images.moreHorizontal}
              style={{
                width: responsiveWidth(25),
                height: responsiveHeight(25),
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: responsiveHeight(190),
              backgroundColor: Colors.screenBackground,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: responsiveWidth(370),
                height: responsiveHeight(170),
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
                paddingHorizontal: responsiveWidth(20),
                paddingVertical: responsiveHeight(10),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  width: responsiveWidth(330),
                }}
              >
                <Image
                  source={Images.bank}
                  style={{
                    width: responsiveWidth(35),
                    height: responsiveWidth(35),
                    marginRight: responsiveWidth(5),
                  }}
                />
                <Text style={Fonts.contentMediumRegualr}>
                  {profile.accountNumber}
                </Text>
              </View>

              <View
                style={{
                  width: responsiveWidth(330),
                  alignItems: 'flex-end',
                  height: responsiveHeight(50),
                  justifyContent: 'center',
                }}
              >
                <Text style={Fonts.contentLargeBold}>
                  {addCommasToNumber(profile.balance)}원
                </Text>
              </View>

              <View
                style={{
                  width: responsiveWidth(330),
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingBottom: responsiveHeight(10),
                }}
              >
                <SubmitButton
                  title={'이체'}
                  width={330}
                  height={50}
                  onPress={() => navigation.navigate('TransferInform')}
                />
              </View>
            </View>
          </View>

          {transferHistory ? (
            <>
              <View
                style={{
                  width: responsiveWidth(370),
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  height: responsiveHeight(40),
                }}
              >
                <Text style={Fonts.contentMediumBold}>이체 내역</Text>
              </View>
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor={Colors.primary}
                    colors={[Colors.primary]}
                    style={{ backgroundColor: Colors.contentBackground }}
                  />
                }
                style={{
                  flex: 1,
                  width: Dimensions.get('screen').width,
                }}
                onScroll={({ nativeEvent }) => {
                  if (loading) return;

                  const isCloseToBottom =
                    nativeEvent.layoutMeasurement.height +
                      nativeEvent.contentOffset.y >=
                    nativeEvent.contentSize.height - responsiveHeight(70);
                  if (isCloseToBottom && !loading) {
                    fetchData();
                  }
                }}
                scrollEventThrottle={400}
              >
                <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
                  {transferHistory.length > 0 ? (
                    transferHistory.map((history, index) => (
                      <Transaction
                        key={index}
                        from={history.nickname}
                        amount={history.amount}
                        balance={history.balance}
                        date={history.createdDate}
                        isWithdraw={history.status}
                      />
                    ))
                  ) : (
                    <View
                      style={{
                        flex: 1,
                        marginTop: responsiveHeight(200),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={[
                          { color: Colors.textNormal },
                          Fonts.contentMediumRegualr,
                        ]}
                      >
                        이체 내역이 존재하지 않습니다.
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ActivityIndicator size={'large'} color={Colors.primary} />
            </View>
          )}
        </>
      )}
    </SafeAreaView>
  );
};
export default MyPage;
