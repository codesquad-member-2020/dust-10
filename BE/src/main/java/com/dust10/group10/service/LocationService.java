package com.dust10.group10.service;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Service
public class LocationService {
    private static final String ServiceKey = "pd7oMfpEAuYkyy7Mm3b9cZfe49GY1p%2B4EKHYoipIgk9RrZfCitVfVH3LGPo%2Fb93v9%2FHPnQlgOX7stocZtomyeQ%3D%3D"; /*Secret KEY*/

    public String locateStation() {
        StringBuilder sb = new StringBuilder();
        try {
            StringBuilder urlBuilder = new StringBuilder("http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList"); /*URL*/
            urlBuilder.append("?").append(URLEncoder.encode("ServiceKey", "UTF-8")).append("=").append(ServiceKey); /*Service Key*/
            urlBuilder.append("&").append(URLEncoder.encode("tmX", "UTF-8")).append("=").append("244148.546388"); /*TM측정방식 X좌표*/
            urlBuilder.append("&").append(URLEncoder.encode("tmY", "UTF-8")).append("=").append("412423.75772"); /*TM측정방식 Y좌표*/
            urlBuilder.append("&").append(URLEncoder.encode("ver", "UTF-8")).append("=").append("1.0"); /*버전 미 포함시 TM좌표 기준 가까운 측정소 표출하고 1.0 호출시 도로명주소검색 API 좌표로 가까운 측정소 표출*/
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

    public String stationMeasure() {
        StringBuilder sb = new StringBuilder();
        try {
            StringBuilder urlBuilder = new StringBuilder("http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty"); /*URL*/
            urlBuilder.append("?").append(URLEncoder.encode("ServiceKey", "UTF-8")).append("=").append(ServiceKey); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "=" + URLEncoder.encode("24", "UTF-8")); /*한 페이지 결과 수*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호*/
            urlBuilder.append("&" + URLEncoder.encode("stationName", "UTF-8") + "=" + URLEncoder.encode("종로구", "UTF-8")); /*측정소 이름*/
            urlBuilder.append("&" + URLEncoder.encode("dataTerm", "UTF-8") + "=" + URLEncoder.encode("DAILY", "UTF-8")); /*요청 데이터기간 (하루 : DAILY, 한달 : MONTH, 3달 : 3MONTH)*/
            urlBuilder.append("&" + URLEncoder.encode("ver", "UTF-8") + "=" + URLEncoder.encode("1.3", "UTF-8")); /*버전별 상세 결과 참고문서 참조*/
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


    public String forecastDust() {
        StringBuilder sb = new StringBuilder();
        try {
            StringBuilder urlBuilder = new StringBuilder("http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMinuDustFrcstDspth"); /*URL*/
            urlBuilder.append("?").append(URLEncoder.encode("ServiceKey", "UTF-8")).append("=").append(ServiceKey); /*Service Key*/
            urlBuilder.append("&" + URLEncoder.encode("numOfRows","UTF-8") + "=" + URLEncoder.encode("24", "UTF-8")); /*한 페이지 결과 수 (조회 날짜로 검색 시 사용 안함)*/
            urlBuilder.append("&" + URLEncoder.encode("pageNo","UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /*페이지 번호(조회 날짜로 검색 시 사용 안함)*/
            urlBuilder.append("&" + URLEncoder.encode("searchDate","UTF-8") + "=" + URLEncoder.encode("2020-03-31", "UTF-8")); /*통보시간 검색 (조회 날짜 입력 없을 경우 한달동안 예보통보 발령 날짜의 리스트 정보를 확인)*/
            urlBuilder.append("&" + URLEncoder.encode("InformCode","UTF-8") + "=" + URLEncoder.encode("PM10", "UTF-8")); /*통보코드검색 (PM10 : 미세먼지 PM25 : 초미세먼지 O3 : 오존)*/
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
