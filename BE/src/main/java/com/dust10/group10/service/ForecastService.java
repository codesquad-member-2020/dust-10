package com.dust10.group10.service;

import com.dust10.group10.domain.DustStatus;
import com.dust10.group10.utils.OpenApiConnect;
import com.google.gson.*;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import static com.dust10.group10.utils.OpenApiURL.SERVICE_KEY;


@Service
public class ForecastService {

    public List<DustStatus> measureDust(String stationName) throws IOException {
        String json = new OpenApiConnect().apiConnectStationMeasure(stationName);
        return (jsonParser(json));
    }

    private List<DustStatus> jsonParser(String json) {
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

    public String forecastDust() {
        StringBuilder sb = new StringBuilder();
        try {
            StringBuilder urlBuilder = new StringBuilder("http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth"); /*URL*/
            urlBuilder.append("?").append(URLEncoder.encode("ServiceKey", "UTF-8")).append("=").append(SERVICE_KEY); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("24", "UTF-8")); /*한 페이지 결과 수 (조회 날짜로 검색 시 사용 안함)*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호(조회 날짜로 검색 시 사용 안함)*/
            urlBuilder.append("&" + URLEncoder.encode("searchDate", "UTF-8") + "=" + URLEncoder.encode("2020-03-31", "UTF-8")); /*통보시간 검색 (조회 날짜 입력 없을 경우 한달동안 예보통보 발령 날짜의 리스트 정보를 확인)*/
            urlBuilder.append("&" + URLEncoder.encode("InformCode", "UTF-8") + "=" + URLEncoder.encode("PM10", "UTF-8")); /*통보코드검색 (PM10 : 미세먼지 PM25 : 초미세먼지 O3 : 오존)*/
            urlBuilder.append("&" + URLEncoder.encode("ver", "UTF-8") + "=" + URLEncoder.encode("1.1", "UTF-8")); /*버전별 상세 결과 참고문서 참조*/
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
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();
        } catch (IOException e) {

        }
        return sb.toString();
    }
}
