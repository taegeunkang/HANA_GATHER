import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState } from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import ChoosePic from '../../components/Content/ChoosePic';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import InputBox from '../../components/InputBox';
import BackAlert from '../../components/Register/BackAlert';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const ProfileInit = ({ navigation, route }) => {
  const { before } = route.params || { before: null };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            setBackButton(true);
            setModalVisible(true);
          }}
        />
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={submit}
          style={{
            backgroundColor: Colors.transparent,
            width: responsiveWidth(60),
            height: responsiveHeight(30),
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={[
              Fonts.contentMediumBold,
              {
                color: Colors.primary,
              },
            ]}
          >
            완료
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  const { Fonts, Colors, Images } = useTheme();
  const [backButton, setBackButton] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [inpt, setInpt] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pic, setPic] = useState(null);
  const [defaultPic, setDefaultPic] = useState(false);
  const [empty, setEmpty] = useState(false);
  const nicknameCheck = async () => {
    if (inpt.length == 0) {
      setEmpty(true);
      return;
    }
    const response = await fetch(
      API_URL + `/user/nickname/duplicate?nickname=${inpt}`,
      {
        method: 'GET',
      },
    );
    switch (response.status) {
      case 200:
        return true;
      case 400:
        setEmpty(false);
        setDuplicate(true);
        return false;
    }
  };

  const submit = async () => {
    if (nicknameCheck()) {
      const formData = new FormData();
      if (pic != null) {
        formData.append('profileImage', {
          uri: pic.uri,
          name: 'profileImage.png',
          type: 'image/png',
        });
      }
      formData.append('nickname', inpt.toString());
      const response = await fetch(API_URL + `/user/profile/init`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
        body: formData,
      });
      switch (response.status) {
        case 200:
          navigation.navigate('PhoneVerification', { before: before });
          break;
        case 400:
          break;
      }
    }
  };

  const closeModal = item => {
    setPic(item);
    setDefaultPic(false);
    setPressed(false);
  };
  const showPic = () => {
    if (pic && !defaultPic) return pic.accessUri;
    else return API_URL + `/user/profile/image?watch=default-profile.png`;
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} animationType={'fade'} transparent={true}>
        <BackAlert
          title={'설정이 거의 완료되었습니다.\n 나가시겠습니까?'}
          cancle={() => setModalVisible(false)}
          go_back={() => {
            setModalVisible(false);
            AsyncStorage.removeItem('token');
            AsyncStorage.removeItem('refreshToken');
            AsyncStorage.removeItem('email');
            navigation.reset({ routes: [{ name: 'Login' }] });
          }}
        />
      </Modal>

      <Modal visible={pressed} animationType={'slide'} transparent={true}>
        <ChoosePic onPress={closeModal} cancel={() => setPressed(false)} />
      </Modal>
      <View
        style={{
          width: '100%',
          height: responsiveHeight(250),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={{
            uri: showPic(),
          }}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(100),
            borderRadius: responsiveWidth(12),
            backgroundColor: Colors.screenBackground,
          }}
        />
      </View>

      <SubmitButton title={'사진 선택하기'} onPress={() => setPressed(true)} />
      <View
        style={{ width: responsiveWidth(370), marginTop: responsiveHeight(10) }}
      >
        <TouchableOpacity
          onPress={() => {
            setDefaultPic(true);
            setPic(null);
          }}
        >
          <Text
            style={[
              Fonts.contentMediumMedium,
              {
                color: Colors.navNotSelect,
              },
            ]}
          >
            기본 이미지 선택
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: responsiveHeight(50) }} />
      <InputBox
        title={'닉네임'}
        placeholder={'닉네임 입력'}
        value={inpt}
        onChangeText={e => {
          setInpt(e.toLowerCase());
          setEmpty(false);
        }}
        maxLength={10}
        isWrong={duplicate || empty}
      />

      {empty && (
        <View
          style={{
            width: responsiveWidth(370),
            alignItems: 'flex-start',
            marginTop: responsiveHeight(5),
          }}
        >
          <Text
            style={[
              Fonts.contentRegualrMedium,
              {
                color: Colors.warn,
              },
            ]}
          >
            {'닉네임은 공백일 수 없습니다.'}
          </Text>
        </View>
      )}
      {duplicate && (
        <View
          style={{
            width: responsiveWidth(370),
            alignItems: 'flex-start',
            marginTop: responsiveHeight(5),
          }}
        >
          <Text
            style={[
              Fonts.contentRegualrMedium,
              {
                color: Colors.warn,
              },
            ]}
          >
            {'이미 사용중인 닉네임입니다.'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileInit;
