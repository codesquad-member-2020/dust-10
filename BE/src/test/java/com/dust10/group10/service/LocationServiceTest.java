package com.dust10.group10.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class LocationServiceTest {

    String json = "{\"meta\":{\"total_count\":1},\"documents\":[{\"x\":198023.3648957507,\"y\":451599.7856993121}]}";
    String str1 = "{\"id\": 1, \"password\": \"1234\"}";

    @Test
    public void JSON오브젝트() {
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(json);
        JsonArray jsonArray = je.getAsJsonObject().get("documents").getAsJsonArray();
        JsonObject jsonObject = (JsonObject) jsonArray.get(0);
        System.out.println(jsonObject.get("x").getAsDouble());
        assertThat(jsonArray).isNotNull();
    }

    @Test
    public void JSON파싱() {
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(str1);
        int id = je.getAsJsonObject().get("id").getAsInt();
        String pass = je.getAsJsonObject().get("password").getAsString();
        System.out.println(id);
        System.out.println(pass);
        assertThat(id).isNotNull();
        assertThat(pass).isNotNull();
    }
}
