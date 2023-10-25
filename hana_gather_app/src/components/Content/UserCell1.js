import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import SubmitButton from '../SubmitButton';
import SubmitButton2 from '../SubmitButton2';
import SubmitButton3 from '../SubmitButton3';
const UserCell1 = ({
  profileImage,
  nickname,
  onAdd,
  onSub,
  isAdded,
  isContained,
}) => {
  const { Fonts, Colors } = useTheme();
  const [added, setAdded] = useState(isAdded);
  const [contained, setContained] = useState(isContained ? isContained : 0);

  const addPress = () => {
    onAdd();
    setAdded(true);
  };
  const subPress = () => {
    onSub();
    setAdded(false);
  };

  const getStatusButton = () => {
    switch (contained) {
      case 0:
        return added ? (
          <SubmitButton3
            title={'제거'}
            width={35}
            height={35}
            onPress={subPress}
          />
        ) : (
          <SubmitButton2
            title={'선택'}
            width={35}
            height={35}
            onPress={addPress}
          />
        );
      case 1:
        return <SubmitButton title={'참여 중'} width={60} height={35} />;
      case 2:
        return <SubmitButton3 title={'초대 보냄'} width={60} height={35} />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <FastImage
          source={{
            uri: API_URL + `/user/profile/image?watch=${profileImage}`,
            priority: FastImage.priority.normal,
          }}
          style={{
            width: responsiveWidth(35),
            height: responsiveHeight(35),
            borderRadius: responsiveWidth(100),
          }}
        />

        <Text
          style={[
            Fonts.contentMediumMedium,
            { color: Colors.textNormal, marginLeft: responsiveWidth(5) },
          ]}
        >
          {nickname}
        </Text>
      </View>
      {getStatusButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: responsiveWidth(370),
    height: responsiveHeight(45),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default UserCell1;
