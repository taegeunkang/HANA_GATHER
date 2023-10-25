import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import * as RNFS from 'react-native-fs';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';

const WriteContent = ({ navigation, route }) => {
  const [text, setText] = useState('');
  const { t } = useTranslation('newPost');
  const [media, setMeida] = useState(null);
  const { bandId, category, thumbnail, members, title, mediaFiles } =
    route.params || {
      bandId: null,
      category: null,
      thumbnail: null,
      members: null,
      title: null,
      mediaFiles: null,
    };
  const { Images, Fonts, Colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const inptRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            width: responsiveWidth(35),
            height: responsiveHeight(35),
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
          }}
          onPress={submitPost}
        >
          <Text style={[Fonts.contentMeidumMedium, { color: Colors.primary }]}>
            완료
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  useEffect(() => {
    checkRefreshMediaFiles();
  });

  const checkRefreshMediaFiles = () => {
    if (mediaFiles) {
      setMeida(mediaFiles);
    }
  };

  const getAbsolutePath = async assetPath => {
    const destination = `${RNFS.TemporaryDirectoryPath}${Math.random()
      .toString(36)
      .substring(7)}.mp4`;
    try {
      let absolutePath = await RNFS.copyAssetsVideoIOS(
        assetPath,
        destination,
        0,
        0,
      );
      return absolutePath;
    } catch (error) {
      console.log(error);
    }
  };

  // 포스트 제출
  const submitPost = async () => {
    if (text.trim().length == 0) {
      Alert.alert('내용을 입력해 주세요.');
      return;
    }
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    const formData = new FormData();
    let m = []; // 미디어 파일들
    let thumbnails = [];
    formData.append('content', text); // 글 내용
    formData.append('bandId', bandId);
    if (media) {
      for (let i = 0; i < media.length; i++) {
        const med = media[i];
        if (med.accessUri.substring(med.accessUri.length - 3) === 'mp4') {
          const absolutePath = await getAbsolutePath(med.uri);
          m.push({ uri: absolutePath, type: 'video/mp4', name: `video${i}` });
          thumbnails.push({
            uri: med.accessUri,
            typ: 'image/png',
            name: `thumbnailFiles${i}`,
          });
        } else {
          m.push({ uri: med.accessUri, type: 'image/png', name: `image${i}` });
        }
      }

      m.forEach((mm, index) => {
        formData.append('mediaFiles', mm);
      });

      thumbnails.forEach((t, index) => {
        formData.append('thumbnailFiles', t);
      });
    }

    const response = await fetch(API_URL + '/core/band/post/create', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    });
    if (response.status == 200) {
      navigation.navigate('GroupDetail', {
        bandId: bandId,
        category: category,
        thumbnail: thumbnail,
        members: members,
        title: title,
      });
    } else if (response.status == 400) {
      const k = await response.json();
      switch (k['code']) {
        case 'U08':
          await reIssue();
          await submitPost();
          break;
      }
    }

    setLoading(false);
  };

  const styles = StyleSheet.create({
    imageContainer: {
      width: responsiveWidth(100),
      height: responsiveHeight(100),
      borderRadius: responsiveWidth(12),
      marginRight: responsiveWidth(5),
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    listContent: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginBottom: responsiveHeight(10),
    },
    friendsList: {
      width: '100%',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginBottom: responsiveHeight(10),
    },
    friendsImage: {
      width: responsiveWidth(35),
      height: responsiveWidth(35),
      borderRadius: responsiveWidth(8),
      marginRight: responsiveWidth(5),
    },
  });

  return (
    <View style={{ flex: 1, backgroundColor: Colors.contentBackground }}>
      <View style={styles.inptContainer}>
        {media && media.length > 0 && (
          <ScrollView
            horizontal={true}
            style={{ paddingHorizontal: responsiveWidth(10) }}
          >
            <View
              style={{
                flexDirection: 'row',
                height: responsiveHeight(130),
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              {media.map((m, index) => (
                <Image
                  key={index}
                  style={{
                    width: responsiveWidth(95),
                    height: responsiveWidth(95),
                    borderRadius: responsiveWidth(12),
                    marginRight: responsiveWidth(5),
                  }}
                  source={{ uri: m.uri }}
                />
              ))}
            </View>
          </ScrollView>
        )}

        <View style={{ marginTop: responsiveHeight(10) }} />

        <View
          style={{
            width: '100%',
            height: responsiveHeight(180),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.screenBackground,
            marginBottom: responsiveHeight(20),
          }}
        >
          <TextInput
            value={text}
            placeholder={t('write.content.placeholder')}
            placeholderTextColor={Colors.inputPlaceHolder}
            multiline={true}
            style={[
              Fonts.contentMediumMedium,
              {
                width: responsiveWidth(370),
                height: responsiveHeight(160),
                textAlignVertical: 'top',
                color: Colors.textNormal,
                backgroundColor: Colors.contentBackground,
                borderRadius: responsiveWidth(12),
                paddingVertical: responsiveHeight(10),
                paddingHorizontal: responsiveWidth(10),
              },
            ]}
            onChangeText={e => setText(e)}
            ref={inptRef}
            maxLength={500}
          />
        </View>
      </View>
    </View>
  );
};

export default WriteContent;
