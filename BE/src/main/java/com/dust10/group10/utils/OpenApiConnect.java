package com.dust10.group10.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

import static com.dust10.group10.utils.OpenApiURL.*;

public class OpenApiConnect {

    private final Logger logger = LoggerFactory.getLogger(OpenApiConnect.class);

    public String kakaoApiConnectBuilder(double xAxis, double yAxis) throws IOException {
        StringBuilder urlBuilder = new StringBuilder(KAKAO_OPEN_API_URL);
        paramAppendUrl(urlBuilder, "?", "x", xAxis);
        paramAppendUrl(urlBuilder, "&", "y", yAxis);
        paramAppendUrl(urlBuilder, "&", "output_coord", "TM");
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        kakaoApiUrlRequest(url, conn);
        conn.disconnect();
        return responseBuilder(conn);
    }

    public String apiConnectStationBuilder(double[] xyCoordinate) throws IOException {
        StringBuilder urlBuilder = requestApiConnect(FIND_STATION_OPEN_API_URL);
        paramAppendUrl(urlBuilder, "&", "tmX", xyCoordinate[0]);
        paramAppendUrl(urlBuilder, "&", "tmY", xyCoordinate[1]);
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        apiUrlRequest(url, conn);
        return responseBuilder(conn);
    }

    public String apiConnectStationMeasure(String stationName) throws IOException {
        StringBuilder urlBuilder = requestApiConnect(MEASURE_OPEN_API_URL);
        paramAppendUrl(urlBuilder, "&", "numOfRows", "24");
        paramAppendUrl(urlBuilder, "&", "pageNo", "1");
        paramAppendUrl(urlBuilder, "&", "stationName", stationName);
        paramAppendUrl(urlBuilder, "&", "dataTerm", "DAILY");
        paramAppendUrl(urlBuilder, "&", "ver", "1.3");
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        apiUrlRequest(url, conn);
        return responseBuilder(conn);
    }

    private StringBuilder requestApiConnect(String openApiUrl) throws IOException {
        StringBuilder urlBuilder = new StringBuilder(openApiUrl);
        paramAppendUrl(urlBuilder, "?", "ServiceKey", SERVICE_KEY);
        paramAppendUrl(urlBuilder, "&", "_returnType", "json");
        return urlBuilder;
    }

    private void paramAppendUrl(StringBuilder builder, String queryMark, String key, Object value) throws IOException {
        builder.append(queryMark).append((URLEncoder.encode((key), "UTF-8"))).append("=").append(value);
    }

    private void apiUrlRequest(URL url, HttpURLConnection conn) throws IOException {
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
    }

    private void kakaoApiUrlRequest(URL url, HttpURLConnection conn) throws IOException {
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        conn.setRequestProperty("Authorization", KAKAO_KEY);
    }

    private String responseBuilder(HttpURLConnection conn) throws IOException {
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
        return sb.toString();
    }
}
