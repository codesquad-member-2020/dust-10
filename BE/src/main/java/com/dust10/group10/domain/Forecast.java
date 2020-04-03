package com.dust10.group10.domain;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class Forecast {
    private String imageUrl1;
    private String imageUrl2;
    private String imageUrl3;
    private String informGrade;
    private String informOverall;

    public Forecast(String imageUrl1, String imageUrl2, String imageUrl3,
                    String informGrade, String informOverall) {
        this.imageUrl1 = imageUrl1;
        this.imageUrl2 = imageUrl2;
        this.imageUrl3 = imageUrl3;
        this.informGrade = informGrade;
        this.informOverall = informOverall;
    }
}
