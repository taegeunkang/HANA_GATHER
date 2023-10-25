import { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks';
import { responsiveHeight, responsiveWidth } from '../../utils/utils';
import Meeting from '../../components/Content/Meeting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils/constants';
import { reIssue } from '../../utils/login';

const MeetingList = ({ navigation }) => {
  const [meetingList, setMeetingList] = useState([]);
  const [meetingListPage, setMeetingListPage] = useState(0);
  const [meetingListPageSize, setMeetingListPageSize] = useState(20);
  const [meetingListLoading, setMeetingListLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const { Fonts, Colors } = useTheme();

  const init = async () => {
    setInitLoading(true);
    await initMeetingList();
    setInitLoading(false);
  };

  const initMeetingList = async () => {
    const response = await fetch(
      API_URL + `/core/meeting/all?page=${0}&size=${meetingListPageSize}`,
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
        setMeetingList(r);

        break;

      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await initMeetingList();
            break;
        }
        break;
    }
  };

  const fetchMeetingList = async () => {
    setMeetingListLoading(true);

    const response = await fetch(
      API_URL +
        `/core/meeting/all?page=${
          meetingListPage + 1
        }&size=${meetingListPageSize}`,
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

        if (r.length > 0) setMeetingListPage(meetingListPage + 1);
        let a = meetingList;
        a = a.concat(r);
        setMeetingList(a);
        break;
      case 400:
        const k = await response.json();
        switch (k.code) {
          case 'U08':
            await reIssue();
            await fetchMeetingList();
            break;
        }
    }
    setMeetingListLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      {initLoading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.contentBackground,
          }}
        >
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </View>
      ) : (
        <ScrollView
          horizontal={false}
          nestedScrollEnabled={true}
          onScroll={({ nativeEvent }) => {
            if (meetingListLoading) return;
            const isCloseToBottom =
              nativeEvent.layoutMeasurement.height +
                nativeEvent.contentOffset.y >=
              nativeEvent.contentSize.height - responsiveHeight(30);
            if (isCloseToBottom) {
              fetchMeetingList();
            }
          }}
          scrollEventThrottle={400}
          style={{
            backgroundColor: Colors.contentBackground,
          }}
        >
          {meetingList.map((meeting, index) => (
            <View style={{ marginBottom: responsiveHeight(10) }}>
              <Meeting
                {...meeting}
                titleVisible={true}
                onPress={() =>
                  navigation.navigate('MeetingDetail', {
                    ...meeting,
                    before: 'MeetingList',
                  })
                }
              />
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default MeetingList;
