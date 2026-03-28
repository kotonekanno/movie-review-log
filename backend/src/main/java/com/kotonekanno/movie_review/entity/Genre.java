package com.kotonekanno.movie_review.entity;

import jakarta.persistence.*;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "genres")
@Getter
@Setter
public class Genre {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "external_id", nullable = false, unique = true)
  private Integer externalId;

  @Column(name = "ja_name")
  private String jaName;

  @Column(name = "en_name")
  private String enName;
}
