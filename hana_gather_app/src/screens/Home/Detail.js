import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Reply from '../../components/Content/Reply';
import ReplyReply from '../../components/Content/ReplyReply';
import Slider from '../../components/Content/Slider';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';
import {
  calcKeyboardHeight,
  responsiveHeight,
  responsiveWidth,
  timeAgo,
} from '../../utils/utils';
const Detail = ({ navigation, route }) => {
  const {
    postId,
    nickname,
    profileImage,
    content,
    mediaFiles,
    commentsCount,
    createdDate,
    memberId,
    before,
  } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            // if (reload != null) reload();
            navigation.pop();
          }}
          close={before == 'Home' || before == 'Alram' ? true : false}
        />
      ),
    });
  });
  const [now, setNow] = useState(new Date());
  const [myId, setMyId] = useState(null);
  const [myProfile, setMyProfile] = useState(null);
  const [commentCount, setCommentCount] = useState(commentsCount);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  // const [replyList, setReplyList] = useState({});
  const [page, setPage] = useState(0);
  const [inpt, setInpt] = useState('');
  const [modlaVisible, setModalVisible] = useState(false);
  const [replyModalVisible, setReplyModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] = useState(-1);
  const [selectedReply, setSelectedReply] = useState(-1);
  const [postModalVisible, setPostModalVisible] = useState(false);

  const [replyList, setReplyList] = useState([]);
  const [replyListPage, setReplyListPage] = useState(0);
  const [replyListSize, setReplyListSize] = useState(20);
  const [replyListLoading, setReplyListLoading] = useState(false);

  const [reReply, setReReply] = useState(null);

  const [reReplyList, setReReplyList] = useState({});
  const [reReplyListPage, setReReplyListPage] = useState(0);
  const [reReplyListSize, setReReplyListSize] = useState(20);
  const [reReplyListLoading, setReReplyListLoading] = useState(false);

  const [reReplyPage, setReReplyPage] = useState({});
  const [reReplyLoading, setReReplyLoading] = useState(false);
  const { Colors, Fonts, Images } = useTheme();
  const inptRef = useRef(null);

  const onRefresh = async () => {
    if (refreshing) return;

    setRefreshing(true);

    await initReply();
    setReplyListPage(0);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const initReply = async () => {
    setReplyListLoading(true);
    const response = await fetch(
      API_URL +
        `/core/band/post/reply/list?postId=${postId}&page=${0}&size=${replyListSize}`,
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
        setReplyList(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initReply();
            break;
        }
    }

    setReplyListLoading(false);
  };

  // 댓글 조회
  const fetchReply = async () => {
    setReplyListLoading(true);
    const response = await fetch(
      API_URL +
        `/core/band/post/reply/list?postId=${postId}&page=${
          replyListPage + 1
        }&size=${replyListSize}`,
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

        if (r.length > 0) setReplyListPage(replyListPage + 1);

        let a = replyList;
        a = a.concat(r);
        setReplyList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'P01':
            Alert.alert(
              '게시글이 존재하지 않음',
              '게시글이 존재하지 않습니다.',
            );
            navigation.pop();
          case 'U08':
            await reIssue();
            await fetchReply();
            break;
        }
    }

    setReplyListLoading(false);
  };

  const submitComment = async () => {
    if (!inpt || inpt.length == 0) return;
    const bodyItem = { postId: postId, content: inpt };

    if (reReply) bodyItem.reReplyId = reReply;

    const response = await fetch(API_URL + '/core/band/post/reply/create', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyItem),
    });
    if (response.status == 200) {
      // 새로고침하기 전에 수동으로 댓글을 넣어둠
      // 댓글일 때
      const rId = await response.json();
      if (!reReply) {
        let a = replyList;
        let b = {
          replyId: rId,
          reReplyId: null,
          content: inpt,
          writer: myProfile.email,
          writerNickname: myProfile.nickname,
          profileImage: myProfile.profileImage,
          reReplyCount: 0,
          createdDate: new Date().toISOString().replace('Z', '+00:00'),
        };
        a = a.concat(b);
        setReplyList(a);
      } else {
        // 대댓글
        let c = reReplyList;
        if (!c[reReply]) c[reReply] = [];
        let d = {
          replyId: rId,
          reReplyId: reReply,
          content: inpt,
          writer: myProfile.email,
          writerNickname: myProfile.nickname,
          profileImage: myProfile.profileImage,
          reReplyCount: null,
          createdDate: new Date().toISOString().replace('Z', '+00:00'),
        };
        c[reReply] = c[reReply].concat(d);
        setReReplyList(c);
      }
      setCommentCount(commentCount + 1);
      setInpt('');
    } else if (response.status == 400) {
      const k = await response.json();
      switch (k['code']) {
        case 'U08':
          await reIssue();
          await submitComment();
          break;
      }
    }

    setNow(new Date());
  };

  const getReReply = async replyId => {
    setReReplyLoading(true);
    let n = reReplyPage;
    if (!n.replyId) {
      // 첫 호출이라면 페이지 초기화
      n = { ...reReplyPage, [replyId]: -1 };
      setReReplyPage({ ...reReplyPage, [replyId]: -1 });
    }

    const response = await fetch(
      API_URL +
        `/core/band/post/reply/re/list?postId=${postId}&replyId=${replyId}&page=${
          n[replyId] + 1
        }&size=${20}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );
    if (response.status == 200) {
      const r = await response.json();
      // 페이지 늘림
      if (r.length > 0) {
        setReReplyPage({ ...n, [replyId]: n[replyId] + 1 });
      }

      if (!reReplyList[replyId]) {
        setReReplyList({ ...reReplyList, [replyId]: r });
      } else {
        let c1 = reReplyList;
        c1[replyId] = c1[replyId].concat(r);
        setReReplyList(c1);
      }
    } else if (response.status == 400) {
      const k = await response.json();
      switch (k.code) {
        case 'U08':
          await reIssue();
          await getReReply(replyId);
          break;
      }
    }

    setReReplyLoading(false);
  };

  const init = async () => {
    setMyId(await AsyncStorage.getItem('email'));
    await getMyProfile();
    await initReply();
  };

  const getMyProfile = async () => {
    const response = await fetch(API_URL + '/user/profile', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
    });

    switch (response.status) {
      case 200:
        const r = await response.json();
        setMyProfile(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await getMyProfile();
        }
        break;
    }
  };

  useEffect(() => {
    init();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
      marginBottom: responsiveHeight(10),
    },
    postContainer: { width: responsiveWidth(370) },
    writerImage: {
      width: responsiveWidth(30),
      height: responsiveWidth(30),
      borderRadius: responsiveWidth(100),
      marginRight: responsiveWidth(5),
    },
    writerBox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: responsiveHeight(45),
    },
    media: {
      width: responsiveWidth(35),
      height: responsiveHeight(35),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.buttonThirdBackground,
      borderRadius: responsiveWidth(10),
      marginRight: responsiveWidth(5),
    },

    loginInput: {
      height: responsiveHeight(48),
      width: responsiveWidth(370),
      borderRadius: responsiveWidth(12),
      backgroundColor: Colors.screenBackground,
      paddingHorizontal: responsiveWidth(10),
      color: Colors.textNormal,
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
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.contentBackground,
          alignItems: 'center',
        }}
      >
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
          onScroll={({ nativeEvent }) => {
            if (reReplyListLoading) return;
            const isCloseToBottom =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - responsiveHeight(30);
            if (isCloseToBottom) {
              fetchReply();
            }
          }}
          scrollEventThrottle={400}
        >
          <View style={styles.container}>
            <View style={styles.postContainer}>
              <View style={styles.writerBox}>
                <Pressable
                  style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                  <FastImage
                    source={{
                      uri:
                        API_URL + `/user/profile/image?watch=${profileImage}`,
                      priority: FastImage.priority.high,
                    }}
                    style={styles.writerImage}
                  />
                  <Text
                    style={[
                      Fonts.contentMediumBold,
                      {
                        marginRight: responsiveWidth(5),
                        color: Colors.textNormal,
                      },
                    ]}
                  >
                    {nickname}
                  </Text>
                  <Text
                    style={[
                      Fonts.contentRegualrMedium,
                      { color: Colors.textNormal },
                    ]}
                  >
                    {timeAgo(now, createdDate)}
                  </Text>
                </Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {myId == memberId && (
                    <Pressable
                      onPress={() => setPostModalVisible(true)}
                      style={{
                        width: responsiveWidth(25),
                        height: responsiveWidth(25),
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Image
                        source={Images.more}
                        style={{
                          width: responsiveWidth(15),
                          height: responsiveWidth(15),
                          resizeMode: 'contain',
                        }}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
              {/* 본문 글 최대 500자 */}
              <Text
                style={[
                  Fonts.contentMediumMedium,
                  { width: responsiveWidth(370), color: Colors.textNormal },
                ]}
              >
                {content}
              </Text>
              <View style={{ marginTop: responsiveHeight(10) }} />

              {/* 첨부 파일*/}
              {mediaFiles.length > 0 && (
                <View
                  style={{
                    width: responsiveWidth(370),
                    height: responsiveWidth(370),
                  }}
                >
                  <Slider media={mediaFiles} />
                </View>
              )}
              <View style={{ marginBottom: responsiveHeight(20) }} />
              {/* 좋아요, 댓글, 위치*/}
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: responsiveHeight(5),
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    marginRight: responsiveWidth(10),
                  }}
                >
                  <Text
                    style={[
                      Fonts.contentMediumMedium,
                      { color: Colors.textNormal },
                    ]}
                  >
                    댓글 {formatNumber(commentCount)} 개
                  </Text>
                </View>
              </View>
            </View>
            {replyList &&
              replyList.map((reply, index) => {
                return (
                  <>
                    <Reply
                      key={index}
                      writerId={reply.writer}
                      commentId={reply.replyId}
                      nickname={reply.writerNickname}
                      profileImage={reply.profileImage}
                      createdDate={reply.createdDate}
                      content={reply.content}
                      replyCount={reply.reReplyCount}
                      showReply={getReReply}
                      now={now}
                      onPress={() => {
                        setModalVisible(true);
                        setSelectedComment(reply.replyId);
                      }}
                      onReplyPress={() => {
                        setReReply(reply.replyId);
                        inptRef.current.focus();
                      }}
                    />
                    {reReplyList[reply.replyId] &&
                      reReplyList[reply.replyId].map((r, index1) => {
                        return (
                          <ReplyReply
                            key={index1}
                            commentId={r.replyId}
                            nickname={r.writerNickname}
                            writerId={r.writer}
                            profileImage={r.profileImage}
                            content={r.content}
                            now={now}
                            createdDate={r.createdDate}
                            onPress={() => {
                              setReplyModalVisible(true);
                              setSelectedComment(reply.replyId);
                              setSelectedReply(r.replyId);
                            }}
                            onReplyPress={() => {
                              setReReply(reply.replyId);
                              inptRef.current.focus();
                            }}
                          />
                        );
                      })}
                    {reReplyList[reply.replyId] &&
                      reply.reReplyCount >
                        reReplyList[reply.replyId].length && (
                        <Pressable
                          onPress={() => getReReply(reply.replyId)}
                          style={{
                            width: '100%',
                            height: responsiveHeight(20),
                          }}
                        >
                          <Text
                            style={[
                              Fonts.contentRegualrMedium,
                              { marginLeft: responsiveWidth(30) },
                            ]}
                          >
                            더보기
                          </Text>
                        </Pressable>
                      )}
                  </>
                );
              })}

            <View style={{ height: responsiveHeight(70) }} />

            {/* {loading && (
            <View style={{marginVertical: responsiveHeight(30)}}>
              <ActivityIndicator color={'#4880EE'} size={'large'} />
            </View>
          )} */}
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            // position: 'absolute',
            // bottom: responsiveHeight(15),
            height: responsiveHeight(70),
            backgroundColor: Colors.contentBackground,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 400,
          }}
        >
          {/* 댓글 최대 150자*/}
          <TextInput
            style={[Fonts.contentRegualrMedium, styles.loginInput]}
            placeholder={'댓글 입력'}
            placeholderTextColor={Colors.inputPlaceHolder}
            onChangeText={e => setInpt(e)}
            value={inpt}
            // keyboardType={keyboardType}
            maxLength={150}
            onSubmitEditing={() => submitComment()}
            // editable={!editable}
            ref={inptRef}
            onBlur={() => setReReply(null)}
          />
        </View>
        {/* <Modal
          visible={replyModalVisible}
          animationType={'fade'}
          transparent={true}
        >
          <EditComment
            deleteComment={() => {
              deleteReply();
              setReplyModalVisible(false);
            }}
            close={() => setReplyModalVisible(false)}
          />
        </Modal>
        <Modal visible={modlaVisible} animationType={'fade'} transparent={true}>
          <EditComment
            deleteComment={() => {
              deleteComment();
              setModalVisible(false);
            }}
            close={() => setModalVisible(false)}
          />
        </Modal>
        <Modal
          visible={postModalVisible}
          animationType={'fade'}
          transparent={true}
        >
          <EditComment
            deleteComment={() => {
              deletePost();
              setPostModalVisible(false);
            }}
            close={() => setPostModalVisible(false)}
          />
        </Modal> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const formatNumber = num => {
  if (num >= 1e9) {
    // 1,000,000,000 이상 (십억 이상)
    return (num / 1e9).toFixed(1) + 'b';
  } else if (num >= 1e6) {
    // 1,000,000 이상 (백만 이상)
    return (num / 1e6).toFixed(1) + 'm';
  } else if (num >= 1e3) {
    // 1,000 이상
    return (num / 1e3).toFixed(1) + 'k';
  } else {
    return num.toString();
  }
};

export default Detail;
