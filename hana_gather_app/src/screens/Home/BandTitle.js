import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState } from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ChoosePic from '../../components/Content/ChoosePic';
import Edit from '../../components/Content/Edit';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import InputBox from '../../components/InputBox';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';
const BandTitle = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
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
  const { category } = route.params || { category: null };
  const { Fonts, Colors, Images } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [inpt, setInpt] = useState('');
  const [duplicate, setDuplicate] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [pic, setPic] = useState(null);
  const [defaultPic, setDefaultPic] = useState(false);
  const [empty, setEmpty] = useState(false);

  const submit = async () => {
    const formData = new FormData();
    if (pic != null) {
      formData.append('bandImage', {
        uri: pic.uri,
        name: 'profileImage.png',
        type: 'image/png',
      });
    }
    formData.append('title', inpt.toString());
    if (category) {
      formData.append('category', category);
    }
    const response = await fetch(API_URL + `/core/band/create`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
      },
      body: formData,
    });
    switch (response.status) {
      case 200:
        navigation.navigate('Home');
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await submit();
            break;
        }
        break;
    }
  };

  const closeModal = item => {
    setPic(item);
    setDefaultPic(false);
    setPressed(false);
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
      <Modal visible={pressed} animationType={'slide'} transparent={true}>
        <ChoosePic onPress={closeModal} cancel={() => setPressed(false)} />
      </Modal>

      <Modal visible={modalVisible} animationType={'fade'} transparent={true}>
        <Edit
          setProfileImage={() => {
            setModalVisible(false);
            setPressed(true);
          }}
          reset={() => {
            setModalVisible(false);
            setDefaultPic(true);
            setPic(null);
          }}
          close={() => setModalVisible(false)}
        />
      </Modal>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: responsiveHeight(50),
        }}
      >
        <InputBox
          title={'그룹 이름'}
          placeholder={'그룹 이름 입력'}
          value={inpt}
          onChangeText={e => {
            setInpt(e.toLowerCase());
            setEmpty(false);
          }}
          maxLength={20}
          isWrong={duplicate || empty}
        />
        <Pressable
          style={{
            width: '100%',
            height: responsiveHeight(150),
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: responsiveHeight(20),
          }}
          onPress={() => setModalVisible(true)}
        >
          {pic && !defaultPic ? (
            <Image
              source={{ uri: pic.accessUri }}
              style={{
                width: responsiveWidth(125),
                height: responsiveWidth(125),
                borderRadius: responsiveWidth(12),
                backgroundColor: Colors.screenBackground,
              }}
            />
          ) : (
            <View
              style={{
                width: responsiveWidth(125),
                height: responsiveWidth(125),
                borderRadius: responsiveWidth(12),
                backgroundColor: Colors.screenBackground,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={Images.camera}
                style={{
                  width: responsiveWidth(35),
                  height: responsiveHeight(35),
                  backgroundColor: Colors.screenBackground,
                  resizeMode: 'contain',
                }}
              />
              <Text
                style={[Fonts.contentMediumBold, { color: Colors.textNormal }]}
              >
                사진 추가
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default BandTitle;
