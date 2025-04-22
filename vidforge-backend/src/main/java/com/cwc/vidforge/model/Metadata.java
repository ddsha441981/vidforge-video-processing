package com.cwc.vidforge.model;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Metadata implements Serializable {
    private String format;
    private String duration;
    private String codec;
    private String resolution;
}

