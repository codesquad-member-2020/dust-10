package com.dust10.group10.service;

import com.dust10.group10.domain.DustStatus;
import com.dust10.group10.domain.Forecast;
import com.dust10.group10.utils.OpenApiConnect;
import com.google.gson.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ForecastService {

    public List<DustStatus> measureDust(String stationName) throws IOException {
        String json = new OpenApiConnect().apiConnectStationMeasure(stationName);
        return dustStatusJsonParser(json);
    }

    public Forecast forecastDust() throws IOException {
        String json = new OpenApiConnect().apiConnectForecast();
        return forecastJsonParser(json);
    }

    private List<DustStatus> dustStatusJsonParser(String json) {
        List<DustStatus> dustStatuses = new ArrayList<>();
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(json);
        JsonArray jsonArray = je.getAsJsonObject().get("list").getAsJsonArray();
        for (int i = 0; i < jsonArray.size(); i++) {
            JsonObject jsonObject = (JsonObject) jsonArray.get(i);
            String pm10Value = jsonObject.get("pm10Value").getAsString();
            String pm10Grade1h = jsonObject.get("pm10Grade1h").getAsString();
            String dataTime = jsonObject.get("dataTime").getAsString();
            DustStatus dustStatus = new DustStatus(pm10Value, pm10Grade1h, dataTime);
            dustStatuses.add(dustStatus);
        }
        return dustStatuses;
    }

    private Forecast forecastJsonParser(String json) {
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(json);
        JsonArray jsonArray = je.getAsJsonObject().get("list").getAsJsonArray();
        JsonObject jsonObject = (JsonObject) jsonArray.get(0);
        String imageUrl1 = jsonObject.get("imageUrl1").getAsString();
        String imageUrl2 = jsonObject.get("imageUrl2").getAsString();
        String imageUrl3 = jsonObject.get("imageUrl3").getAsString();
        String informGrade = jsonObject.get("informGrade").getAsString();
        String informOverall = jsonObject.get("informOverall").getAsString();
        return new Forecast(imageUrl1, imageUrl2, imageUrl3, informGrade, informOverall);
    }
}
