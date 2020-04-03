import { renderStationList } from "../dust/dustGrape.js";
import { changeGradeInfo, renderStation } from "../dust/dustGrade.js";
import { initTouchEvent } from "../dust/dustTouch.js";
import css from "../../css/style.css";

import DOM from "../../option/dustPageDom.js";
import COORDIMATE from "../../constants/coordinate.js";

const url = "http://127.0.0.1:5501/src/data/mockdata.json";

async function fetchDustList(latitude, longitude) {
  const localUrl = `http://13.125.3.28:8080/api/location?longitude=${longitude}&latitude=${latitude}`;
  const localResponse = await fetch(localUrl);
  const localJSON = await localResponse.json();
  const localStationName = localJSON.stationName;

  renderStation(localStationName);

  const dataListUrl = `http://13.125.3.28:8080/api/dust-status?stationName=${localStationName}`;

  try {
    const dataListResponse = await fetch(dataListUrl);
    const dataListJSON = await dataListResponse.json();
    const dataList24 = dataListJSON.objects;

    alert(`모바일 환경에서 테스트 가능합니다. 개발자 도구를 여신 후 모바일에서 실행해 주세요 !
        Ctrl + Shift + I , Ctrl + Shift + M
    `);

    changeGradeInfo(dataList24[0]);
    renderStationList(dataList24, DOM.grapeSpanList);
    initTouchEvent(dataList24, changeGradeInfo);
  } catch (err) {
    alert(`Faile to fetch`);
  }
}
fetchDustList(COORDIMATE.FIX_LATITUDE, COORDIMATE.FIX_LONGITUDE);
