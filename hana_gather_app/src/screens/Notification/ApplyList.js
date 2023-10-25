import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import SubmitButton from '../../components/SubmitButton';
import SubmitButton2 from '../../components/SubmitButton2';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import { reIssue } from '../../utils/login';
const ApplyList = ({ navigation, route }) => {
  const { bandId } = route.params;
  const { Fonts, Colors } = useTheme();
  const [applyList, setApplyList] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const initApplyList = async () => {
    const response = await fetch(
      API_URL + `/core/band/apply/list?bandId=${bandId}&page=${0}&size=${size}`,
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
        setApplyList(r);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initApplyList();
            break;
        }
        break;
    }
  };
  const removeFromList = memberId => {
    const a = [];
    for (let i = 0; i < applyList.length; i++) {
      if (applyList[i].memberId == memberId) {
        continue;
      }
      a.push(applyList[i]);
    }
    setApplyList(a);
  };

  const reply = async (answer, memberId) => {
    const response = await fetch(
      API_URL +
        `/core/band/apply/reply?reply=${answer}&bandId=${bandId}&memberId=${memberId}`,
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        },
      },
    );

    switch (response.status) {
      case 200:
        removeFromList(memberId);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await reply();
            break;
        }
        break;
    }
  };

  const fetchApplyList = async () => {
    setLoading(true);
    const response = await fetch(
      API_URL +
        `/core/band/list?bandId=${bandId}&page=${page + 1}&size=${size}`,
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
        if (r.length > 0) setPage(page + 1);

        let a = applyList;
        a = a.concat(r);
        setApplyList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchApplyList();
            break;
        }
        break;
    }

    setLoading(false);
  };

  useEffect(() => {
    initApplyList();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.contentBackground,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {applyList &&
          applyList.length > 0 &&
          applyList.map((apply, index) => (
            <View
              key={index}
              style={{
                width: responsiveWidth(370),
                height: responsiveHeight(50),
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                  source={{
                    uri:
                      API_URL +
                      `/user/profile/image?watch=${apply.profileImage}`,
                    priority: FastImage.priority.normal,
                  }}
                  style={{
                    width: responsiveWidth(35),
                    height: responsiveWidth(35),
                    resizeMode: 'cover',
                    borderRadius: responsiveWidth(100),
                    marginRight: responsiveWidth(5),
                  }}
                />

                <Text
                  style={[Fonts.contentMediumBold, { color: Colors.textBold }]}
                >
                  {apply.nickname}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SubmitButton
                  width={40}
                  height={35}
                  title={'수락'}
                  onPress={() => reply(true, apply.memberId)}
                />
                <View style={{ width: responsiveWidth(5) }} />
                <SubmitButton2
                  width={40}
                  height={35}
                  title={'거절'}
                  onPress={() => reply(false, apply.memberId)}
                />
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

export default ApplyList;
