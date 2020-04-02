import { GRAPE_COLOR, FIGURE_RATING } from "../../constants/grade.js";

function registerFigureRating(grapeElment, pm10Value, grapeColor) {
  const figurePercent = pm10Value / 2 + "%";

  grapeElment.innerText = pm10Value;
  grapeElment.style.width = figurePercent;
  grapeElment.style.backgroundColor = grapeColor;
}
