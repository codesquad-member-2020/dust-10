package com.dust10.group10.service;

import com.dust10.group10.domain.JsonDataProcess;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Service
public class LocationService {

    private static final String KAKAO_KEY = "KakaoAK c2de27fae60a8e007a44e7d8a411efec";
    protected static final String SERVICE_KEY = "pd7oMfpEAuYkyy7Mm3b9cZfe49GY1p%2B4EKHYoipIgk9RrZfCitVfVH3LGPo%2Fb93v9%2FHPnQlgOX7stocZtomyeQ%3D%3D"; /*Secret KEY*/

    private String kakaoConvertCoordinate(double xAxis, double yAxis) throws IOException {
        StringBuilder urlBuilder = new StringBuilder("https://dapi.kakao.com/v2/local/geo/transcoord.json"); /*URL*/
        urlBuilder.append("?").append(URLEncoder.encode("x", "UTF-8")).append("=").append(xAxis); /* X좌표*/
        urlBuilder.append("&").append(URLEncoder.encode("y", "UTF-8")).append("=").append(yAxis); /* Y좌표*/
        urlBuilder.append("&").append(URLEncoder.encode("output_coord", "UTF-8")).append("=").append("TM"); /*출력 좌표 변환 */
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Authorization", KAKAO_KEY);
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        String line;
        StringBuilder sb = new StringBuilder();
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        return sb.toString();
    }

    private JsonObject jsonParser(String json) {
        JsonParser jp = new JsonParser();
        JsonElement je = jp.parse(json);
        JsonArray jsonArray = je.getAsJsonObject().get("documents").getAsJsonArray();
        return (JsonObject) jsonArray.get(0);
    }

    private double[] xyCoordinate(JsonObject jsonObject) {
        double tmX = jsonObject.get("x").getAsDouble();
        double tmY = jsonObject.get("y").getAsDouble();
        return new double[]{tmX, tmY};
    }

    private String findStation(double[] xyCoordinate) throws IOException {
        StringBuilder urlBuilder = new StringBuilder("http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList"); /*URL*/
        urlBuilder.append("?").append(URLEncoder.encode("ServiceKey", "UTF-8")).append("=").append(SERVICE_KEY); /*Service Key*/
        urlBuilder.append("&").append(URLEncoder.encode("tmX", "UTF-8")).append("=").append(xyCoordinate[0]); /*TM측정방식 X좌표*/
        urlBuilder.append("&").append(URLEncoder.encode("tmY", "UTF-8")).append("=").append(xyCoordinate[1]); /*TM측정방식 Y좌표*/
        urlBuilder.append("&").append(URLEncoder.encode("_returnType", "UTF-8")).append("=").append("json"); /*JSON형식으로 표시*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        String line;
        StringBuilder sb = new StringBuilder();
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();

        return sb.toString();
    }

    public String locateStation(double xAxis, double yAxis) throws IOException {
        String tmCoordinate = kakaoConvertCoordinate(xAxis, yAxis);
        double[] jsonParser = xyCoordinate(jsonParser(tmCoordinate));
        return new JsonDataProcess().processJsonStationData(findStation(jsonParser));
    }
}
