import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Calendar from '../../components/Calendar';
import More from '../../components/Content/More';
import HeaderLeftButton from '../../components/HeaderLeftButton';
import SubmitButton from '../../components/SubmitButton';
import SubmitButton3 from '../../components/SubmitButton3';
import { useTheme } from '../../hooks';
import { API_URL } from '../../utils/constants';
import {
  extractTime,
  responsiveHeight,
  responsiveWidth,
} from '../../utils/utils';
import { reIssue } from '../../utils/login';
const CreateGroup = ({ navigation, route }) => {
  const { Fonts, Colors, Images } = useTheme();
  const [bandId, setBandId] = useState(null);
  const [title, setTitle] = useState(null);
  const [category, setCategory] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [members, setMembers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationName, setLocationName] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [friendList, setFriendList] = useState(null);
  const [selectedDays, setSelectedDays] = useState({});
  const [amount, setAmount] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState('date');
  const amountRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: locationName,
      headerLeft: () => (
        <HeaderLeftButton
          onPress={() => {
            navigation.pop();
          }}
          close={true}
        />
      ),
    });
  }, [locationName]);

  const selectDay = day => {
    setSelectedDays(prevState => {
      const updatedDays = { ...prevState };
      if (updatedDays[day]) {
        updatedDays[day].selected = !updatedDays[day].selected;
        updatedDays[day].marked = !updatedDays[day].marked;
      } else {
        updatedDays[day] = {
          selected: true,
          disableTouchEvent: false,
          marked: true,
          dotColor: Colors.buttonSecondBackground,
        };
      }

      return updatedDays;
    });
  };

  const onPressTime = () => {
    // 시간 클릭 시
    setMode('time'); // 모달 유형을 time으로 변경
    setVisible(true); // 모달 open
  };

  const onConfirm = selectedDate => {
    // 날짜 또는 시간 선택 시
    setVisible(false); // 모달 close
    if (mode == 'date') {
      setDate(selectedDate); // 선택한 날짜 변경
    } else {
      setTime(selectedDate);
    }
  };
  const onCancel = () => {
    // 취소 시
    setVisible(false); // 모달 close
  };

  const initData = () => {
    if (route.params.bandId) {
      setBandId(route.params.bandId);
    }
    if (route.params.category) {
      setCategory(route.params.category);
    }
    if (route.params.thumbnail) {
      setThumbnail(route.params.thumbnail);
    }
    if (route.params.members) {
      setMembers(route.params.members);
    }
    if (route.params.title) {
      setTitle(route.params.title);
    }
    if (route.params.locationName) {
      setLocationName(route.params.locationName);
    }
    if (route.params.lat) {
      setLatitude(route.params.lat);
    }
    if (route.params.lon) {
      setLongitude(route.params.lon);
    }
    if (route.params.friends) {
      setFriendList(route.params.friends);
    }
  };

  const submit = async () => {
    if (!friendList) {
      Alert.alert('인원을 추가해 주세요.');
      return;
    }
    setLoading(true);
    const member = friendList.map((friend, index) => friend.email);
    const days = Object.keys(selectedDays).map((day, index) => new Date(day));
    const response = await fetch(API_URL + '/core/meeting/create', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bandId: bandId,
        locationName: locationName,
        latitude: latitude,
        longitude: longitude,
        member: member,
        amount: amount,
        days: days,
        time: time,
      }),
    });
    switch (response.status) {
      case 200:
        navigation.navigate('GroupDetail', {
          bandId: bandId,
          category: category,
          thumbnail: thumbnail,
          members: members,
          title: title,
        });
        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await submit();
        }
        break;
    }

    setLoading(false);
  };

  useEffect(() => {
    initData();
  });

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
        amountRef.current.blur();
      }}
    >
      <View style={styles.container}>
        {/*  인원 */}
        <View
          style={{
            flexDirection: 'row',
            width: responsiveWidth(370),
            height: responsiveHeight(50),
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={[Fonts.contentMediumBold, { color: Colors.textBold }]}>
              인원
            </Text>
          </View>
          <View
            style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}
          >
            {friendList &&
              friendList.map((friend, index) => {
                if (index >= 3) return;
                return (
                  <Image
                    key={index}
                    source={{
                      uri:
                        API_URL +
                        `/user/profile/image?watch=${friend.profileImage}`,
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
                );
              })}
            {friendList && friendList.length - 3 > 0 && (
              <More count={friendList.length - 3} />
            )}
          </View>

          <TouchableOpacity
            style={{ flex: 1, alignItems: 'flex-end' }}
            onPress={() =>
              navigation.navigate('HomeSearchUser', {
                bandId: bandId,
                before: 'CreateGroup',
              })
            }
          >
            <Image
              source={Images.plus}
              style={{
                width: responsiveWidth(20),
                height: responsiveWidth(20),
              }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <View
            style={[
              {
                width: responsiveWidth(50),
                height: responsiveHeight(50),
                alignItems: 'flex-start',
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={[
                Fonts.contentMediumBold,
                {
                  color: Colors.textBold,
                },
              ]}
            >
              회비
            </Text>
          </View>
          <View>
            <TextInput
              style={[
                Fonts.contentRegualrMedium,
                styles.loginInput,
                {
                  height: responsiveHeight(50),
                  width: responsiveWidth(320),
                  borderRadius: responsiveWidth(12),
                  backgroundColor: Colors.inputBackground,
                  paddingHorizontal: responsiveWidth(10),
                  color: Colors.inputContent,
                },
              ]}
              placeholder={'회비'}
              placeholderTextColor={Colors.inputPlaceHolder}
              onChangeText={e => setAmount(e)}
              keyboardType="numeric"
              value={amount}
              ref={amountRef}
            />
          </View>
        </View>

        <View
          style={{
            width: responsiveWidth(370),
            height: responsiveHeight(50),
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={[Fonts.contentMediumBold, { color: Colors.textBold }]}>
              시간
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>{extractTime(time)}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <SubmitButton3
              title={'선택'}
              width={35}
              height={35}
              onPress={onPressTime}
            />
          </View>
        </View>
        <DateTimePickerModal
          isVisible={visible}
          mode={mode}
          onConfirm={onConfirm}
          onCancel={onCancel}
          date={date}
          confirmTextIOS={'선택'}
          cancelTextIOS={'취소'}
        />
        <Calendar selectDay={selectDay} selectedDays={selectedDays} />

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <SubmitButton title={'완료'} onPress={submit} loading={loading} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateGroup;
