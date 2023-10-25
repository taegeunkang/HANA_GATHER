import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MapView, { Marker } from 'react-native-maps';
import Report from '../../components/Content/Report';
import ReportDetail from '../../components/Content/ReportDetail';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import SubmitButton from '../../components/SubmitButton';
import SubmitButton2 from '../../components/SubmitButton2';
import SubmitButton3 from '../../components/SubmitButton3';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import {
  formatDate,
  numberToWon,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import { reIssue } from '../../utils/login';
const MeetingDetail = ({ navigation, route }) => {
  const {
    title,
    amount,
    locationName,
    latitude,
    longitude,
    meetingDate,
    virtualAccountNumber,
    meetingId,
    members,
    before,
    groupDetail,
  } = route.params || { groupDetail: null };
  const { Fonts, Colors, Images } = useTheme();
  const [memberPayStatus, setMemberPayStatus] = useState([]);
  const [myPayStatus, setMyPayStatus] = useState(null);
  const [owner, setOwner] = useState(null);
  const [myId, setMyId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [pressedMemberId, setPressedMemberId] = useState(null);
  const mapRef = useRef(null);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: title,
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
          }}
          close={before == 'Home'}
        />
      ),
    });
  }, [title]);

  const fetchPayStatus = async () => {
    const response = await fetch(
      API_URL + `/core/meeting/pay/status?meetingId=${meetingId}`,
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
        await payed(r);
        setMemberPayStatus(r);
        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchPayStatus();
            break;
        }
        break;
    }
  };

  const isPayed = member => {
    for (let i = 0; i < memberPayStatus.length; i++) {
      if (memberPayStatus[i].nickname == member.nickname) {
        return memberPayStatus[i].payed;
      }
    }

    return false;
  };

  const findOwner = () => {
    if (members) {
      members.map((member, index) => {
        if (member.owner) {
          setOwner(member);
        }
      });
    }
  };

  const payed = async mm => {
    const email = await AsyncStorage.getItem('email');
    if (mm) {
      mm.map((member, index) => {
        if (member.memberId == email) {
          setMyPayStatus(member);
        }
      });
    }
  };

  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    await fetchPayStatus();
    await payed();
    findOwner();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const init = async () => {
    setMyId(await AsyncStorage.getItem('email'));

    await fetchPayStatus();
    await payed();
    findOwner();
  };

  const splitDateToDatePartAndTimePart = date => {
    let formattedDate = formatDate(date);

    // " " (공백)을 기준으로 문자열을 분리
    let parts = formattedDate.split(' ');

    // 날짜 부분 추출
    let datePart = `${parts[0]} ${parts[1]} ${parts[2]}`;

    // 시간 부분 추출
    let timePart = `${parts[3]} ${parts[4]} ${parts[5]}`;

    return { datePart, timePart };
  };

  const amI = async memberId => {
    const myId = await AsyncStorage.getItem('email');
    console.log(myId, memberId, memberId != myId);
    return memberId != myId;
  };

  const report = async (reason, reportType) => {
    const response = await fetch(API_URL + '/user/report', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        memberId: pressedMemberId,
        reportType: reportType,
        message: reason,
      }),
    });

    switch (response.status) {
      case 200:
        setReportModalVisible(false);
        break;
    }

    setReportModalVisible(false);
  };

  useEffect(() => {
    init();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('screen').width,
      backgroundColor: Colors.contentBackground,
    },
  });
  return (
    <>
      <Modal visible={pressed} animationType={'fade'} transparent={true}>
        <Report
          onPress={() => {
            setPressed(false);
            setReportModalVisible(true);
          }}
          cancel={() => {
            setPressed(false);
          }}
        />
      </Modal>

      <Modal
        visible={reportModalVisible}
        animationType={'fade'}
        transparent={true}
      >
        <ReportDetail
          onPress={(reason, reportType) => {
            report(reason, reportType);
          }}
          cancel={() => {
            setReportModalVisible(false);
          }}
        />
      </Modal>
      {memberPayStatus && memberPayStatus.length == 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.contentBackground,
          }}
        >
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.container}
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
                flex: 1,
                alignItems: 'center',
                paddingBottom: responsiveHeight(50),
              }}
            >
              {/* 미팅 정보 */}
              <View
                style={{
                  width: responsiveWidth(370),
                  marginTop: responsiveHeight(20),
                }}
              >
                <View style={{ flexDirection: 'column' }}>
                  <Text
                    style={[
                      Fonts.contentLargeBold,
                      {
                        color: Colors.textNormal,
                        marginBottom: responsiveHeight(10),
                      },
                    ]}
                  >
                    {splitDateToDatePartAndTimePart(meetingDate).datePart}
                  </Text>
                  <Text
                    style={[
                      Fonts.contentLargeBold,
                      {
                        color: Colors.textNormal,
                        marginBottom: responsiveHeight(10),
                      },
                    ]}
                  >
                    {splitDateToDatePartAndTimePart(meetingDate).timePart}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: responsiveHeight(40),
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
                    방장
                  </Text>
                  {owner && (
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <FastImage
                        source={{
                          uri:
                            API_URL +
                            `/user/profile/image?watch=${owner.profileImage}`,
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

                      <Text
                        style={[
                          Fonts.contentMediumMedium,
                          { color: Colors.textNormal },
                        ]}
                      >
                        {owner.nickname}
                      </Text>
                    </View>
                  )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={[
                      Fonts.contentMediumLargeBold,
                      {
                        color: Colors.textBold,
                        marginRight: responsiveWidth(5),
                      },
                    ]}
                  >
                    회비
                  </Text>
                  <Text
                    style={[
                      Fonts.contentMediumMedium,
                      { color: Colors.textNormal },
                    ]}
                  >
                    {numberToWon(amount)}원
                  </Text>
                </View>
              </View>

              {/* 결제 여부 */}
              <View
                style={{
                  width: responsiveWidth(370),
                  marginVertical: responsiveHeight(20),
                }}
              >
                <Text
                  style={[
                    Fonts.contentMediumLargeBold,
                    { marginBottom: responsiveHeight(10) },
                  ]}
                >
                  결제 여부
                </Text>

                {members &&
                  members.map((member, index) => (
                    <View
                      key={index}
                      style={{
                        width: responsiveWidth(370),
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: responsiveHeight(10),
                      }}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <FastImage
                          source={{
                            uri:
                              API_URL +
                              `/user/profile/image?watch=${member.profileImage}`,
                            priority: FastImage.priority.normal,
                          }}
                          style={{
                            width: responsiveWidth(35),
                            height: responsiveHeight(35),
                            borderRadius: responsiveWidth(100),
                            backgroundColor: Colors.screenBackground,
                            marginRight: responsiveWidth(10),
                          }}
                        />

                        <Text
                          style={[
                            Fonts.contentMediumBold,
                            { color: Colors.textBold },
                          ]}
                        >
                          {member.nickname}
                        </Text>

                        {member.memberId != myId && (
                          <TouchableOpacity
                            style={{ marginLeft: responsiveWidth(5) }}
                            onPress={() => {
                              setPressedMemberId(member.memberId);
                              setPressed(true);
                            }}
                          >
                            <Image
                              source={Images.report}
                              style={{
                                width: responsiveWidth(25),
                                height: responsiveWidth(25),
                              }}
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                      {member.invitationStatus ? (
                        isPayed(member) ? (
                          <SubmitButton
                            title={'결제 완료'}
                            width={responsiveWidth(70)}
                            height={responsiveHeight(35)}
                          />
                        ) : (
                          <SubmitButton2
                            title={'미결제'}
                            width={responsiveWidth(70)}
                            height={responsiveHeight(35)}
                          />
                        )
                      ) : (
                        <SubmitButton3
                          title={'초대 보냄'}
                          width={responsiveWidth(70)}
                          height={responsiveHeight(35)}
                        />
                      )}
                    </View>
                  ))}
              </View>

              <View
                style={{
                  width: responsiveWidth(370),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: responsiveHeight(5),
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
                  장소
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MeetingLocation', {
                      latitude: latitude,
                      longitude: longitude,
                    })
                  }
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <Text
                    style={[
                      Fonts.contentMediumMedium,
                      { color: Colors.textNormal },
                    ]}
                  >
                    {locationName}
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
              {latitude && longitude && (
                <MapView
                  style={{
                    width: responsiveWidth(370),
                    height: responsiveHeight(150),
                    borderRadius: responsiveWidth(12),
                  }}
                  showsUserLocation={false}
                  userLocationUpdateInterval={1000}
                  showsMyLocationButton={false}
                  ref={mapRef}
                  initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0175,
                    longitudeDelta: 0.0175,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: latitude,
                      longitude: longitude,
                    }}
                  >
                    <Image
                      source={Images.dot}
                      style={{
                        width: responsiveWidth(40),
                        height: responsiveWidth(40),
                        resizeMode: 'contain',
                      }}
                    />
                  </Marker>
                </MapView>
              )}
            </View>
          </ScrollView>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
              backgroundColor: Colors.contentBackground,
              position: 'absolute',
              bottom: responsiveHeight(10),
            }}
          >
            {myPayStatus == null ? (
              <></>
            ) : myPayStatus.payed ? (
              <SubmitButton title={'닫기'} onPress={() => navigation.pop()} />
            ) : (
              <SubmitButton
                title={'결제하기'}
                onPress={() =>
                  navigation.navigate('HomeTransferConfirm', {
                    email: owner.memberId,
                    nickname: owner.nickname,
                    profileImage: owner.profileImage,
                    amount: amount,
                    accountNumber: virtualAccountNumber,
                    before: before,
                    meetingId: meetingId,
                    groupDetail: groupDetail,
                  })
                }
              />
            )}
          </View>
        </>
      )}
    </>
  );
};

export default MeetingDetail;
