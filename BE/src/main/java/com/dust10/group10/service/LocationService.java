package com.dust10.group10.service;

import com.dust10.group10.utils.OpenApiConnect;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class LocationService {

    private final Logger logger = LoggerFactory.getLogger(LocationService.class);

    public String locateStation(double xAxis, double yAxis) throws IOException {
        OpenApiConnect apiConnect = new OpenApiConnect();
        String tmCoordinate = apiConnect.kakaoApiConnectBuilder(xAxis, yAxis);
        double[] jsonParser = xyCoordinate(jsonParser(tmCoordinate));
        return processJsonStationData(apiConnect.apiConnectStationBuilder(jsonParser));
    }

    private JsonObject jsonParser(String json) {
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(json);
        JsonArray jsonArray = je.getAsJsonObject().get("documents").getAsJsonArray();
        return (JsonObject) jsonArray.get(0);
    }

    private String processJsonStationData(String jsonStationData) {
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(jsonStationData);
        JsonArray jsonArray = je.getAsJsonObject().get("list").getAsJsonArray();
        JsonObject jsonObject = (JsonObject) jsonArray.get(0);
        return jsonObject.get("stationName").getAsString();
    }

    private double[] xyCoordinate(JsonObject jsonObject) {
        double tmX = jsonObject.get("x").getAsDouble();
        double tmY = jsonObject.get("y").getAsDouble();
        return new double[]{tmX, tmY};
    }
}
