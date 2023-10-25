import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import SubmitButton from '../SubmitButton';
import SubmitButton2 from '../SubmitButton2';
import SubmitButton3 from '../SubmitButton3';
import { reIssue } from '../../utils/login';
const BandCell = ({ bandId, title, category, thumbnail, status }) => {
  const [applyStatus, setApplyStatus] = useState(status);
  const { Images, Fonts, Colors } = useTheme();

  const apply = async () => {
    const response = await fetch(
      API_URL + `/core/band/apply?bandId=${bandId}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );

    switch (response.status) {
      case 200:
        setApplyStatus(2);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await apply();
            break;
        }
    }
  };

  const statusButton = () => {
    switch (applyStatus) {
      case 0:
        return (
          <SubmitButton
            title={'가입신청'}
            width={60}
            height={35}
            onPress={apply}
          />
        );
      case 1:
        return <SubmitButton2 title={'참여중'} width={60} height={35} />;
      case 2:
        return <SubmitButton3 title={'대기중'} width={60} height={35} />;
    }
  };

  // useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: API_URL + `/core/image?watch=${thumbnail}` }}
          style={{
            width: responsiveWidth(35),
            height: responsiveWidth(35),
            borderRadius: responsiveWidth(12),

            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        <Text
          style={[
            Fonts.contentMediumBold,
            { color: Colors.textBold, marginLeft: responsiveWidth(5) },
          ]}
        >
          {title}・
        </Text>
        <Text style={[Fonts.contentMediumMedium, { color: Colors.textNormal }]}>
          {category}
        </Text>
      </View>
      {statusButton()}
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
export default BandCell;
