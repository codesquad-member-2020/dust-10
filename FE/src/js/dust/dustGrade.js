import { CONDITION } from "../../constants/grade.js";
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
