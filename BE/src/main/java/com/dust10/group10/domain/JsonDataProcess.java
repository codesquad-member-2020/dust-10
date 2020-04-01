package com.dust10.group10.domain;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class JsonDataProcess {

    public String processJsonStationData(String jsonStationData) {
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(jsonStationData);
        JsonArray jsonArray = je.getAsJsonObject().get("list").getAsJsonArray();
        JsonObject jsonObject = (JsonObject) jsonArray.get(0);
        return jsonObject.get("stationName").getAsString();
    }
}
