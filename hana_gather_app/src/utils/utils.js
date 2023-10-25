import { BASE_HEIGHT, BASE_WIDTH } from '../utils/constants';
import { Dimensions } from 'react-native';
const screen = Dimensions.get('screen');
const screenWidth = screen.width;
const screenHeight = screen.height;

export const responsiveHeight = h => {
  return (h / BASE_HEIGHT) * screenHeight;
};
export const responsiveWidth = w => {
  return (w / BASE_WIDTH) * screenWidth;
};

export const addCommasToNumber = number => {
  // 숫자를 문자열로 변환
  let numberStr = number.toString();

  // 정규식을 사용하여 천 단위마다 쉼표를 추가
  numberStr = numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numberStr;
};
export const numberToWon = number => {
  let inputNumber = number < 0 ? false : number;
  let unitWords = ['', '만', '억', '조', '경'];
  let splitUnit = 10000;
  let splitCount = unitWords.length;
  let resultArray = [];
  let resultString = '';

  for (let i = 0; i < splitCount; i++) {
    let unitResult =
      (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }

  return resultString;
};
export const formatDate = dateString => {
  // 주어진 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 년, 월, 일, 시간, 분을 가져옴
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // 오전/오후 구분
  const ampm = hours >= 12 ? '오후' : '오전';

  // 12시간제로 변환
  let hours12 = hours % 12 || 12;
  if (hours12 < 10) {
    hours12 = '0' + hours12;
  }

  // 최종 날짜 문자열 생성
  return `${year}년 ${month}월 ${day}일 ${ampm} ${hours12}시 ${minutes}분`;
};
export const extractDate = dateString => {
  // 주어진 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 년, 월, 일을 가져옴
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  // 최종 날짜 문자열 생성
  return `${year}년 ${month}월 ${day}일`;
};

export const extractTime = dateString => {
  // 주어진 날짜 문자열을 Date 객체로 변환
  const date = new Date(dateString);

  // 년, 월, 일, 시간, 분을 가져옴
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // 오전/오후 구분
  const ampm = hours >= 12 ? '오후' : '오전';

  // 12시간제로 변환
  const hours12 = hours % 12 || 12;

  // 최종 날짜 문자열 생성
  return `${ampm} ${hours12}시 ${minutes}분`;
};

export const timeAgo = (now, dateInput) => {
  const utcNow = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
  );

  const date = new Date(dateInput);
  const utcDate = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds(),
  );
  const seconds = Math.floor((utcNow - utcDate) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `방금전`;
  } else if (minutes < 60) {
    return `${minutes}분전`;
  } else if (hours < 24) {
    return `${hours}시간전`;
  } else if (days <= 7) {
    return `${days}일전`;
  } else {
    // mm.dd.YYYY 형식으로 반환
    const year = date.getFullYear();
    // 월은 0부터 시작하기 때문에 1을 더해줍니다.
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}.${year}`;
  }
};
export const calcKeyboardHeight = height => {
  return (height * 90) / BASE_HEIGHT;
};
