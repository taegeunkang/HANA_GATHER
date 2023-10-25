import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth, timeAgo } from '../../utils/utils';

const ReplyReply = ({
  commentId,
  nickname,
  writerId,
  profileImage,
  createdDate,
  content,
  now,
  onPress,
  onReplyPress,
}) => {
  const { Fonts, Images, Colors } = useTheme();
  const [myId, setMyId] = useState(null);
  const init = async () => {
    setMyId(await AsyncStorage.getItem('email'));
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <FastImage
              source={{
                uri: API_URL + `/user/profile/image?watch=${profileImage}`,
                priority: FastImage.priority.high,
              }}
              style={{
                width: responsiveWidth(25),
                height: responsiveWidth(25),
                borderRadius: responsiveWidth(100),
                marginRight: responsiveWidth(5),
              }}
            />
            <Text style={[Fonts.contentMediumBold, { color: Colors.textBold }]}>
              {nickname}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <Text
              style={[
                Fonts.contentRegualrMedium,
                { marginRight: responsiveWidth(10), color: Colors.textNormal },
              ]}
            >
              {timeAgo(now, createdDate)}
            </Text>
            {myId == writerId && (
              <Pressable
                onPress={onPress}
                style={{
                  width: responsiveWidth(20),
                  height: responsiveHeight(20),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={Images.more}
                  style={{
                    width: responsiveWidth(15),
                    height: responsiveHeight(15),
                    resizeMode: 'contain',
                  }}
                />
              </Pressable>
            )}
          </View>
        </View>
        <View
          style={{
            width: responsiveWidth(270),
            marginLeft: responsiveWidth(10),
          }}
        >
          <Text
            style={[Fonts.contentMediumMedium, { color: Colors.textNormal }]}
          >
            {content}
          </Text>

          {/* 답글 작성 &  대댓글 있으면 개수 표시 및 더보기 */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: responsiveHeight(5),
            }}
          >
            <Pressable onPress={onReplyPress}>
              <Text
                style={[
                  Fonts.contentRegularRegualr,
                  { color: Colors.textNormal },
                ]}
              >
                답글 달기
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: responsiveHeight(70),
    alignItems: 'flex-end',
    marginTop: responsiveHeight(10),
  },
  content: {
    width: responsiveWidth(340),
    alignItems: 'center',
    marginLeft: responsiveWidth(10),
  },
});

export default ReplyReply;
