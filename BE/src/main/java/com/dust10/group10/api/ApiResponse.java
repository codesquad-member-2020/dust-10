package com.dust10.group10.api;

import com.dust10.group10.domain.DustStatus;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.util.List;

@Getter
public class ApiResponse {
    private HttpStatus status;
    private int statusCode;
    private String stationName;
    private List<DustStatus> objects;

    public ApiResponse(HttpStatus status, int statusCode, String stationName) {
        this.status = status;
        this.statusCode = statusCode;
        this.stationName = stationName;
    }

    public ApiResponse(HttpStatus status, int statusCode, List<DustStatus> objects) {
        this.status = status;
        this.statusCode = statusCode;
        this.objects = objects;
    }

    public ApiResponse(HttpStatus status, int statusCode) {
        this.status = status;
        this.statusCode = statusCode;
    }
}
