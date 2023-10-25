import { View, StyleSheet, Text, Image, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import SubmitButton2 from '../SubmitButton2';
import SubmitButton from '../SubmitButton';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { useTheme } from '../../hooks';
import { useEffect, useState } from 'react';
import { API_URL } from '../../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import { reIssue } from '../../utils/login';

const Invitation = ({ bandId, onCancle }) => {
  const { t } = useTranslation('register');
  const { Fonts, Colors, BorderRadius } = useTheme();
  const [info, setInfo] = useState(null);

  const fetchBandStatus = async () => {
    const response = await fetch(
      API_URL + `/core/band/status?bandId=${bandId}`,
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
        setInfo(r);
        break;
      case 400:
        const r1 = await response.json();
        switch (r1.code) {
          case 'C01':
            Alert.alert('이미 가입한 그룹입니다.');
            onCancle();
          case 'U08':
            await reIssue();
            await fetchBandStatus();
            break;
        }

        break;
    }
  };

  const acceptInvitation = async () => {
    const response = await fetch(
      API_URL + `/core/band/invitation/reply?bandId=${bandId}&answer=${true}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );
    switch (response.status) {
      case 200:
        onCancle();
        break;
      case 400:
        const r1 = await response.json();
        switch (r1.code) {
          case 'U08':
            await reIssue();
            await acceptInvitation();
            break;
        }
    }
  };

  useEffect(() => {
    fetchBandStatus();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0, 0.3)',
      justifyContent: 'flex-end',
    },
    popUp: {
      width: '100%',
      height: '35%',
      backgroundColor: Colors.contentBackground,
      borderTopLeftRadius: BorderRadius.xLarge,
      borderTopRightRadius: BorderRadius.xLarge,
    },
    content: {
      paddingVertical: responsiveHeight(20),
      paddingHorizontal: responsiveWidth(20),
    },
    buttonContainer: {
      flex: 1,
      backgroundColor: Colors.transparent,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      marginBottom: responsiveHeight(50),
      paddingHorizontal: responsiveWidth(10),
    },
  });

  return (
    <View style={styles.container}>
      {info && (
        <>
          <View style={styles.popUp}>
            <View style={styles.content}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={[
                    Fonts.contentLargeBold,
                    {
                      marginBottom: responsiveHeight(20),
                      color: Colors.textBold,
                      marginTop: responsiveHeight(10),
                    },
                  ]}
                >
                  {info.title}
                </Text>
                <Text
                  style={[
                    Fonts.contentMediumMedium,
                    { color: Colors.textNormal },
                  ]}
                >
                  {info.category}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                  style={[
                    Fonts.contentMediumBold,
                    { color: Colors.textBold, marginRight: responsiveWidth(5) },
                  ]}
                >
                  방장
                </Text>
                <FastImage
                  source={{
                    uri:
                      API_URL +
                      `/user/profile/image?watch=${info.ownerProfileImage}`,
                    priority: FastImage.priority.normal,
                  }}
                  style={{
                    width: responsiveWidth(35),
                    height: responsiveWidth(35),
                    borderRadius: responsiveWidth(100),
                    backgroundColor: Colors.screenBackground,
                    marginRight: responsiveWidth(5),
                    resizeMode: 'cover',
                  }}
                />

                <Text
                  style={[
                    Fonts.contentMediumMedium,
                    { color: Colors.textNormal },
                  ]}
                >
                  {info.ownerNickname}
                </Text>
              </View>
              <View style={{ marginTop: responsiveHeight(10) }}>
                <Text
                  style={[Fonts.contentMediumBold, { color: Colors.textBold }]}
                >
                  그룹에 참여하시겠습니까?
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <SubmitButton2
                onPress={onCancle}
                title={'취소'}
                width={170}
                height={50}
              />
              <SubmitButton
                onPress={acceptInvitation}
                title={'참여하기'}
                width={170}
                height={50}
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default Invitation;
