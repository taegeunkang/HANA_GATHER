import { useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import InputBox from '../../components/InputBox';
import SubmitButton from '../../components/SubmitButton';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
const InputAmount = ({ navigation, route }) => {
  const { email, nickname, profileImage, accountNumber } = route.params;
  const { Colors, Fonts, Images } = useTheme();
  const [amount, setAmount] = useState(null);
  const inputRef = useRef(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
      alignItems: 'center',
    },
  });
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        inputRef.current.blur();
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ width: responsiveWidth(370), flex: 1 }}>
          <Text
            style={[
              Fonts.contentRegularBold,
              { marginVertical: responsiveHeight(10) },
            ]}
          >
            받는 사람
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              source={{
                uri: API_URL + `/user/profile/image?watch=${profileImage}`,
                priority: FastImage.priority.normal,
              }}
              style={{
                width: responsiveWidth(45),
                height: responsiveHeight(45),
                borderRadius: 300,
                backgroundColor: Colors.screenBackground,
                resizeMode: 'cover',
                marginRight: responsiveWidth(10),
              }}
            />

            <Text style={[Fonts.contentMediumBold, { color: Colors.textBold }]}>
              {nickname}
            </Text>
          </View>
          <View style={{ marginTop: responsiveHeight(20) }} />
          <InputBox
            title={'금액'}
            placeholder={'금액 입력'}
            value={amount}
            onChangeText={e => setAmount(e)}
            keyboardType="numeric"
            ref={inputRef}
          />

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingBottom: responsiveHeight(10),
            }}
          >
            <SubmitButton
              title={'이체'}
              onPress={() =>
                navigation.push('TransferConfirm', {
                  email: email,
                  nickname: nickname,
                  profileImage: profileImage,
                  amount: amount,
                  accountNumber: accountNumber,
                  before: 'MyPage',
                })
              }
            />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default InputAmount;
