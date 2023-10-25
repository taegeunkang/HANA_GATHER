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
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Group from '../../components/Content/Group';
import Meeting from '../../components/Content/Meeting';
import SubmitButton from '../../components/SubmitButton';
import { fcmService } from '../../firebase/push.fcm';
import { localNotificationService } from '../../firebase/push.noti';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';
import {
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
const Home = ({ navigation }) => {
  const { Fonts, Colors, Images } = useTheme();
  const [profile, setProfile] = useState(null);
  const [dutchPayList, setDutchPayList] = useState(null);
  const [dutchPayListPage, setDutchPayListPage] = useState(0);
  const [dutchPayListPageSize, setDutchPayListPageSize] = useState(20);
  const [dutchPayListLoading, setDutchPayListLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [bandList, setBandList] = useState([]);
  const [bandListPage, setBandListPage] = useState(0);
  const [bandListPageSize, setBandListPageSize] = useState(20);
  const [bandListLoading, setBandListLoading] = useState(false);
  const [meetingList, setMeetingList] = useState([]);
  const [meetingListPage, setMeetingListPage] = useState(0);
  const [meetingListPageSize, setMeetingListPageSize] = useState(20);
  const [meetingListLoading, setMeetingListLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const init = async () => {
    setInitLoading(true);
    await getProfile();
    await initDutchPayList();
    await initMeetingList();
    await initBandList();
    await fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);

    setInitLoading(false);
  };
  const getProfile = async () => {
    const response = await fetch(API_URL + '/core/home/profile', {
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
        const r1 = await response.json();
        switch (r1.code) {
          case 'U08':
            await reIssue();
            await getProfile();
            break;
        }
    }
  };

  const initDutchPayList = async () => {
    const response = await fetch(
      API_URL +
        `/core/home/dutchpay/list?page=${0}&size=${dutchPayListPageSize}`,
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

  const initMeetingList = async () => {
    const response = await fetch(
      API_URL + `/core/meeting/all?page=${0}&size=${meetingListPageSize}`,
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
        setMeetingList(r);

        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initMeetingList();
            break;
        }
        break;
    }
  };

  const initBandList = async () => {
    const response = await fetch(
      API_URL + `/core/band/list?page=${0}&size=${20}`,
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
        setBandList(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initBandList();
            break;
        }
    }
  };

  const fetchDutchPayList = async () => {
    setDutchPayListLoading(true);
    const response = await fetch(
      API_URL +
        `/core/home/dutchpay/list?page=${
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

  const fetchBandList = async () => {
    setBandListLoading(true);
    const response = await fetch(
      API_URL +
        `/core/band/list?page=${bandListPage + 1}&size=${bandListPageSize}`,
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

        if (r.length > 0) setBandListPage(bandListPage + 1);
        let a = bandList;
        a = a.concat(r);
        setBandList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchBandList();
            break;
        }
    }

    setBandListLoading(false);
  };

  const fetchMeetingList = async () => {
    setMeetingListLoading(true);

    const response = await fetch(
      API_URL +
        `/core/meeting/all?page=${
          meetingListPage + 1
        }&size=${meetingListPageSize}`,
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

        if (r.length > 0) setMeetingListPage(meetingListPage + 1);
        let a = meetingList;
        a = a.concat(r);
        setMeetingList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchMeetingList();
            break;
        }
    }
    setMeetingListLoading(false);
  };

  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    await getProfile();
    await initDutchPayList();
    await initMeetingList();
    await initBandList();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const onRegister = tk => {
    console.log('[App] onRegister : token :', tk);
    if (tk) {
      updateFirebaseToken(tk);
    }
  };

  const updateFirebaseToken = async tk => {
    fetch(API_URL + `/user/notification/token/update?notificationToken=${tk}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    });
  };

  const onNotification = notify => {
    console.log('[App] onNotification : notify :', notify);
    const options = {
      soundName: 'default',
      playSound: true,
    };

    localNotificationService.showNotification(
      0,
      notify.title,
      notify.body,
      notify,
      options,
    );
  };

  const onOpenNotification = notify => {
    console.log('[App] onOpenNotification : notify :', notify);
  };

  useEffect(() => {
    init();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.contentBackground,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      {!initLoading ? (
        <ScrollView
          nestedScrollEnabled={true}
          horizontal={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
              style={{ backgroundColor: Colors.contentBackground }}
            />
          }
          onScroll={({ nativeEvent }) => {
            if (bandListLoading) return;
            const isCloseToBottom =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - responsiveHeight(30);
            if (isCloseToBottom) {
              fetchBandList();
            }
          }}
          scrollEventThrottle={400}
          style={{
            backgroundColor: Colors.contentBackground,
            flex: 1,
            width: Dimensions.get('screen').width,
          }}
        >
          <View style={{ width: '100%', alignItems: 'center' }}>
            {/* 사용자 정보(프로필 사진, 닉네임, 잔고)*/}
            {profile && (
              <View
                style={{
                  width: responsiveWidth(370),
                  height: responsiveHeight(55),
                  // marginTop: responsiveHeight(20),
                  paddingHorizontal: responsiveWidth(10),
                  backgroundColor: Colors.contentBackground,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
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
                      marginRight: responsiveWidth(5),
                      borderRadius: responsiveWidth(100),
                      backgroundColor: Colors.screenBackground,
                      resizeMode: 'cover',
                    }}
                  />

                  <Text
                    style={[
                      Fonts.contentMediumBold,
                      { color: Colors.textBold },
                    ]}
                  >
                    {profile.nickname}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={[
                      Fonts.contentMediumRegualr,
                      { color: Colors.textNormal },
                    ]}
                  >
                    잔고
                  </Text>
                  <Text
                    style={[
                      Fonts.contentMediumBold,
                      {
                        color: Colors.textBold,
                        marginLeft: responsiveWidth(5),
                      },
                    ]}
                  >
                    {numberToWon(profile.balance)}원
                  </Text>
                </View>
              </View>
            )}
            {/* 진행중인 정산*/}
            <View
              style={{
                width: responsiveWidth(350),
                height: responsiveHeight(30),
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginTop: responsiveHeight(10),
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('DutchPayList')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  // backgroundColor: 'black',
                  justifyContent: 'center',
                  borderRadius: responsiveWidth(25),
                  borderWidth: responsiveWidth(3),
                  borderColor: Colors.screenBackground,
                  width: responsiveWidth(130),
                  height: responsiveHeight(50),
                }}
              >
                <Image
                  source={Images.coins}
                  style={{
                    width: responsiveWidth(25),
                    height: responsiveHeight(25),
                    resizeMode: 'contain',
                    marginRight: responsiveWidth(5),
                  }}
                />
                <Text
                  style={[Fonts.contentMediumBold, { color: Colors.textBold }]}
                >
                  1/N 정산 목록
                </Text>
              </TouchableOpacity>
            </View>
            {/* 예정된 미팅*/}
            {meetingList && meetingList.length > 0 && (
              <View
                style={{
                  width: responsiveWidth(370),
                  marginTop: responsiveHeight(20),
                }}
              >
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: responsiveWidth(10),
                  }}
                >
                  <Text
                    style={[
                      Fonts.contentMediumLargeBold,
                      { color: Colors.textBold },
                    ]}
                  >
                    일정
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MeetingList')}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                  >
                    <Text
                      style={[
                        Fonts.contentMediumMedium,
                        { color: Colors.textNormal },
                      ]}
                    >
                      더보기
                    </Text>
                    <Image
                      source={Images.rightChevron}
                      style={{
                        width: responsiveWidth(10),
                        height: responsiveHeight(10),
                      }}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView
                  horizontal={true}
                  nestedScrollEnabled={true}
                  onScroll={({ nativeEvent }) => {
                    if (meetingListLoading) return;
                    const isCloseToRight =
                      nativeEvent.layoutMeasurement.width +
                        nativeEvent.contentOffset.x >=
                      nativeEvent.contentSize.width - responsiveWidth(30);
                    if (isCloseToRight) {
                      fetchMeetingList();
                    }
                  }}
                  scrollEventThrottle={400}
                  style={{
                    height: responsiveHeight(180),
                    backgroundColor: Colors.contentBackground,
                  }}
                >
                  {meetingList.map((meeting, index) => (
                    <View
                      style={{
                        height: '100%',
                        justifyContent: 'center',
                        marginRight: responsiveWidth(10),
                      }}
                    >
                      <Meeting
                        {...meeting}
                        titleVisible={true}
                        onPress={() =>
                          navigation.navigate('HomeMeetingDetail', {
                            ...meeting,
                            before: 'Home',
                          })
                        }
                      />
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
            {/* 모임 목록 */}
            {bandList && bandList.length > 0 ? (
              <View
                style={{
                  width: responsiveWidth(370),
                  marginTop: responsiveHeight(20),
                }}
              >
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    paddingHorizontal: responsiveWidth(10),
                    marginBottom: responsiveHeight(10),
                  }}
                >
                  <Text
                    style={[
                      Fonts.contentMediumLargeBold,
                      {
                        color: Colors.textBold,
                        marginRight: responsiveWidth(5),
                      },
                    ]}
                  >
                    그룹
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SelectCategory')}
                  >
                    <Image
                      source={Images.plus01}
                      style={{
                        width: responsiveWidth(25),
                        height: responsiveWidth(25),
                        borderRadius: responsiveWidth(300),
                      }}
                    />
                  </TouchableOpacity>
                </View>

                {bandList.map((band, index) => (
                  <View
                    style={{
                      marginRight: responsiveWidth(10),
                      borderWidth: responsiveWidth(3),
                      borderColor: Colors.screenBackground,
                      borderRadius: responsiveWidth(25),
                      marginBottom: responsiveHeight(10),
                    }}
                  >
                    <Group
                      {...band}
                      onPress={() =>
                        navigation.navigate('GroupDetail', { ...band })
                      }
                    />
                  </View>
                ))}
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  marginTop: responsiveHeight(300),
                  backgroundColor: Colors.screenBackground,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SubmitButton
                  title={'모임 생성하기'}
                  width={responsiveWidth(100)}
                  height={responsiveHeight(45)}
                  onPress={() => navigation.navigate('SelectCategory')}
                />
              </View>
            )}
          </View>
        </ScrollView>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator size={'large'} />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
