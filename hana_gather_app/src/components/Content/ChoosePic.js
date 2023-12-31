import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useTheme } from '../../hooks';
import { responsiveWidth } from '../../utils/utils';
const ChoosePic = ({ onPress, cancel }) => {
  const [photos, setPhotos] = useState([]);
  const [galleryCursor, setGalleryCursor] = useState(null);
  const [array, setArray] = useState([]);
  const [last, setLast] = useState(false);
  const { Images, Colors, Fonts } = useTheme();

  useEffect(() => {
    const t = async () => {
      await getGalleryPhotos();
    };
    t();
  }, [array]);

  const convertLocalIdentifierToAssetLibrary = (localIdentifier, ext) => {
    const hash = localIdentifier.split('/')[0];
    return `assets-library://asset/asset.${ext}?id=${hash}&ext=${ext}`;
  };
  const getGalleryPhotos = async () => {
    if (last) {
      return;
    }
    const params = {
      //이미지를 불러올 개수 (최신순으로)
      first: 50,
      assetType: 'Photos',
      ...(galleryCursor && { after: galleryCursor }),
    };

    try {
      //사진을 불러옵니다. edges는 gallery photo에 대한 정보
      const { edges, page_info } = await CameraRoll.getPhotos(params);
      if (page_info.has_next_page) {
        setGalleryCursor(page_info.end_cursor);
      } else {
        setLast(true);
      }

      /*ios인 경우는 ph:// 형식으로 사진이 저장됩니다.
        이미지를 읽을 수 없는 오류가 생기기 때문에 변환 시켜줍니다.*/
      if (Platform.OS === 'ios') {
      }
      let arr = [];
      for (let e = 0; e < edges.length; e++) {
        let a = {
          id: e + 1,
          uri: edges[e].node.image.uri,
          // 기기 내부에서 접근 하기 위한 uri 생성
          accessUri:
            Platform.OS === 'ios'
              ? convertLocalIdentifierToAssetLibrary(
                  edges[e].node.image.uri.replace('ph://', ''),
                  edges[e].node.type === 'image' ? 'png' : 'mp4',
                )
              : '',
        };
        arr.push(a);
      }
      if (photos) {
        let b = photos;
        b = b.concat(arr);
        setPhotos(b);
      } else {
        setPhotos(arr);
      }
    } catch (error) {
      console.log('[takeStore getPhotos error occured] ', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      {/* 헤더*/}
      <View
        style={{
          flexDirection: 'row',
          height: '5%',
          backgroundColor: Colors.contentBackground,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          onPress={cancel}
        >
          <Text
            style={[
              Fonts.contentMediumMedium,
              {
                color: Colors.warn,
                marginLeft: responsiveWidth(10),
              },
            ]}
          >
            취소
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={[
              Fonts.contentMediumBold,
              {
                color: Colors.headerTitle,
              },
            ]}
          >
            사진선택
          </Text>
        </View>
        <View style={{ flex: 1 }}></View>
      </View>

      {/* 갤러리 사진 */}

      <FlatList
        data={photos}
        keyExtractor={item => item.id.toString()}
        onEndReached={getGalleryPhotos} // 스크롤이 끝나면 사진 불러오기 함수 호출
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View>
            <Pressable onPress={() => onPress(item)}>
              <Image
                source={{ uri: item.accessUri }}
                style={{
                  width: Dimensions.get('window').width / 4,
                  height: Dimensions.get('window').width / 4,
                }}
              />
            </Pressable>
          </View>
        )}
        numColumns={4}
        style={{ backgroundColor: Colors.white, flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default ChoosePic;
