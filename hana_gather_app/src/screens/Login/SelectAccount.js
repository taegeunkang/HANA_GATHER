import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLayoutEffect, useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import BackAlert from '../../components/Register/BackAlert';
import SubmitButton3 from '../../components/SubmitButton3';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';
const SelectAccount = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            setModalVisible(true);
          }}
        />
      ),
    });
  });
  const { account, balance } = route.params;
  const { Colors, Fonts, Images } = useTheme();
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const submit = async () => {
    const response = await fetch(
      API_URL + `/core/profile/account/connect?account=${account}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );
    switch (response.status) {
      case 200:
        navigation.navigate('Congraturation', {
          title: '축하합니다!',
          description: '하나모여를 사용할 준비를 완료했습니다.',
          destination: 'MainNavigator',
        });
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await submit();
            break;
        }
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: Colors.contentBackground,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={modalVisible} animationType={'fade'} transparent={true}>
        <BackAlert
          cancle={() => setModalVisible(false)}
          go_back={() => {
            setModalVisible(false);
            navigation.reset({ routes: [{ name: 'Login' }] });
          }}
          title={'설정이 거의 완료되었습니다.'}
          description={
            '설정이 완료되지 않으면 서비스 이용이 불가능합니다.\n 나가시겠습니까?'
          }
        />
      </Modal>
      <View
        style={{
          width: responsiveWidth(370),
          marginTop: responsiveHeight(50),
        }}
      >
        <Text style={Fonts.contentLargeBold}>계좌 1개를 찾았습니다.</Text>
        <Text style={Fonts.contentLargeBold}>연동할 계좌를 선택해 주세요.</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: responsiveWidth(370),
            marginTop: responsiveHeight(20),
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={Images.bank}
              style={{
                width: responsiveWidth(35),
                height: responsiveHeight(35),
                marginRight: responsiveWidth(5),
              }}
            />
            <View>
              <Text style={Fonts.contentMediumMedium}>{account}</Text>
              <Text style={Fonts.contentMediumMedium}>{balance}원</Text>
            </View>
          </View>

          <SubmitButton3
            title={'선택'}
            width={responsiveWidth(40)}
            height={responsiveHeight(40)}
            onPress={submit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SelectAccount;
