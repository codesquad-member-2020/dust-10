package com.dust10.group10.api;

import lombok.Getter;

@Getter
public class ApiResult {
    private String stationName;

    public ApiResult(String stationName) {
        this.stationName = stationName;
    }

    public static ApiResult locate(String locateX, String locateY) {
        return new ApiResult("강남구");
    }
}
