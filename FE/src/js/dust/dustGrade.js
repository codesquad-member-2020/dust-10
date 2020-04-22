import { CONDITION, FIGURE_RATING } from "../../constants/grade.js";
import DOM from "../../option/dustPageDom.js";

function renderBackgroundGrade(COLOR) {
  DOM.grade.style.background = `${COLOR}`;
}

function renderEmoji(EMOJI) {
  DOM.gradeEmoji.innerText = EMOJI;
}

function renderGradeCondition(TEXT) {
  DOM.gradeCondition.innerText = TEXT;
}
function renderFigure(pm10Value) {
  DOM.gradeFigure.innerText = `${pm10Value}µg/m3`;
}
function renderTime(dataTime) {
  DOM.gradeTime.innerText = dataTime;
}
export function renderStation(stationName) {
  DOM.station.innerText = `${stationName} 측정소 기준`;
}

function renderGradeScreen(COLOR, EMOJI, TEXT, pm10Value, dataTime) {
  renderBackgroundGrade(COLOR);
  renderEmoji(EMOJI);
  renderGradeCondition(TEXT);
  renderFigure(pm10Value);
  renderTime(dataTime);
}

export function changeGradeInfo({ pm10Grade1h, pm10Value, dataTime }) {
  switch (pm10Grade1h) {
    case FIGURE_RATING.GOOD: {
      renderGradeScreen(
        CONDITION.GOOD.BACKGROUND,
        CONDITION.GOOD.EMOJI,
        CONDITION.GOOD.TEXT,
        pm10Value,
        dataTime
      );
      break;
    }
    case FIGURE_RATING.NOMAL: {
      renderGradeScreen(
        CONDITION.NOMAL.BACKGROUND,
        CONDITION.NOMAL.EMOJI,
        CONDITION.NOMAL.TEXT,
        pm10Value,
        dataTime
      );
      break;
    }
    case FIGURE_RATING.BAD: {
      renderGradeScreen(
        CONDITION.BAD.BACKGROUND,
        CONDITION.BAD.EMOJI,
        CONDITION.BAD.TEXT,
        pm10Value,
        dataTime
      );
      break;
    }
    case FIGURE_RATING.VERY_BAD: {
      renderGradeScreen(
        CONDITION.VERY_BAD.BACKGROUND,
        CONDITION.VERY_BAD.EMOJI,
        CONDITION.VERY_BAD.TEXT,
        pm10Value,
        dataTime
      );
      break;
    }
    case FIGURE_RATING.NO_DATA: {
      renderGradeScreen(
        CONDITION.NO_DATA.BACKGROUND,
        CONDITION.NO_DATA.EMOJI,
        CONDITION.NO_DATA.TEXT,
        pm10Value,
        dataTime
      );
    }
  }
}
