import { FIGURE_RATING, GRAPE_COLOR } from "../constants/grade.js";

const grade = document.querySelector(".grade");
const gradeCondition = document.querySelector(".grade_condition");
const gradeFigure = document.querySelector(".figure");
const gradeTime = document.querySelector(".time");
const station = document.querySelector(".measuring_station");

const stationList = document.querySelector(".station_list");
const getGrape = document.querySelectorAll(".line span");

const url = "http://127.0.0.1:5500/src/data/mockdata.json";

export function renderStationList(dataList, grapeList) {
  dataList.forEach((el, index) => {
    examinedDustRating(el.pm10Grade1h, el.pm10Value, grapeList[index]);
  });
}

// switch문의 각각의 case는 중복코드가 많다. 함수로 빼서 사용하면 좋을거 같다.

function examinedDustRating(pm10Grade1h, pm10Value, grapeElment) {
  switch (pm10Grade1h) {
    case FIGURE_RATING.GOOD: {
      grapeElment.innerText = pm10Value;
      grapeElment.style.width = pm10Value / 2 + "%";
      grapeElment.style.backgroundColor = GRAPE_COLOR.GOOD;
      break;
    }
    case FIGURE_RATING.NOMAL: {
      grapeElment.innerText = pm10Value;
      grapeElment.style.width = pm10Value / 2 + "%";
      grapeElment.style.backgroundColor = GRAPE_COLOR.NOMAL;
      break;
    }
    case FIGURE_RATING.BAD: {
      grapeElment.innerText = pm10Value;
      grapeElment.style.width = pm10Value / 2 + "%";
      grapeElment.style.backgroundColor = GRAPE_COLOR.BAD;
      break;
    }
    case FIGURE_RATING.VERY_BAD: {
      grapeElment.innerText = pm10Value;
      grapeElment.style.width = pm10Value / 2 + "%";
      grapeElment.style.backgroundColor = GRAPE_COLOR.VERY_BAD;
      break;
    }
  }
}

fetch(url)
  .then(res => res.json())
  .then(LIST => {
    renderStationList(LIST.DATA, getGrape);
  });
