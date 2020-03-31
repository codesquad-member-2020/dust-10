const URL_1 = `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc`; // 좌표 기준
const URL_2 = `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc`; // 위치 기준
const SERVICE_KEY = `&ServiceKey=gKipD5KpJpFkoSG08CNpEMN0VHXn7OZ4pise1iRBiKNtT9oGCHZdyBFFphPzrHg3JHHnBEHYczO0mgeFmDH5aA%3D%3D&_returnType=json`; // 인증 키
const CORS_ANYWHERE = `https://cors-anywhere.herokuapp.com/`; // cors anyWhere

const TEST_URL = `https://cors-anywhere.herokuapp.com/http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=경기&pageNo=1&numOfRows=10&ServiceKey=gKipD5KpJpFkoSG08CNpEMN0VHXn7OZ4pise1iRBiKNtT9oGCHZdyBFFphPzrHg3JHHnBEHYczO0mgeFmDH5aA%3D%3D&ver=1.3&_returnType=json`;

function test(tmX, tmY, serviceKey) {
  const tm = `https://cors-anywhere.herokuapp.com/http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=244148.546388&tmY=412423.75772${serviceKey}`;
  return tm;
}

const dust_team = `https://cors-anywhere.herokuapp.com/http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc`;
const hello = `https://cors-anywhere.herokuapp.com/http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=강남구&dataTerm=month&pageNo=1&numOfRows=24&ServiceKey=gKipD5KpJpFkoSG08CNpEMN0VHXn7OZ4pise1iRBiKNtT9oGCHZdyBFFphPzrHg3JHHnBEHYczO0mgeFmDH5aA%3D%3D&ver=1.3&_returnType=json`;

function getLocation() {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function(position) {
        console.log(position);
        alert(position.coords.latitude + " " + position.coords.longitude);
      },
      function(error) {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      }
    );
  } else {
    alert("GPS를 지원하지 않습니다");
  }
}

// 위도 경도를 TM좌표로 변환하는 식이 필요한가 ?
const latitude = 37.617664;
const longitude = 126.83837439999999;

// fetch(TEST_URL, {
//   mode: "cors",
//   headers: {
//     "Access-Control-Allow-Origin": "*"
//   }
// })
//   .then(res => res.json())
//   .then(data => console.log(data.list));

// fetch(test(1, 1, SERVICE_KEY))
//   .then(res => res.json())
//   .then(data => console.log(data.list));

// const scroll = document.querySelector(".station_data");
