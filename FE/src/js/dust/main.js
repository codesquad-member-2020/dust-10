import { renderStationList } from "../dust/dustGrape.js";
import { changeGradeInfo } from "../dust/dustGrade.js";
import { initTouchEvent } from "../dust/dustTouch.js";
import DOM from "../../option/dustPageDom.js";

const url = "http://127.0.0.1:5501/src/data/mockdata.json";

function getLocation() {
  if (navigator.geolocation) {
    // GPS를 지원하면
    navigator.geolocation.getCurrentPosition(
      function(position) {
        fetchDustList(position.coords.latitude, position.coords.longitude);
      },
      function(error) {
        console.error(error);
      }
    );
  } else {
    alert("GPS를 지원하지 않습니다");
  }
}

getLocation();

async function fetchDustList(latitude, longitude) {
  const localUrl = `http://13.125.3.28:8080/api/location?longitude=${longitude}&latitude=${latitude}`;
  const localResponse = await fetch(localUrl);
  const localJSON = await localResponse.json();
  const localStationName = localJSON.stationName;

  const dataListUrl = `http://13.125.3.28:8080/api/dust-status?stationName=${localStationName}`;

  try {
    const dataListResponse = await fetch(dataListUrl);
    const dataListJSON = await dataListResponse.json();
    const dataList24 = dataListJSON.objects;

    renderStationList(dataList24, DOM.grapeSpanList);
    initTouchEvent(dataList24, changeGradeInfo);
  } catch (err) {
    alert(`Faile to fetch`);
  }
}
