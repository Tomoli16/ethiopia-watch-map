export interface TerrainAdm2Sample {
  id: string;
  region: string;
  zone: string;
  sourceBoundaryName: string;
  bbox: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
  samples: {
    key: string;
    lon: number;
    lat: number;
    elevationM: number;
  }[];
  elevationRangeM: number;
  maxSlopePercent: number;
  meanSlopePercent: number;
  terrainReliefScore: number;
}

export const TERRAIN_ADM2_SAMPLES: Record<string, TerrainAdm2Sample> = {
  "Beneshangul Gumu__Assosa": {
    "id": "Beneshangul Gumu__Assosa",
    "region": "Beneshangul Gumu",
    "zone": "Assosa",
    "sourceBoundaryName": "Asosa",
    "bbox": {
      "minLon": 34.10146842275419,
      "minLat": 8.963296269865472,
      "maxLon": 35.349977295146196,
      "maxLat": 10.901725204375074
    },
    "samples": [
      {
        "key": "center",
        "lon": 34.72572,
        "lat": 9.93251,
        "elevationM": 1350
      },
      {
        "key": "north",
        "lon": 34.72572,
        "lat": 10.35896,
        "elevationM": 1193
      },
      {
        "key": "south",
        "lon": 34.72572,
        "lat": 9.50606,
        "elevationM": 1420
      },
      {
        "key": "east",
        "lon": 35.00039,
        "lat": 9.93251,
        "elevationM": 1415
      },
      {
        "key": "west",
        "lon": 34.45105,
        "lat": 9.93251,
        "elevationM": 1163
      }
    ],
    "elevationRangeM": 257,
    "maxSlopePercent": 0.62,
    "meanSlopePercent": 0.33,
    "terrainReliefScore": 10
  },
  "Beneshangul Gumu__Kamashi": {
    "id": "Beneshangul Gumu__Kamashi",
    "region": "Beneshangul Gumu",
    "zone": "Kamashi",
    "sourceBoundaryName": "Kemashi",
    "bbox": {
      "minLon": 34.95733923386581,
      "minLat": 8.95124860176291,
      "maxLon": 36.6929872073579,
      "maxLat": 11.2301634997496
    },
    "samples": [
      {
        "key": "center",
        "lon": 35.82516,
        "lat": 10.09071,
        "elevationM": 963
      },
      {
        "key": "north",
        "lon": 35.82516,
        "lat": 10.59207,
        "elevationM": 1390
      },
      {
        "key": "south",
        "lon": 35.82516,
        "lat": 9.58935,
        "elevationM": 1072
      },
      {
        "key": "east",
        "lon": 36.207,
        "lat": 10.09071,
        "elevationM": 1151
      },
      {
        "key": "west",
        "lon": 35.44332,
        "lat": 10.09071,
        "elevationM": 660
      }
    ],
    "elevationRangeM": 730,
    "maxSlopePercent": 0.77,
    "meanSlopePercent": 0.53,
    "terrainReliefScore": 22
  },
  "Beneshangul Gumu__Metekel": {
    "id": "Beneshangul Gumu__Metekel",
    "region": "Beneshangul Gumu",
    "zone": "Metekel",
    "sourceBoundaryName": "Metekel",
    "bbox": {
      "minLon": 34.92647063553171,
      "minLat": 9.944508631619888,
      "maxLon": 36.5788127341155,
      "maxLat": 11.985376722521396
    },
    "samples": [
      {
        "key": "center",
        "lon": 35.75264,
        "lat": 10.96494,
        "elevationM": 848
      },
      {
        "key": "north",
        "lon": 35.75264,
        "lat": 11.41393,
        "elevationM": 803
      },
      {
        "key": "south",
        "lon": 35.75264,
        "lat": 10.51595,
        "elevationM": 2009
      },
      {
        "key": "east",
        "lon": 36.11616,
        "lat": 10.96494,
        "elevationM": 1076
      },
      {
        "key": "west",
        "lon": 35.38912,
        "lat": 10.96494,
        "elevationM": 704
      }
    ],
    "elevationRangeM": 1305,
    "maxSlopePercent": 2.32,
    "meanSlopePercent": 0.84,
    "terrainReliefScore": 43
  },
  "Gambela__Agnewak": {
    "id": "Gambela__Agnewak",
    "region": "Gambela",
    "zone": "Agnewak",
    "sourceBoundaryName": "Agnuak",
    "bbox": {
      "minLon": 33.44043081256747,
      "minLat": 6.281550931800648,
      "maxLon": 35.200219667049396,
      "maxLat": 8.709916498141311
    },
    "samples": [
      {
        "key": "center",
        "lon": 34.32033,
        "lat": 7.49573,
        "elevationM": 491
      },
      {
        "key": "north",
        "lon": 34.32033,
        "lat": 8.02997,
        "elevationM": 445
      },
      {
        "key": "south",
        "lon": 34.32033,
        "lat": 6.96149,
        "elevationM": 459
      },
      {
        "key": "east",
        "lon": 34.70748,
        "lat": 7.49573,
        "elevationM": 605
      },
      {
        "key": "west",
        "lon": 33.93318,
        "lat": 7.49573,
        "elevationM": 423
      }
    ],
    "elevationRangeM": 182,
    "maxSlopePercent": 0.27,
    "meanSlopePercent": 0.14,
    "terrainReliefScore": 6
  },
  "Gambela__Majang": {
    "id": "Gambela__Majang",
    "region": "Gambela",
    "zone": "Majang",
    "sourceBoundaryName": "Majang",
    "bbox": {
      "minLon": 34.83727106968253,
      "minLat": 7.100832813543093,
      "maxLon": 35.39305851142094,
      "maxLat": 7.749136460844459
    },
    "samples": [
      {
        "key": "center",
        "lon": 35.11516,
        "lat": 7.42498,
        "elevationM": 1008
      },
      {
        "key": "north",
        "lon": 35.11516,
        "lat": 7.56761,
        "elevationM": 1017
      },
      {
        "key": "south",
        "lon": 35.11516,
        "lat": 7.28235,
        "elevationM": 869
      },
      {
        "key": "east",
        "lon": 35.23743,
        "lat": 7.42498,
        "elevationM": 1183
      },
      {
        "key": "west",
        "lon": 34.99289,
        "lat": 7.42498,
        "elevationM": 1002
      }
    ],
    "elevationRangeM": 314,
    "maxSlopePercent": 1.3,
    "meanSlopePercent": 0.57,
    "terrainReliefScore": 15
  },
  "Gambela__Nuwer": {
    "id": "Gambela__Nuwer",
    "region": "Gambela",
    "zone": "Nuwer",
    "sourceBoundaryName": "Nuer",
    "bbox": {
      "minLon": 33.00224221639699,
      "minLat": 7.70737538497069,
      "maxLon": 34.082918323914214,
      "maxLat": 8.518699608795663
    },
    "samples": [
      {
        "key": "center",
        "lon": 33.54258,
        "lat": 8.11304,
        "elevationM": 408
      },
      {
        "key": "north",
        "lon": 33.54258,
        "lat": 8.29153,
        "elevationM": 406
      },
      {
        "key": "south",
        "lon": 33.54258,
        "lat": 7.93455,
        "elevationM": 409
      },
      {
        "key": "east",
        "lon": 33.78033,
        "lat": 8.11304,
        "elevationM": 410
      },
      {
        "key": "west",
        "lon": 33.30483,
        "lat": 8.11304,
        "elevationM": 403
      }
    ],
    "elevationRangeM": 7,
    "maxSlopePercent": 0.02,
    "meanSlopePercent": 0.01,
    "terrainReliefScore": 0
  },
  "Oromia__Arsi": {
    "id": "Oromia__Arsi",
    "region": "Oromia",
    "zone": "Arsi",
    "sourceBoundaryName": "Arsi",
    "bbox": {
      "minLon": 38.68776471255262,
      "minLat": 7.15435819501573,
      "maxLon": 40.71717793729459,
      "maxLat": 8.863218784502921
    },
    "samples": [
      {
        "key": "center",
        "lon": 39.70247,
        "lat": 8.00879,
        "elevationM": 2509
      },
      {
        "key": "north",
        "lon": 39.70247,
        "lat": 8.38474,
        "elevationM": 2040
      },
      {
        "key": "south",
        "lon": 39.70247,
        "lat": 7.63284,
        "elevationM": 1575
      },
      {
        "key": "east",
        "lon": 40.14894,
        "lat": 8.00879,
        "elevationM": 1192
      },
      {
        "key": "west",
        "lon": 39.256,
        "lat": 8.00879,
        "elevationM": 2771
      }
    ],
    "elevationRangeM": 1579,
    "maxSlopePercent": 2.68,
    "meanSlopePercent": 1.64,
    "terrainReliefScore": 54
  },
  "Oromia__Bale": {
    "id": "Oromia__Bale",
    "region": "Oromia",
    "zone": "Bale",
    "sourceBoundaryName": "Bale",
    "bbox": {
      "minLon": 39.21844316385255,
      "minLat": 5.35474586238024,
      "maxLon": 42.21076232350536,
      "maxLat": 8.148550956524268
    },
    "samples": [
      {
        "key": "center",
        "lon": 40.7146,
        "lat": 6.75165,
        "elevationM": 1381
      },
      {
        "key": "north",
        "lon": 40.7146,
        "lat": 7.36629,
        "elevationM": 1836
      },
      {
        "key": "south",
        "lon": 40.7146,
        "lat": 6.13701,
        "elevationM": 940
      },
      {
        "key": "east",
        "lon": 41.37291,
        "lat": 6.75165,
        "elevationM": 1087
      },
      {
        "key": "west",
        "lon": 40.05629,
        "lat": 6.75165,
        "elevationM": 1611
      }
    ],
    "elevationRangeM": 896,
    "maxSlopePercent": 0.66,
    "meanSlopePercent": 0.51,
    "terrainReliefScore": 25
  },
  "Oromia__Borena": {
    "id": "Oromia__Borena",
    "region": "Oromia",
    "zone": "Borena",
    "sourceBoundaryName": "Borena",
    "bbox": {
      "minLon": 36.64719372658588,
      "minLat": 3.511191788152185,
      "maxLon": 39.746751949840515,
      "maxLat": 6.597329582184396
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.19697,
        "lat": 5.05426,
        "elevationM": 1704
      },
      {
        "key": "north",
        "lon": 38.19697,
        "lat": 5.73321,
        "elevationM": 1824
      },
      {
        "key": "south",
        "lon": 38.19697,
        "lat": 4.37531,
        "elevationM": 1555
      },
      {
        "key": "east",
        "lon": 38.87887,
        "lat": 5.05426,
        "elevationM": 1275
      },
      {
        "key": "west",
        "lon": 37.51507,
        "lat": 5.05426,
        "elevationM": 1295
      }
    ],
    "elevationRangeM": 549,
    "maxSlopePercent": 0.57,
    "meanSlopePercent": 0.37,
    "terrainReliefScore": 16
  },
  "Oromia__East Hararge": {
    "id": "Oromia__East Hararge",
    "region": "Oromia",
    "zone": "East Hararge",
    "sourceBoundaryName": "East Harerge",
    "bbox": {
      "minLon": 41.17546380389623,
      "minLat": 7.516115323396505,
      "maxLon": 42.98077820122813,
      "maxLat": 9.777515212842083
    },
    "samples": [
      {
        "key": "center",
        "lon": 42.07812,
        "lat": 8.64682,
        "elevationM": 1177
      },
      {
        "key": "north",
        "lon": 42.07812,
        "lat": 9.14433,
        "elevationM": 1727
      },
      {
        "key": "south",
        "lon": 42.07812,
        "lat": 8.14931,
        "elevationM": 942
      },
      {
        "key": "east",
        "lon": 42.47529,
        "lat": 8.64682,
        "elevationM": 1416
      },
      {
        "key": "west",
        "lon": 41.68095,
        "lat": 8.64682,
        "elevationM": 1478
      }
    ],
    "elevationRangeM": 785,
    "maxSlopePercent": 0.99,
    "meanSlopePercent": 0.66,
    "terrainReliefScore": 25
  },
  "Oromia__East Shewa": {
    "id": "Oromia__East Shewa",
    "region": "Oromia",
    "zone": "East Shewa",
    "sourceBoundaryName": "East Shewa",
    "bbox": {
      "minLon": 38.40165250705207,
      "minLat": 7.570629664856178,
      "maxLon": 40.067820730577985,
      "maxLat": 9.150299468909102
    },
    "samples": [
      {
        "key": "center",
        "lon": 39.23474,
        "lat": 8.36046,
        "elevationM": 1548
      },
      {
        "key": "north",
        "lon": 39.23474,
        "lat": 8.70799,
        "elevationM": 2231
      },
      {
        "key": "south",
        "lon": 39.23474,
        "lat": 8.01293,
        "elevationM": 2628
      },
      {
        "key": "east",
        "lon": 39.6013,
        "lat": 8.36046,
        "elevationM": 2022
      },
      {
        "key": "west",
        "lon": 38.86818,
        "lat": 8.36046,
        "elevationM": 1680
      }
    ],
    "elevationRangeM": 1080,
    "maxSlopePercent": 2.79,
    "meanSlopePercent": 1.51,
    "terrainReliefScore": 42
  },
  "Oromia__East Wellega": {
    "id": "Oromia__East Wellega",
    "region": "Oromia",
    "zone": "East Wellega",
    "sourceBoundaryName": "East Wellega",
    "bbox": {
      "minLon": 36.10606773395382,
      "minLat": 8.512128712678866,
      "maxLon": 37.187818413312854,
      "maxLat": 10.368239242574752
    },
    "samples": [
      {
        "key": "center",
        "lon": 36.64694,
        "lat": 9.44018,
        "elevationM": 1361
      },
      {
        "key": "north",
        "lon": 36.64694,
        "lat": 9.84852,
        "elevationM": 2053
      },
      {
        "key": "south",
        "lon": 36.64694,
        "lat": 9.03184,
        "elevationM": 1910
      },
      {
        "key": "east",
        "lon": 36.88493,
        "lat": 9.44018,
        "elevationM": 1446
      },
      {
        "key": "west",
        "lon": 36.40895,
        "lat": 9.44018,
        "elevationM": 1504
      }
    ],
    "elevationRangeM": 692,
    "maxSlopePercent": 1.52,
    "meanSlopePercent": 0.9,
    "terrainReliefScore": 26
  },
  "Oromia__Guji": {
    "id": "Oromia__Guji",
    "region": "Oromia",
    "zone": "Guji",
    "sourceBoundaryName": "Guji",
    "bbox": {
      "minLon": 38.27253245004713,
      "minLat": 4.656939257322584,
      "maxLon": 40.034541236810085,
      "maxLat": 6.441727914540871
    },
    "samples": [
      {
        "key": "center",
        "lon": 39.15354,
        "lat": 5.54933,
        "elevationM": 1722
      },
      {
        "key": "north",
        "lon": 39.15354,
        "lat": 5.94198,
        "elevationM": 1923
      },
      {
        "key": "south",
        "lon": 39.15354,
        "lat": 5.15668,
        "elevationM": 904
      },
      {
        "key": "east",
        "lon": 39.54118,
        "lat": 5.54933,
        "elevationM": 1619
      },
      {
        "key": "west",
        "lon": 38.7659,
        "lat": 5.54933,
        "elevationM": 1716
      }
    ],
    "elevationRangeM": 1019,
    "maxSlopePercent": 1.87,
    "meanSlopePercent": 0.65,
    "terrainReliefScore": 34
  },
  "Oromia__Horo Gudru Wellega": {
    "id": "Oromia__Horo Gudru Wellega",
    "region": "Oromia",
    "zone": "Horo Gudru Wellega",
    "sourceBoundaryName": "Horo Guduru",
    "bbox": {
      "minLon": 36.65200034616731,
      "minLat": 9.157919367174156,
      "maxLon": 37.67531131300107,
      "maxLat": 10.343402319357356
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.16366,
        "lat": 9.75066,
        "elevationM": 2539
      },
      {
        "key": "north",
        "lon": 37.16366,
        "lat": 10.01147,
        "elevationM": 1530
      },
      {
        "key": "south",
        "lon": 37.16366,
        "lat": 9.48985,
        "elevationM": 2219
      },
      {
        "key": "east",
        "lon": 37.38879,
        "lat": 9.75066,
        "elevationM": 1530
      },
      {
        "key": "west",
        "lon": 36.93853,
        "lat": 9.75066,
        "elevationM": 1811
      }
    ],
    "elevationRangeM": 1009,
    "maxSlopePercent": 4.09,
    "meanSlopePercent": 2.9,
    "terrainReliefScore": 52
  },
  "Oromia__Ilu Aba Bora": {
    "id": "Oromia__Ilu Aba Bora",
    "region": "Oromia",
    "zone": "Ilu Aba Bora",
    "sourceBoundaryName": "Ilubabor",
    "bbox": {
      "minLon": 34.9327277258259,
      "minLat": 7.646263195236756,
      "maxLon": 36.82056549152522,
      "maxLat": 9.081074917462827
    },
    "samples": [
      {
        "key": "center",
        "lon": 35.87665,
        "lat": 8.36367,
        "elevationM": 1462
      },
      {
        "key": "north",
        "lon": 35.87665,
        "lat": 8.67933,
        "elevationM": 2041
      },
      {
        "key": "south",
        "lon": 35.87665,
        "lat": 8.04801,
        "elevationM": 2291
      },
      {
        "key": "east",
        "lon": 36.29197,
        "lat": 8.36367,
        "elevationM": 1933
      },
      {
        "key": "west",
        "lon": 35.46133,
        "lat": 8.36367,
        "elevationM": 1636
      }
    ],
    "elevationRangeM": 829,
    "maxSlopePercent": 2.36,
    "meanSlopePercent": 1.35,
    "terrainReliefScore": 34
  },
  "Oromia__Jimma": {
    "id": "Oromia__Jimma",
    "region": "Oromia",
    "zone": "Jimma",
    "sourceBoundaryName": "Jimma",
    "bbox": {
      "minLon": 35.84938989006271,
      "minLat": 7.22570045055866,
      "maxLon": 37.62469865048416,
      "maxLat": 8.873164883138937
    },
    "samples": [
      {
        "key": "center",
        "lon": 36.73704,
        "lat": 8.04943,
        "elevationM": 1416
      },
      {
        "key": "north",
        "lon": 36.73704,
        "lat": 8.41187,
        "elevationM": 1352
      },
      {
        "key": "south",
        "lon": 36.73704,
        "lat": 7.68699,
        "elevationM": 1986
      },
      {
        "key": "east",
        "lon": 37.12761,
        "lat": 8.04943,
        "elevationM": 1900
      },
      {
        "key": "west",
        "lon": 36.34647,
        "lat": 8.04943,
        "elevationM": 2023
      }
    ],
    "elevationRangeM": 671,
    "maxSlopePercent": 1.41,
    "meanSlopePercent": 1.03,
    "terrainReliefScore": 25
  },
  "Oromia__Kelem Wellega": {
    "id": "Oromia__Kelem Wellega",
    "region": "Oromia",
    "zone": "Kelem Wellega",
    "sourceBoundaryName": "Kelem Wellega",
    "bbox": {
      "minLon": 34.14023202111278,
      "minLat": 8.24846544557912,
      "maxLon": 35.430889131778535,
      "maxLat": 9.368680160053826
    },
    "samples": [
      {
        "key": "center",
        "lon": 34.78556,
        "lat": 8.80857,
        "elevationM": 1956
      },
      {
        "key": "north",
        "lon": 34.78556,
        "lat": 9.05502,
        "elevationM": 1543
      },
      {
        "key": "south",
        "lon": 34.78556,
        "lat": 8.56212,
        "elevationM": 1835
      },
      {
        "key": "east",
        "lon": 35.0695,
        "lat": 8.80857,
        "elevationM": 1505
      },
      {
        "key": "west",
        "lon": 34.50162,
        "lat": 8.80857,
        "elevationM": 824
      }
    ],
    "elevationRangeM": 1132,
    "maxSlopePercent": 3.62,
    "meanSlopePercent": 1.75,
    "terrainReliefScore": 48
  },
  "Oromia__North Shewa (OR)": {
    "id": "Oromia__North Shewa (OR)",
    "region": "Oromia",
    "zone": "North Shewa (OR)",
    "sourceBoundaryName": "North Shewa(R4)",
    "bbox": {
      "minLon": 37.933104717823326,
      "minLat": 8.911396975288508,
      "maxLon": 39.45472948571644,
      "maxLat": 10.387792414097724
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.69392,
        "lat": 9.64959,
        "elevationM": 2542
      },
      {
        "key": "north",
        "lon": 38.69392,
        "lat": 9.9744,
        "elevationM": 1486
      },
      {
        "key": "south",
        "lon": 38.69392,
        "lat": 9.32478,
        "elevationM": 2572
      },
      {
        "key": "east",
        "lon": 39.02868,
        "lat": 9.64959,
        "elevationM": 2577
      },
      {
        "key": "west",
        "lon": 38.35916,
        "lat": 9.64959,
        "elevationM": 1431
      }
    ],
    "elevationRangeM": 1146,
    "maxSlopePercent": 3.02,
    "meanSlopePercent": 1.53,
    "terrainReliefScore": 45
  },
  "Oromia__South West Shewa": {
    "id": "Oromia__South West Shewa",
    "region": "Oromia",
    "zone": "South West Shewa",
    "sourceBoundaryName": "South West Shewa",
    "bbox": {
      "minLon": 37.53574384426248,
      "minLat": 8.255352162264723,
      "maxLon": 38.7675213090106,
      "maxLat": 9.015176151509738
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.15163,
        "lat": 8.63526,
        "elevationM": 2285
      },
      {
        "key": "north",
        "lon": 38.15163,
        "lat": 8.80242,
        "elevationM": 2151
      },
      {
        "key": "south",
        "lon": 38.15163,
        "lat": 8.4681,
        "elevationM": 2288
      },
      {
        "key": "east",
        "lon": 38.42262,
        "lat": 8.63526,
        "elevationM": 2168
      },
      {
        "key": "west",
        "lon": 37.88064,
        "lat": 8.63526,
        "elevationM": 2208
      }
    ],
    "elevationRangeM": 137,
    "maxSlopePercent": 0.72,
    "meanSlopePercent": 0.35,
    "terrainReliefScore": 8
  },
  "Oromia__West Arsi": {
    "id": "Oromia__West Arsi",
    "region": "Oromia",
    "zone": "West Arsi",
    "sourceBoundaryName": "West Arsi",
    "bbox": {
      "minLon": 38.06224843784271,
      "minLat": 6.292125488638816,
      "maxLon": 39.7715095369883,
      "maxLat": 7.706948604452058
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.91688,
        "lat": 6.99954,
        "elevationM": 2567
      },
      {
        "key": "north",
        "lon": 38.91688,
        "lat": 7.3108,
        "elevationM": 2738
      },
      {
        "key": "south",
        "lon": 38.91688,
        "lat": 6.68828,
        "elevationM": 2609
      },
      {
        "key": "east",
        "lon": 39.29292,
        "lat": 6.99954,
        "elevationM": 2395
      },
      {
        "key": "west",
        "lon": 38.54084,
        "lat": 6.99954,
        "elevationM": 1699
      }
    ],
    "elevationRangeM": 1039,
    "maxSlopePercent": 2.09,
    "meanSlopePercent": 0.78,
    "terrainReliefScore": 35
  },
  "Oromia__West Hararge": {
    "id": "Oromia__West Hararge",
    "region": "Oromia",
    "zone": "West Hararge",
    "sourceBoundaryName": "West Harerge",
    "bbox": {
      "minLon": 40.02604387649347,
      "minLat": 7.879353467864032,
      "maxLon": 41.57096040663846,
      "maxLat": 9.481989311993148
    },
    "samples": [
      {
        "key": "center",
        "lon": 40.7985,
        "lat": 8.68067,
        "elevationM": 1637
      },
      {
        "key": "north",
        "lon": 40.7985,
        "lat": 9.03325,
        "elevationM": 2158
      },
      {
        "key": "south",
        "lon": 40.7985,
        "lat": 8.32809,
        "elevationM": 1146
      },
      {
        "key": "east",
        "lon": 41.13838,
        "lat": 8.68067,
        "elevationM": 1488
      },
      {
        "key": "west",
        "lon": 40.45862,
        "lat": 8.68067,
        "elevationM": 1721
      }
    ],
    "elevationRangeM": 1012,
    "maxSlopePercent": 1.33,
    "meanSlopePercent": 0.8,
    "terrainReliefScore": 32
  },
  "Oromia__West Shewa": {
    "id": "Oromia__West Shewa",
    "region": "Oromia",
    "zone": "West Shewa",
    "sourceBoundaryName": "West Shewa",
    "bbox": {
      "minLon": 37.02813490670279,
      "minLat": 8.312801111301837,
      "maxLon": 38.71004119146281,
      "maxLat": 9.936743386052472
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.86909,
        "lat": 9.12477,
        "elevationM": 1938
      },
      {
        "key": "north",
        "lon": 37.86909,
        "lat": 9.48204,
        "elevationM": 1525
      },
      {
        "key": "south",
        "lon": 37.86909,
        "lat": 8.7675,
        "elevationM": 3075
      },
      {
        "key": "east",
        "lon": 38.23911,
        "lat": 9.12477,
        "elevationM": 2851
      },
      {
        "key": "west",
        "lon": 37.49907,
        "lat": 9.12477,
        "elevationM": 2743
      }
    ],
    "elevationRangeM": 1550,
    "maxSlopePercent": 2.86,
    "meanSlopePercent": 2.03,
    "terrainReliefScore": 55
  },
  "Oromia__West Wellega": {
    "id": "Oromia__West Wellega",
    "region": "Oromia",
    "zone": "West Wellega",
    "sourceBoundaryName": "West Wellega",
    "bbox": {
      "minLon": 34.34161638520012,
      "minLat": 8.661909210577486,
      "maxLon": 36.05438913115099,
      "maxLat": 9.997732989168725
    },
    "samples": [
      {
        "key": "center",
        "lon": 35.198,
        "lat": 9.32982,
        "elevationM": 1501
      },
      {
        "key": "north",
        "lon": 35.198,
        "lat": 9.6237,
        "elevationM": 1575
      },
      {
        "key": "south",
        "lon": 35.198,
        "lat": 9.03594,
        "elevationM": 1652
      },
      {
        "key": "east",
        "lon": 35.57481,
        "lat": 9.32982,
        "elevationM": 1971
      },
      {
        "key": "west",
        "lon": 34.82119,
        "lat": 9.32982,
        "elevationM": 1412
      }
    ],
    "elevationRangeM": 559,
    "maxSlopePercent": 1.14,
    "meanSlopePercent": 0.51,
    "terrainReliefScore": 20
  },
  "SNNPR__Basketo": {
    "id": "SNNPR__Basketo",
    "region": "SNNPR",
    "zone": "Basketo",
    "sourceBoundaryName": "Basketo",
    "bbox": {
      "minLon": 36.399003201090494,
      "minLat": 6.142840359977141,
      "maxLon": 36.69005991849896,
      "maxLat": 6.386860477102335
    },
    "samples": [
      {
        "key": "center",
        "lon": 36.54453,
        "lat": 6.26485,
        "elevationM": 893
      },
      {
        "key": "north",
        "lon": 36.54453,
        "lat": 6.31853,
        "elevationM": 1048
      },
      {
        "key": "south",
        "lon": 36.54453,
        "lat": 6.21117,
        "elevationM": 1085
      },
      {
        "key": "east",
        "lon": 36.60856,
        "lat": 6.26485,
        "elevationM": 1802
      },
      {
        "key": "west",
        "lon": 36.4805,
        "lat": 6.26485,
        "elevationM": 732
      }
    ],
    "elevationRangeM": 1070,
    "maxSlopePercent": 12.83,
    "meanSlopePercent": 5.23,
    "terrainReliefScore": 84
  },
  "SNNPR__Bench Sheko": {
    "id": "SNNPR__Bench Sheko",
    "region": "SNNPR",
    "zone": "Bench Sheko",
    "sourceBoundaryName": "Bench Maji",
    "bbox": {
      "minLon": 34.87783013638691,
      "minLat": 5.33033978271642,
      "maxLon": 36.134412247228305,
      "maxLat": 7.23523553909201
    },
    "samples": [
      {
        "key": "center",
        "lon": 35.50612,
        "lat": 6.28279,
        "elevationM": 1219
      },
      {
        "key": "north",
        "lon": 35.50612,
        "lat": 6.70187,
        "elevationM": 1279
      },
      {
        "key": "south",
        "lon": 35.50612,
        "lat": 5.86371,
        "elevationM": 810
      },
      {
        "key": "east",
        "lon": 35.78257,
        "lat": 6.28279,
        "elevationM": 1230
      },
      {
        "key": "west",
        "lon": 35.22967,
        "lat": 6.28279,
        "elevationM": 1130
      }
    ],
    "elevationRangeM": 469,
    "maxSlopePercent": 0.88,
    "meanSlopePercent": 0.33,
    "terrainReliefScore": 16
  },
  "SNNPR__Dawuro": {
    "id": "SNNPR__Dawuro",
    "region": "SNNPR",
    "zone": "Dawuro",
    "sourceBoundaryName": "Dawro",
    "bbox": {
      "minLon": 36.68029534784988,
      "minLat": 6.591120337530308,
      "maxLon": 37.53635050478887,
      "maxLat": 7.344638444696382
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.10832,
        "lat": 6.96788,
        "elevationM": 1822
      },
      {
        "key": "north",
        "lon": 37.10832,
        "lat": 7.13365,
        "elevationM": 1626
      },
      {
        "key": "south",
        "lon": 37.10832,
        "lat": 6.80211,
        "elevationM": 1879
      },
      {
        "key": "east",
        "lon": 37.29665,
        "lat": 6.96788,
        "elevationM": 1595
      },
      {
        "key": "west",
        "lon": 36.91999,
        "lat": 6.96788,
        "elevationM": 1320
      }
    ],
    "elevationRangeM": 559,
    "maxSlopePercent": 2.41,
    "meanSlopePercent": 1.22,
    "terrainReliefScore": 28
  },
  "SNNPR__Gamo": {
    "id": "SNNPR__Gamo",
    "region": "SNNPR",
    "zone": "Gamo",
    "sourceBoundaryName": "Gamo Gofa",
    "bbox": {
      "minLon": 36.37203339727804,
      "minLat": 5.618657589926983,
      "maxLon": 37.85296909922621,
      "maxLat": 6.712040832082367
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.1125,
        "lat": 6.16535,
        "elevationM": 1328
      },
      {
        "key": "north",
        "lon": 37.1125,
        "lat": 6.40589,
        "elevationM": 1107
      },
      {
        "key": "south",
        "lon": 37.1125,
        "lat": 5.92481,
        "elevationM": 1339
      },
      {
        "key": "east",
        "lon": 37.43831,
        "lat": 6.16535,
        "elevationM": 2283
      },
      {
        "key": "west",
        "lon": 36.78669,
        "lat": 6.16535,
        "elevationM": 1791
      }
    ],
    "elevationRangeM": 1176,
    "maxSlopePercent": 2.65,
    "meanSlopePercent": 1.2,
    "terrainReliefScore": 43
  },
  "SNNPR__Gedeo": {
    "id": "SNNPR__Gedeo",
    "region": "SNNPR",
    "zone": "Gedeo",
    "sourceBoundaryName": "Gedio",
    "bbox": {
      "minLon": 38.08068168989011,
      "minLat": 5.839937636176161,
      "maxLon": 38.43979809790627,
      "maxLat": 6.41697501309182
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.26024,
        "lat": 6.12846,
        "elevationM": 2231
      },
      {
        "key": "north",
        "lon": 38.26024,
        "lat": 6.25541,
        "elevationM": 1987
      },
      {
        "key": "south",
        "lon": 38.26024,
        "lat": 6.00151,
        "elevationM": 2488
      },
      {
        "key": "east",
        "lon": 38.33925,
        "lat": 6.12846,
        "elevationM": 2738
      },
      {
        "key": "west",
        "lon": 38.18123,
        "lat": 6.12846,
        "elevationM": 1901
      }
    ],
    "elevationRangeM": 837,
    "maxSlopePercent": 5.8,
    "meanSlopePercent": 3.28,
    "terrainReliefScore": 57
  },
  "SNNPR__Guraghe": {
    "id": "SNNPR__Guraghe",
    "region": "SNNPR",
    "zone": "Guraghe",
    "sourceBoundaryName": "Gurage",
    "bbox": {
      "minLon": 37.46338195818419,
      "minLat": 7.753139311445268,
      "maxLon": 38.7168545141667,
      "maxLat": 8.458712666907726
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.09012,
        "lat": 8.10593,
        "elevationM": 2752
      },
      {
        "key": "north",
        "lon": 38.09012,
        "lat": 8.26116,
        "elevationM": 2170
      },
      {
        "key": "south",
        "lon": 38.09012,
        "lat": 7.9507,
        "elevationM": 2876
      },
      {
        "key": "east",
        "lon": 38.36588,
        "lat": 8.10593,
        "elevationM": 2065
      },
      {
        "key": "west",
        "lon": 37.81436,
        "lat": 8.10593,
        "elevationM": 1969
      }
    ],
    "elevationRangeM": 907,
    "maxSlopePercent": 3.37,
    "meanSlopePercent": 2.23,
    "terrainReliefScore": 44
  },
  "SNNPR__Hadiya": {
    "id": "SNNPR__Hadiya",
    "region": "SNNPR",
    "zone": "Hadiya",
    "sourceBoundaryName": "Hadiya",
    "bbox": {
      "minLon": 37.33196084004001,
      "minLat": 7.062985477126849,
      "maxLon": 38.12185424817147,
      "maxLat": 7.916370892366323
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.72691,
        "lat": 7.48968,
        "elevationM": 2084
      },
      {
        "key": "north",
        "lon": 37.72691,
        "lat": 7.67742,
        "elevationM": 2005
      },
      {
        "key": "south",
        "lon": 37.72691,
        "lat": 7.30194,
        "elevationM": 2237
      },
      {
        "key": "east",
        "lon": 37.90069,
        "lat": 7.48968,
        "elevationM": 2120
      },
      {
        "key": "west",
        "lon": 37.55313,
        "lat": 7.48968,
        "elevationM": 1705
      }
    ],
    "elevationRangeM": 532,
    "maxSlopePercent": 1.98,
    "meanSlopePercent": 0.82,
    "terrainReliefScore": 24
  },
  "SNNPR__Halaba": {
    "id": "SNNPR__Halaba",
    "region": "SNNPR",
    "zone": "Halaba",
    "sourceBoundaryName": "Alaba",
    "bbox": {
      "minLon": 37.985885824719126,
      "minLat": 7.208299449091226,
      "maxLon": 38.43037128513457,
      "maxLat": 7.611449364138982
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.20813,
        "lat": 7.40987,
        "elevationM": 2061
      },
      {
        "key": "north",
        "lon": 38.20813,
        "lat": 7.49856,
        "elevationM": 1956
      },
      {
        "key": "south",
        "lon": 38.20813,
        "lat": 7.32118,
        "elevationM": 1883
      },
      {
        "key": "east",
        "lon": 38.30592,
        "lat": 7.40987,
        "elevationM": 1799
      },
      {
        "key": "west",
        "lon": 38.11034,
        "lat": 7.40987,
        "elevationM": 1835
      }
    ],
    "elevationRangeM": 262,
    "maxSlopePercent": 2.43,
    "meanSlopePercent": 1.85,
    "terrainReliefScore": 24
  },
  "SNNPR__Kefa": {
    "id": "SNNPR__Kefa",
    "region": "SNNPR",
    "zone": "Kefa",
    "sourceBoundaryName": "Keffa",
    "bbox": {
      "minLon": 35.48193945762852,
      "minLat": 6.238810987954315,
      "maxLon": 36.785018254545975,
      "maxLat": 8.083556340106792
    },
    "samples": [
      {
        "key": "center",
        "lon": 36.13348,
        "lat": 7.16118,
        "elevationM": 1860
      },
      {
        "key": "north",
        "lon": 36.13348,
        "lat": 7.56702,
        "elevationM": 1815
      },
      {
        "key": "south",
        "lon": 36.13348,
        "lat": 6.75534,
        "elevationM": 818
      },
      {
        "key": "east",
        "lon": 36.42016,
        "lat": 7.16118,
        "elevationM": 2067
      },
      {
        "key": "west",
        "lon": 35.8468,
        "lat": 7.16118,
        "elevationM": 2167
      }
    ],
    "elevationRangeM": 1349,
    "maxSlopePercent": 2.31,
    "meanSlopePercent": 1.01,
    "terrainReliefScore": 44
  },
  "SNNPR__Kembata Tembaro": {
    "id": "SNNPR__Kembata Tembaro",
    "region": "SNNPR",
    "zone": "Kembata Tembaro",
    "sourceBoundaryName": "KT",
    "bbox": {
      "minLon": 37.34799965276287,
      "minLat": 7.144318017658812,
      "maxLon": 38.058944680584055,
      "maxLat": 7.474977530886242
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.70347,
        "lat": 7.30965,
        "elevationM": 2475
      },
      {
        "key": "north",
        "lon": 37.70347,
        "lat": 7.3824,
        "elevationM": 2350
      },
      {
        "key": "south",
        "lon": 37.70347,
        "lat": 7.2369,
        "elevationM": 1813
      },
      {
        "key": "east",
        "lon": 37.85988,
        "lat": 7.30965,
        "elevationM": 2411
      },
      {
        "key": "west",
        "lon": 37.54706,
        "lat": 7.30965,
        "elevationM": 2325
      }
    ],
    "elevationRangeM": 662,
    "maxSlopePercent": 8.17,
    "meanSlopePercent": 2.74,
    "terrainReliefScore": 62
  },
  "SNNPR__Konta Special": {
    "id": "SNNPR__Konta Special",
    "region": "SNNPR",
    "zone": "Konta Special",
    "sourceBoundaryName": "Konta",
    "bbox": {
      "minLon": 36.32190315333714,
      "minLat": 6.452910905534699,
      "maxLon": 36.96659428110714,
      "maxLat": 7.330890137666423
    },
    "samples": [
      {
        "key": "center",
        "lon": 36.64425,
        "lat": 6.8919,
        "elevationM": 1248
      },
      {
        "key": "north",
        "lon": 36.64425,
        "lat": 7.08506,
        "elevationM": 2180
      },
      {
        "key": "south",
        "lon": 36.64425,
        "lat": 6.69874,
        "elevationM": 898
      },
      {
        "key": "east",
        "lon": 36.78608,
        "lat": 6.8919,
        "elevationM": 904
      },
      {
        "key": "west",
        "lon": 36.50242,
        "lat": 6.8919,
        "elevationM": 965
      }
    ],
    "elevationRangeM": 1282,
    "maxSlopePercent": 4.33,
    "meanSlopePercent": 2.49,
    "terrainReliefScore": 58
  },
  "SNNPR__Segen Peoples'": {
    "id": "SNNPR__Segen Peoples'",
    "region": "SNNPR",
    "zone": "Segen Peoples'",
    "sourceBoundaryName": "Segen Peoples'",
    "bbox": {
      "minLon": 37.004104248351275,
      "minLat": 5.156487518198104,
      "maxLon": 38.08970162170301,
      "maxLat": 6.012251403976111
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.5469,
        "lat": 5.58437,
        "elevationM": 1608
      },
      {
        "key": "north",
        "lon": 37.5469,
        "lat": 5.77264,
        "elevationM": 1105
      },
      {
        "key": "south",
        "lon": 37.5469,
        "lat": 5.3961,
        "elevationM": 1050
      },
      {
        "key": "east",
        "lon": 37.78573,
        "lat": 5.58437,
        "elevationM": 1404
      },
      {
        "key": "west",
        "lon": 37.30807,
        "lat": 5.58437,
        "elevationM": 2037
      }
    ],
    "elevationRangeM": 987,
    "maxSlopePercent": 2.66,
    "meanSlopePercent": 1.86,
    "terrainReliefScore": 41
  },
  "SNNPR__Sheka": {
    "id": "SNNPR__Sheka",
    "region": "SNNPR",
    "zone": "Sheka",
    "sourceBoundaryName": "Sheka",
    "bbox": {
      "minLon": 35.11639082533913,
      "minLat": 7.119092988861229,
      "maxLon": 35.664932412623045,
      "maxLat": 7.896755040070315
    },
    "samples": [
      {
        "key": "center",
        "lon": 35.39066,
        "lat": 7.50792,
        "elevationM": 1920
      },
      {
        "key": "north",
        "lon": 35.39066,
        "lat": 7.67901,
        "elevationM": 2414
      },
      {
        "key": "south",
        "lon": 35.39066,
        "lat": 7.33683,
        "elevationM": 2059
      },
      {
        "key": "east",
        "lon": 35.51134,
        "lat": 7.50792,
        "elevationM": 2538
      },
      {
        "key": "west",
        "lon": 35.26998,
        "lat": 7.50792,
        "elevationM": 1494
      }
    ],
    "elevationRangeM": 1044,
    "maxSlopePercent": 4.64,
    "meanSlopePercent": 2.79,
    "terrainReliefScore": 55
  },
  "SNNPR__Sidama": {
    "id": "SNNPR__Sidama",
    "region": "SNNPR",
    "zone": "Sidama",
    "sourceBoundaryName": "Sidama",
    "bbox": {
      "minLon": 37.90640405509221,
      "minLat": 6.138736834547315,
      "maxLon": 39.13270136601689,
      "maxLat": 7.165660002163865
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.51955,
        "lat": 6.6522,
        "elevationM": 2553
      },
      {
        "key": "north",
        "lon": 38.51955,
        "lat": 6.87812,
        "elevationM": 2057
      },
      {
        "key": "south",
        "lon": 38.51955,
        "lat": 6.42628,
        "elevationM": 2701
      },
      {
        "key": "east",
        "lon": 38.78934,
        "lat": 6.6522,
        "elevationM": 2706
      },
      {
        "key": "west",
        "lon": 38.24976,
        "lat": 6.6522,
        "elevationM": 1678
      }
    ],
    "elevationRangeM": 1028,
    "maxSlopePercent": 2.93,
    "meanSlopePercent": 1.5,
    "terrainReliefScore": 42
  },
  "SNNPR__Siltie": {
    "id": "SNNPR__Siltie",
    "region": "SNNPR",
    "zone": "Siltie",
    "sourceBoundaryName": "Selti",
    "bbox": {
      "minLon": 37.865154362757075,
      "minLat": 7.405710148177316,
      "maxLon": 38.52898679886419,
      "maxLat": 8.100685538208262
    },
    "samples": [
      {
        "key": "center",
        "lon": 38.19707,
        "lat": 7.7532,
        "elevationM": 2100
      },
      {
        "key": "north",
        "lon": 38.19707,
        "lat": 7.90609,
        "elevationM": 2232
      },
      {
        "key": "south",
        "lon": 38.19707,
        "lat": 7.60031,
        "elevationM": 1857
      },
      {
        "key": "east",
        "lon": 38.34311,
        "lat": 7.7532,
        "elevationM": 1858
      },
      {
        "key": "west",
        "lon": 38.05103,
        "lat": 7.7532,
        "elevationM": 2147
      }
    ],
    "elevationRangeM": 375,
    "maxSlopePercent": 1.5,
    "meanSlopePercent": 1,
    "terrainReliefScore": 19
  },
  "SNNPR__South Omo": {
    "id": "SNNPR__South Omo",
    "region": "SNNPR",
    "zone": "South Omo",
    "sourceBoundaryName": "South Omo",
    "bbox": {
      "minLon": 35.73656619689155,
      "minLat": 4.440605853664494,
      "maxLon": 37.06372581370625,
      "maxLat": 6.459780960077342
    },
    "samples": [
      {
        "key": "center",
        "lon": 36.40015,
        "lat": 5.45019,
        "elevationM": 782
      },
      {
        "key": "north",
        "lon": 36.40015,
        "lat": 5.89441,
        "elevationM": 821
      },
      {
        "key": "south",
        "lon": 36.40015,
        "lat": 5.00597,
        "elevationM": 846
      },
      {
        "key": "east",
        "lon": 36.69213,
        "lat": 5.45019,
        "elevationM": 1250
      },
      {
        "key": "west",
        "lon": 36.10817,
        "lat": 5.45019,
        "elevationM": 415
      }
    ],
    "elevationRangeM": 835,
    "maxSlopePercent": 1.45,
    "meanSlopePercent": 0.7,
    "terrainReliefScore": 28
  },
  "SNNPR__Wolayita": {
    "id": "SNNPR__Wolayita",
    "region": "SNNPR",
    "zone": "Wolayita",
    "sourceBoundaryName": "Wolayita",
    "bbox": {
      "minLon": 37.22493817466698,
      "minLat": 6.511838714111177,
      "maxLon": 38.13023316662645,
      "maxLat": 7.188620333255556
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.67759,
        "lat": 6.85023,
        "elevationM": 1898
      },
      {
        "key": "north",
        "lon": 37.67759,
        "lat": 6.99912,
        "elevationM": 1913
      },
      {
        "key": "south",
        "lon": 37.67759,
        "lat": 6.70134,
        "elevationM": 1661
      },
      {
        "key": "east",
        "lon": 37.87675,
        "lat": 6.85023,
        "elevationM": 1792
      },
      {
        "key": "west",
        "lon": 37.47843,
        "lat": 6.85023,
        "elevationM": 1794
      }
    ],
    "elevationRangeM": 252,
    "maxSlopePercent": 1.43,
    "meanSlopePercent": 0.62,
    "terrainReliefScore": 14
  },
  "SNNPR__Yem Special": {
    "id": "SNNPR__Yem Special",
    "region": "SNNPR",
    "zone": "Yem Special",
    "sourceBoundaryName": "Yem",
    "bbox": {
      "minLon": 37.388540978922585,
      "minLat": 7.565490853192383,
      "maxLon": 37.60766212967737,
      "maxLat": 8.01819499909717
    },
    "samples": [
      {
        "key": "center",
        "lon": 37.4981,
        "lat": 7.79184,
        "elevationM": 2135
      },
      {
        "key": "north",
        "lon": 37.4981,
        "lat": 7.89143,
        "elevationM": 2117
      },
      {
        "key": "south",
        "lon": 37.4981,
        "lat": 7.69225,
        "elevationM": 1734
      },
      {
        "key": "east",
        "lon": 37.54631,
        "lat": 7.79184,
        "elevationM": 1319
      },
      {
        "key": "west",
        "lon": 37.44989,
        "lat": 7.79184,
        "elevationM": 2263
      }
    ],
    "elevationRangeM": 944,
    "maxSlopePercent": 15.35,
    "meanSlopePercent": 5.38,
    "terrainReliefScore": 81
  }
};

export function terrainSampleForAdm2(id?: string) {
  return id ? TERRAIN_ADM2_SAMPLES[id] : undefined;
}
