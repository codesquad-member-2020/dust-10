package com.dust10.group10.api;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiResponse {
    private HttpStatus status;
    private int statusCode;
    private String stationName;

    public ApiResponse(HttpStatus status, int statusCode, String stationName) {
        this.status = status;
        this.statusCode = statusCode;
        this.stationName = stationName;
    }

    public ApiResponse(HttpStatus status, int statusCode) {
        this.status = status;
        this.statusCode = statusCode;
    }
}
