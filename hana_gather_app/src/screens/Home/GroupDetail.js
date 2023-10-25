import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Meeting from '../../components/Content/Meeting';
import More from '../../components/Content/More';
import PostBox from '../../components/Content/PostBox';
import ScheduleModal from '../../components/Content/ScheduleModal';
import SubmitButton2 from '../../components/SubmitButton2';
import SubmitButton3 from '../../components/SubmitButton3';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';
const GroupDetail = ({ navigation, route }) => {
  const { bandId, category, thumbnail, members, title } = route.params;

  const { Fonts, Colors, Images } = useTheme();
  const [vertical, setVertical] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [meetingList, setMeetingList] = useState([]);
  const [meetingListPage, setMeetingListPage] = useState(0);
  const [meetingListPageSize, setMeetingListPageSize] = useState(20);
  const [meetingListLoading, setMeetingListLoading] = useState(false);

  const [meetingHistoryList, setMeetingHistoryList] = useState([]);
  const [meetingHistoryListPage, setMeetingHistoryListPage] = useState(0);
  const [meetingHistoryListPageSize, setMeetingHistoryListPageSize] =
    useState(20);
  const [meetingHistoryListLoading, setMeetingHistoryListLoading] =
    useState(false);

  const [postList, setPostList] = useState([]);
  const [postListPage, setPostListPage] = useState(0);
  const [postListPageSize, setPostListPageSize] = useState(20);
  const [postListLoading, setPostListLoading] = useState(false);
  const [groupMember, setGroupMembers] = useState(members);
  const [now, setNow] = useState(new Date());

  const [refreshing, setRefreshing] = useState(false);

  const initMeetingList = async () => {
    const response = await fetch(
      API_URL +
        `/core/meeting/list?page=${0}&size=${meetingListPageSize}&bandId=${bandId}`,
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

  const fetchMeetingList = async () => {
    setMeetingListLoading(true);

    const response = await fetch(
      API_URL +
        `/core/meeting/list?page=${
          meetingListPage + 1
        }&size=${meetingListPageSize}&bandId=${bandId}`,
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

  const initMeetingHistoryList = async () => {
    const response = await fetch(
      API_URL +
        `/core/meeting/history?bandId=${bandId}&page=${0}&size=${meetingHistoryListPageSize}`,
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
        setMeetingHistoryList(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initMeetingHistoryList();
        }
        break;
    }
  };

  const getMembers = async () => {
    const response = await fetch(API_URL + `/core/band?bandId=${bandId}`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    });
    switch (response.status) {
      case 200:
        const r = await response.json();
        setGroupMembers(r.members);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await getMembers();
            break;
        }
    }
  };

  const fetchMeetingHistoryList = async () => {
    setMeetingHistoryListLoading(true);

    const response = await fetch(
      API_URL +
        `/core/meeting/history?bandId=${bandId}&page=${
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

        if (r.length > 0) setMeetingHistoryListPage(meetingHistoryListPage + 1);
        let a = meetingHistoryList;
        a = a.concat(r);
        setMeetingHistoryList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchMeetingHistoryList();
        }
    }
    setMeetingHistoryListLoading(false);
  };

  const init = async () => {
    await initMeetingList();
    await initMeetingHistoryList();
    await initPostList();
    await getMembers();
  };

  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);
    await init();
    setMeetingHistoryListPage(0);
    setMeetingListPage(0);
    setPostListPage(0);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const initPostList = async () => {
    const response = await fetch(
      API_URL +
        `/core/band/post/list?bandId=${bandId}&page=${0}&size=${postListPageSize}`,
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
        setPostList(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initPostList();
            break;
        }
        break;
    }
  };

  const fetchPostList = async () => {
    setPostListLoading(true);
    const response = await fetch(
      API_URL +
        `/core/band/list?page=${postListPage + 1}&size=${postListPageSize}`,
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

        if (r.length > 0) setPostListPage(postListPage + 1);
        let a = postList;
        a = a.concat(r);
        setPostList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchPostList();
            break;
        }
    }

    setPostListLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Colors.contentBackground },
  });
  return (
    <>
      <Modal visible={pressed} animationType={'fade'} transparent={true}>
        <ScheduleModal
          onCustom={() => {
            setPressed(false);
            navigation.navigate('SelectLocation', {
              bandId: bandId,
              category: category,
              thumbnail: thumbnail,
              members: members,
              title: title,
            });
          }}
          onNormal={() => {
            setPressed(false);
            navigation.navigate('Reservation');
          }}
          cancel={() => {
            setPressed(false);
          }}
        />
      </Modal>

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
        onScroll={({ nativeEvent }) => {
          if (postListLoading) return;
          const isCloseToBottom =
            nativeEvent.layoutMeasurement.height +
              nativeEvent.contentOffset.y >=
            nativeEvent.contentSize.height - responsiveHeight(30);
          if (isCloseToBottom) {
            fetchPostList();
          }
        }}
        scrollEventThrottle={400}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: Colors.contentBackground,
          }}
        >
          <View style={{ width: responsiveWidth(370) }}>
            <View
              style={{
                width: '100%',
                borderRadius: responsiveWidth(16),
                backgroundColor: Colors.contentBackground,
                // paddingHorizontal: responsiveWidth(20),
                paddingVertical: responsiveHeight(20),
                marginTop: responsiveHeight(50),
              }}
            >
              <View
                style={{
                  width: '100%',
                  marginBottom: responsiveHeight(20),
                  flexDirection: 'row',
                }}
              >
                <FastImage
                  source={{
                    uri: API_URL + `/core/image?watch=${thumbnail}`,
                    priority: FastImage.priority.normal,
                  }}
                  style={{
                    width: responsiveWidth(80),
                    height: responsiveWidth(80),
                    borderRadius: responsiveWidth(12),
                    backgroundColor: Colors.screenBackground,
                    marginTop: -1 * responsiveHeight(50),
                  }}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: responsiveWidth(10),
                  }}
                >
                  <Text
                    style={[Fonts.contentLargeBold, { color: Colors.textBold }]}
                  >
                    {title}
                  </Text>
                  <Text
                    style={[
                      Fonts.contentRegularMedium,
                      {
                        color: Colors.textNormal,
                        marginLeft: responsiveWidth(5),
                      },
                    ]}
                  >
                    {category}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  marginBottom: responsiveHeight(10),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: responsiveWidth(35),
                  }}
                >
                  <View style={{ height: responsiveWidth(35) }}>
                    <Text
                      style={[
                        Fonts.contentMediumBold,
                        { color: Colors.textbold },
                      ]}
                    >
                      인원
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      width: responsiveWidth(35),
                      height: responsiveWidth(35),
                    }}
                    onPress={() =>
                      navigation.navigate('FindingUser', {
                        before: 'GroupDetail',
                        bandId: bandId,
                      })
                    }
                  >
                    <Image
                      source={Images.userPlus}
                      style={{
                        width: responsiveWidth(25),
                        height: responsiveWidth(25),
                        resizeMode: 'contain',
                        marginLeft: responsiveWidth(10),
                      }}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    vertical
                      ? {
                          flexDirection: 'column',
                        }
                      : { flexDirection: 'row', alignItems: 'center' },
                    {
                      marginTop: responsiveHeight(10),
                    },
                  ]}
                >
                  {groupMember &&
                    groupMember.map((member, index) => {
                      if (index > 2 && !vertical) return;
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: responsiveHeight(5),
                          }}
                        >
                          <Image
                            source={{
                              uri:
                                API_URL +
                                `/user/profile/image?watch=${member.profileImage}`,
                            }}
                            style={[
                              {
                                width: responsiveWidth(35),
                                height: responsiveWidth(35),
                                borderRadius: responsiveWidth(100),
                                backgroundColor: Colors.screenBackground,
                                marginRight: responsiveWidth(5),
                                resizeMode: 'cover',
                              },
                              vertical
                                ? { marginBottom: responsiveHeight(5) }
                                : {},
                            ]}
                          />
                          {vertical && (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}
                            >
                              <Text
                                style={[
                                  Fonts.contentMediumMedium,
                                  {
                                    color: Colors.textNormal,
                                    marginRight: responsiveWidth(5),
                                  },
                                ]}
                              >
                                {member.nickname}
                              </Text>

                              {member.owner && (
                                <SubmitButton2
                                  title={'방장'}
                                  width={responsiveWidth(35)}
                                  height={responsiveHeight(35)}
                                />
                              )}
                              {!member.invitationStatus && (
                                <SubmitButton3
                                  title={'초대 보냄'}
                                  width={responsiveWidth(70)}
                                  height={responsiveHeight(35)}
                                />
                              )}
                            </View>
                          )}
                        </View>
                      );
                    })}
                  {!vertical && groupMember && groupMember.length - 3 > 0 && (
                    <More count={groupMember.length - 3} />
                  )}

                  <Pressable
                    onPress={() => setVertical(!vertical)}
                    style={{
                      width: responsiveWidth(35),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={[
                        Fonts.contentRegualrMedium,
                        { color: Colors.textNormal },
                        vertical ? { marginTop: responsiveHeight(10) } : {},
                      ]}
                    >
                      {vertical ? '닫기' : '더보기'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                width: Dimensions.get('screen').width,
                backgroundColor: Colors.contentBackground,
                borderTopWidth: responsiveHeight(3),
                borderTopColor: Colors.screenBackground,
                borderBottomWidth: responsiveHeight(3),
                borderBottomColor: Colors.screenBackground,
              }}
            >
              <View
                style={{
                  width: '100%',
                  marginTop: responsiveHeight(10),
                  height: responsiveHeight(200),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: responsiveWidth(25),
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
                    style={{
                      marginLeft: responsiveWidth(10),
                    }}
                    onPress={() =>
                      navigation.navigate('SelectLocation', {
                        bandId: bandId,
                        category: category,
                        thumbnail: thumbnail,
                        members: members,
                        title: title,
                      })
                    }
                  >
                    <Image
                      source={Images.plus01}
                      style={{
                        width: responsiveWidth(25),
                        height: responsiveWidth(25),
                        borderRadius: responsiveWidth(30),
                      }}
                    />
                  </TouchableOpacity>
                </View>
                {meetingList && meetingList.length > 0 ? (
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
                      flex: 1,
                      backgroundColor: Colors.contentBackground,
                    }}
                  >
                    {meetingList.map((meeting, index) => (
                      <View
                        style={{
                          marginRight: responsiveWidth(10),
                          marginBottom: responsiveHeight(10),
                          justifyContent: 'center',
                        }}
                      >
                        <Meeting
                          {...meeting}
                          titleVisible={false}
                          onPress={() => {
                            navigation.navigate('MeetingDetail', {
                              ...meeting,
                              before: 'GroupDetail',
                              groupDetail: {
                                bandId,
                                category,
                                thumbnail,
                                members,
                                title,
                              },
                            });
                          }}
                        />
                      </View>
                    ))}
                  </ScrollView>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      // backgroundColor: 'black',
                    }}
                  >
                    <Text>예정된 미팅이 없습니다.</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: responsiveWidth(370),
              height: responsiveWidth(25),
              marginBottom: responsiveHeight(10),
              marginTop: responsiveHeight(10),
            }}
          >
            <Text
              style={[Fonts.contentMediumLargeBold, { color: Colors.textBold }]}
            >
              게시글
            </Text>

            <TouchableOpacity
              style={{
                marginLeft: responsiveWidth(10),
              }}
              onPress={() =>
                navigation.navigate('ChoosePic', {
                  ...route.params,
                })
              }
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
          {postList &&
            postList.length > 0 &&
            postList.map((post, index) => (
              <>
                <PostBox
                  key={index}
                  postId={post.postId}
                  writerName={post.nickname}
                  writerProfileImage={post.profileImage}
                  content={post.content}
                  mediaFiles={post.mediaFiles}
                  createdDate={post.createdDate}
                  commentCount={post.commentsCount}
                  now={now}
                  onPress={() =>
                    navigation.navigate('Detail', {
                      ...post,
                      before: 'Announcement',
                    })
                  }
                />
                <View
                  style={{
                    width: '100%',
                    height: responsiveHeight(10),
                    backgroundColor: Colors.screenBackground,
                  }}
                />
              </>
            ))}
        </View>
      </ScrollView>
    </>
  );
};

export default GroupDetail;
