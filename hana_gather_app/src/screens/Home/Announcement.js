import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import PostBox from '../../components/Content/PostBox';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';
const Announcement = ({ navigation, route }) => {
  const { Fonts, Colors, Images } = useTheme();
  const { bandId } = route.params || { bandId: null };
  const [postList, setPostList] = useState([]);
  const [postListPage, setPostListPage] = useState(0);
  const [postListPageSize, setPostListPageSize] = useState(20);
  const [postListLoading, setPostListLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [now, setNow] = useState(new Date());

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

  const onRefresh = async () => {
    setRefreshing(true);
    await initPostList();
    setPostListPage(0);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    initPostList();
  }, []);

  return (
    <View style={{ position: 'relative', flex: 1 }}>
      {postList && postList.length > 0 && (
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
              style={{ backgroundColor: Colors.screenBackground }}
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
          {postList.map((post, index) => (
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
          ))}
        </ScrollView>
      )}
      <View
        style={{
          position: 'absolute',
          bottom: responsiveHeight(20),
          right: responsiveWidth(10),
        }}
      >
        <SubmitButton
          width={65}
          height={40}
          title={'글 작성'}
          onPress={() => navigation.navigate('ChoosePic', { bandId: bandId })}
        />
      </View>
    </View>
  );
};

export default Announcement;
