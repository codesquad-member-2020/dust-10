package com.dust10.group10.domain;

import lombok.*;

@NoArgsConstructor
@Getter
@ToString
public class DustStatus {
    private String pm10Value;
    private String pm10Grade1h;
    private String dataTime;

    public DustStatus(String pm10Value, String pm10Grade1h, String dataTime) {
        this.pm10Value = pm10Value;
        this.pm10Grade1h = pm10Grade1h;
        this.dataTime = dataTime;
    }
}
