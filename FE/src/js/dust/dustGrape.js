import { GRAPE_COLOR, FIGURE_RATING } from "../../constants/grade.js";

function registerFigureRating(grapeElment, pm10Value, grapeColor) {
  const figurePercent = pm10Value / 2 + "%";

  grapeElment.innerText = pm10Value;
  grapeElment.style.width = figurePercent;
  grapeElment.style.backgroundColor = grapeColor;
}

function examinedDustRating(pm10Grade1h, pm10Value, grapeElment) {
  switch (pm10Grade1h) {
    case FIGURE_RATING.GOOD: {
      registerFigureRating(grapeElment, pm10Value, GRAPE_COLOR.GOOD);
      break;
    }
    case FIGURE_RATING.NOMAL: {
      registerFigureRating(grapeElment, pm10Value, GRAPE_COLOR.NOMAL);
      break;
    }
    case FIGURE_RATING.BAD: {
      registerFigureRating(grapeElment, pm10Value, GRAPE_COLOR.BAD);
      break;
    }
    case FIGURE_RATING.VERY_BAD: {
      registerFigureRating(grapeElment, pm10Value, GRAPE_COLOR.VERY_BAD);
      break;
    }
  }
}
