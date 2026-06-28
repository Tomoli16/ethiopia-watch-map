export interface LandCoverAdm2Sample {
  id: string;
  region: string;
  zone: string;
  sourceBoundaryName: string;
  areaKm2: number;
  sampleGridSize: number;
  samples: {
    key: string;
    lon: number;
    lat: number;
    classValue: number;
    classLabel: string;
  }[];
  classShares: Record<string, {
    label: string;
    count: number;
    share: number;
  }>;
  croplandShare: number;
  builtUpShare: number;
  treeCoverShare: number;
  waterWetlandShare: number;
  openVegetationShare: number;
  landUseSafeguardScore: number;
}

export const LANDCOVER_ADM2: Record<string, LandCoverAdm2Sample> = {
  "Beneshangul Gumu__Assosa": {
    "id": "Beneshangul Gumu__Assosa",
    "region": "Beneshangul Gumu",
    "zone": "Assosa",
    "sourceBoundaryName": "Asosa",
    "areaKm2": 14456,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 34.30123,
        "lat": 9.27344,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 34.44231,
        "lat": 9.27344,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 34.58464,
        "lat": 9.27344,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 34.72572,
        "lat": 9.27344,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r1c5",
        "lon": 34.8668,
        "lat": 9.27344,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c6",
        "lon": 35.00913,
        "lat": 9.27344,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c7",
        "lon": 35.15021,
        "lat": 9.27344,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c1",
        "lon": 34.30123,
        "lat": 9.49249,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 34.44231,
        "lat": 9.49249,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 34.58464,
        "lat": 9.49249,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 34.72572,
        "lat": 9.49249,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 34.8668,
        "lat": 9.49249,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c6",
        "lon": 35.00913,
        "lat": 9.49249,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c7",
        "lon": 35.15021,
        "lat": 9.49249,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 34.30123,
        "lat": 9.71347,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 34.44231,
        "lat": 9.71347,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 34.58464,
        "lat": 9.71347,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 34.72572,
        "lat": 9.71347,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 34.8668,
        "lat": 9.71347,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c6",
        "lon": 35.00913,
        "lat": 9.71347,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c7",
        "lon": 35.15021,
        "lat": 9.71347,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 34.30123,
        "lat": 9.93251,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c2",
        "lon": 34.44231,
        "lat": 9.93251,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 34.58464,
        "lat": 9.93251,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c4",
        "lon": 34.72572,
        "lat": 9.93251,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c5",
        "lon": 34.8668,
        "lat": 9.93251,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c6",
        "lon": 35.00913,
        "lat": 9.93251,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c7",
        "lon": 35.15021,
        "lat": 9.93251,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c1",
        "lon": 34.30123,
        "lat": 10.15155,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 34.44231,
        "lat": 10.15155,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 34.58464,
        "lat": 10.15155,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 34.72572,
        "lat": 10.15155,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 34.8668,
        "lat": 10.15155,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c6",
        "lon": 35.00913,
        "lat": 10.15155,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c7",
        "lon": 35.15021,
        "lat": 10.15155,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c1",
        "lon": 34.30123,
        "lat": 10.37253,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c2",
        "lon": 34.44231,
        "lat": 10.37253,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c3",
        "lon": 34.58464,
        "lat": 10.37253,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c4",
        "lon": 34.72572,
        "lat": 10.37253,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c5",
        "lon": 34.8668,
        "lat": 10.37253,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 35.00913,
        "lat": 10.37253,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c7",
        "lon": 35.15021,
        "lat": 10.37253,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c1",
        "lon": 34.30123,
        "lat": 10.59158,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c2",
        "lon": 34.44231,
        "lat": 10.59158,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c3",
        "lon": 34.58464,
        "lat": 10.59158,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c4",
        "lon": 34.72572,
        "lat": 10.59158,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c5",
        "lon": 34.8668,
        "lat": 10.59158,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 35.00913,
        "lat": 10.59158,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c7",
        "lon": 35.15021,
        "lat": 10.59158,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 22,
        "share": 0.449
      },
      "20": {
        "label": "Shrubland",
        "count": 6,
        "share": 0.122
      },
      "30": {
        "label": "Grassland",
        "count": 13,
        "share": 0.265
      },
      "40": {
        "label": "Cropland",
        "count": 6,
        "share": 0.122
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.02
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 1,
        "share": 0.02
      }
    },
    "croplandShare": 0.122,
    "builtUpShare": 0,
    "treeCoverShare": 0.449,
    "waterWetlandShare": 0.041,
    "openVegetationShare": 0.388,
    "landUseSafeguardScore": 68
  },
  "Beneshangul Gumu__Kamashi": {
    "id": "Beneshangul Gumu__Kamashi",
    "region": "Beneshangul Gumu",
    "zone": "Kamashi",
    "sourceBoundaryName": "Kemashi",
    "areaKm2": 10141,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 35.23504,
        "lat": 9.31588,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 35.43117,
        "lat": 9.31588,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 35.62903,
        "lat": 9.31588,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 35.82516,
        "lat": 9.31588,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c5",
        "lon": 36.02129,
        "lat": 9.31588,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c6",
        "lon": 36.21915,
        "lat": 9.31588,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c7",
        "lon": 36.41528,
        "lat": 9.31588,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c1",
        "lon": 35.23504,
        "lat": 9.5734,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 35.43117,
        "lat": 9.5734,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 35.62903,
        "lat": 9.5734,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 35.82516,
        "lat": 9.5734,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 36.02129,
        "lat": 9.5734,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c6",
        "lon": 36.21915,
        "lat": 9.5734,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 36.41528,
        "lat": 9.5734,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c1",
        "lon": 35.23504,
        "lat": 9.83319,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 35.43117,
        "lat": 9.83319,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 35.62903,
        "lat": 9.83319,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.82516,
        "lat": 9.83319,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 36.02129,
        "lat": 9.83319,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 36.21915,
        "lat": 9.83319,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c7",
        "lon": 36.41528,
        "lat": 9.83319,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c1",
        "lon": 35.23504,
        "lat": 10.09071,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 35.43117,
        "lat": 10.09071,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 35.62903,
        "lat": 10.09071,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 35.82516,
        "lat": 10.09071,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 36.02129,
        "lat": 10.09071,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c6",
        "lon": 36.21915,
        "lat": 10.09071,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c7",
        "lon": 36.41528,
        "lat": 10.09071,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 35.23504,
        "lat": 10.34823,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 35.43117,
        "lat": 10.34823,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 35.62903,
        "lat": 10.34823,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 35.82516,
        "lat": 10.34823,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 36.02129,
        "lat": 10.34823,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c6",
        "lon": 36.21915,
        "lat": 10.34823,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c7",
        "lon": 36.41528,
        "lat": 10.34823,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c1",
        "lon": 35.23504,
        "lat": 10.60802,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c2",
        "lon": 35.43117,
        "lat": 10.60802,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c3",
        "lon": 35.62903,
        "lat": 10.60802,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c4",
        "lon": 35.82516,
        "lat": 10.60802,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c5",
        "lon": 36.02129,
        "lat": 10.60802,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c6",
        "lon": 36.21915,
        "lat": 10.60802,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c7",
        "lon": 36.41528,
        "lat": 10.60802,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c1",
        "lon": 35.23504,
        "lat": 10.86554,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c2",
        "lon": 35.43117,
        "lat": 10.86554,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c3",
        "lon": 35.62903,
        "lat": 10.86554,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c4",
        "lon": 35.82516,
        "lat": 10.86554,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c5",
        "lon": 36.02129,
        "lat": 10.86554,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 36.21915,
        "lat": 10.86554,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c7",
        "lon": 36.41528,
        "lat": 10.86554,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 23,
        "share": 0.469
      },
      "20": {
        "label": "Shrubland",
        "count": 7,
        "share": 0.143
      },
      "30": {
        "label": "Grassland",
        "count": 8,
        "share": 0.163
      },
      "40": {
        "label": "Cropland",
        "count": 11,
        "share": 0.224
      }
    },
    "croplandShare": 0.224,
    "builtUpShare": 0,
    "treeCoverShare": 0.469,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.306,
    "landUseSafeguardScore": 64
  },
  "Beneshangul Gumu__Metekel": {
    "id": "Beneshangul Gumu__Metekel",
    "region": "Beneshangul Gumu",
    "zone": "Metekel",
    "sourceBoundaryName": "Metekel",
    "areaKm2": 25815,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 35.19084,
        "lat": 10.27104,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 35.37756,
        "lat": 10.27104,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 35.56593,
        "lat": 10.27104,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 35.75264,
        "lat": 10.27104,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 35.93935,
        "lat": 10.27104,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c6",
        "lon": 36.12772,
        "lat": 10.27104,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c7",
        "lon": 36.31444,
        "lat": 10.27104,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 35.19084,
        "lat": 10.50166,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 35.37756,
        "lat": 10.50166,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 35.56593,
        "lat": 10.50166,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 35.75264,
        "lat": 10.50166,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 35.93935,
        "lat": 10.50166,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c6",
        "lon": 36.12772,
        "lat": 10.50166,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c7",
        "lon": 36.31444,
        "lat": 10.50166,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 35.19084,
        "lat": 10.73432,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 35.37756,
        "lat": 10.73432,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 35.56593,
        "lat": 10.73432,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.75264,
        "lat": 10.73432,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 35.93935,
        "lat": 10.73432,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c6",
        "lon": 36.12772,
        "lat": 10.73432,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c7",
        "lon": 36.31444,
        "lat": 10.73432,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 35.19084,
        "lat": 10.96494,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r4c2",
        "lon": 35.37756,
        "lat": 10.96494,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 35.56593,
        "lat": 10.96494,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 35.75264,
        "lat": 10.96494,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 35.93935,
        "lat": 10.96494,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c6",
        "lon": 36.12772,
        "lat": 10.96494,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c7",
        "lon": 36.31444,
        "lat": 10.96494,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 35.19084,
        "lat": 11.19556,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 35.37756,
        "lat": 11.19556,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c3",
        "lon": 35.56593,
        "lat": 11.19556,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 35.75264,
        "lat": 11.19556,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c5",
        "lon": 35.93935,
        "lat": 11.19556,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 36.12772,
        "lat": 11.19556,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 36.31444,
        "lat": 11.19556,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c1",
        "lon": 35.19084,
        "lat": 11.42822,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c2",
        "lon": 35.37756,
        "lat": 11.42822,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c3",
        "lon": 35.56593,
        "lat": 11.42822,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c4",
        "lon": 35.75264,
        "lat": 11.42822,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c5",
        "lon": 35.93935,
        "lat": 11.42822,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c6",
        "lon": 36.12772,
        "lat": 11.42822,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c7",
        "lon": 36.31444,
        "lat": 11.42822,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c1",
        "lon": 35.19084,
        "lat": 11.65884,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 35.37756,
        "lat": 11.65884,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c3",
        "lon": 35.56593,
        "lat": 11.65884,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c4",
        "lon": 35.75264,
        "lat": 11.65884,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c5",
        "lon": 35.93935,
        "lat": 11.65884,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 36.12772,
        "lat": 11.65884,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c7",
        "lon": 36.31444,
        "lat": 11.65884,
        "classValue": 30,
        "classLabel": "Grassland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 28,
        "share": 0.571
      },
      "20": {
        "label": "Shrubland",
        "count": 6,
        "share": 0.122
      },
      "30": {
        "label": "Grassland",
        "count": 10,
        "share": 0.204
      },
      "40": {
        "label": "Cropland",
        "count": 4,
        "share": 0.082
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.02
      }
    },
    "croplandShare": 0.082,
    "builtUpShare": 0,
    "treeCoverShare": 0.571,
    "waterWetlandShare": 0.02,
    "openVegetationShare": 0.327,
    "landUseSafeguardScore": 69
  },
  "Gambela__Agnewak": {
    "id": "Gambela__Agnewak",
    "region": "Gambela",
    "zone": "Agnewak",
    "sourceBoundaryName": "Agnuak",
    "areaKm2": 23605,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 33.722,
        "lat": 6.67009,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r1c2",
        "lon": 33.92086,
        "lat": 6.67009,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 34.12147,
        "lat": 6.67009,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 34.32033,
        "lat": 6.67009,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c5",
        "lon": 34.51919,
        "lat": 6.67009,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c6",
        "lon": 34.7198,
        "lat": 6.67009,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c7",
        "lon": 34.91866,
        "lat": 6.67009,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 33.722,
        "lat": 6.94449,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 33.92086,
        "lat": 6.94449,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c3",
        "lon": 34.12147,
        "lat": 6.94449,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 34.32033,
        "lat": 6.94449,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c5",
        "lon": 34.51919,
        "lat": 6.94449,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c6",
        "lon": 34.7198,
        "lat": 6.94449,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c7",
        "lon": 34.91866,
        "lat": 6.94449,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 33.722,
        "lat": 7.22132,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r3c2",
        "lon": 33.92086,
        "lat": 7.22132,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 34.12147,
        "lat": 7.22132,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 34.32033,
        "lat": 7.22132,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c5",
        "lon": 34.51919,
        "lat": 7.22132,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 34.7198,
        "lat": 7.22132,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c7",
        "lon": 34.91866,
        "lat": 7.22132,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 33.722,
        "lat": 7.49573,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c2",
        "lon": 33.92086,
        "lat": 7.49573,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 34.12147,
        "lat": 7.49573,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c4",
        "lon": 34.32033,
        "lat": 7.49573,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 34.51919,
        "lat": 7.49573,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c6",
        "lon": 34.7198,
        "lat": 7.49573,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c7",
        "lon": 34.91866,
        "lat": 7.49573,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c1",
        "lon": 33.722,
        "lat": 7.77014,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 33.92086,
        "lat": 7.77014,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c3",
        "lon": 34.12147,
        "lat": 7.77014,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 34.32033,
        "lat": 7.77014,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c5",
        "lon": 34.51919,
        "lat": 7.77014,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c6",
        "lon": 34.7198,
        "lat": 7.77014,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c7",
        "lon": 34.91866,
        "lat": 7.77014,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c1",
        "lon": 33.722,
        "lat": 8.04697,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c2",
        "lon": 33.92086,
        "lat": 8.04697,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r6c3",
        "lon": 34.12147,
        "lat": 8.04697,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r6c4",
        "lon": 34.32033,
        "lat": 8.04697,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c5",
        "lon": 34.51919,
        "lat": 8.04697,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c6",
        "lon": 34.7198,
        "lat": 8.04697,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c7",
        "lon": 34.91866,
        "lat": 8.04697,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c1",
        "lon": 33.722,
        "lat": 8.32137,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 33.92086,
        "lat": 8.32137,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c3",
        "lon": 34.12147,
        "lat": 8.32137,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c4",
        "lon": 34.32033,
        "lat": 8.32137,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c5",
        "lon": 34.51919,
        "lat": 8.32137,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 34.7198,
        "lat": 8.32137,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c7",
        "lon": 34.91866,
        "lat": 8.32137,
        "classValue": 30,
        "classLabel": "Grassland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 13,
        "share": 0.265
      },
      "20": {
        "label": "Shrubland",
        "count": 5,
        "share": 0.102
      },
      "30": {
        "label": "Grassland",
        "count": 27,
        "share": 0.551
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 4,
        "share": 0.082
      }
    },
    "croplandShare": 0,
    "builtUpShare": 0,
    "treeCoverShare": 0.265,
    "waterWetlandShare": 0.082,
    "openVegetationShare": 0.653,
    "landUseSafeguardScore": 79
  },
  "Gambela__Majang": {
    "id": "Gambela__Majang",
    "region": "Gambela",
    "zone": "Majang",
    "sourceBoundaryName": "Majang",
    "areaKm2": 2342,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 34.92619,
        "lat": 7.20456,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 35.02068,
        "lat": 7.20456,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 35.11516,
        "lat": 7.20456,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 35.20964,
        "lat": 7.20456,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 35.30413,
        "lat": 7.20456,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 34.92619,
        "lat": 7.31477,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 35.02068,
        "lat": 7.31477,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 35.11516,
        "lat": 7.31477,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 35.20964,
        "lat": 7.31477,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 35.30413,
        "lat": 7.31477,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 34.92619,
        "lat": 7.42498,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 35.02068,
        "lat": 7.42498,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 35.11516,
        "lat": 7.42498,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.20964,
        "lat": 7.42498,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 35.30413,
        "lat": 7.42498,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 34.92619,
        "lat": 7.53519,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 35.02068,
        "lat": 7.53519,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 35.11516,
        "lat": 7.53519,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 35.20964,
        "lat": 7.53519,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 35.30413,
        "lat": 7.53519,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c1",
        "lon": 34.92619,
        "lat": 7.6454,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 35.02068,
        "lat": 7.6454,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 35.11516,
        "lat": 7.6454,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 35.20964,
        "lat": 7.6454,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 35.30413,
        "lat": 7.6454,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 24,
        "share": 0.96
      },
      "20": {
        "label": "Shrubland",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0,
    "builtUpShare": 0,
    "treeCoverShare": 0.96,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.04,
    "landUseSafeguardScore": 66
  },
  "Gambela__Nuwer": {
    "id": "Gambela__Nuwer",
    "region": "Gambela",
    "zone": "Nuwer",
    "sourceBoundaryName": "Nuer",
    "areaKm2": 4808,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 33.17515,
        "lat": 7.83719,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r1c2",
        "lon": 33.35887,
        "lat": 7.83719,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 33.54258,
        "lat": 7.83719,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r1c4",
        "lon": 33.72629,
        "lat": 7.83719,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r1c5",
        "lon": 33.91001,
        "lat": 7.83719,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c1",
        "lon": 33.17515,
        "lat": 7.97511,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r2c2",
        "lon": 33.35887,
        "lat": 7.97511,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r2c3",
        "lon": 33.54258,
        "lat": 7.97511,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 33.72629,
        "lat": 7.97511,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r2c5",
        "lon": 33.91001,
        "lat": 7.97511,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r3c1",
        "lon": 33.17515,
        "lat": 8.11304,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r3c2",
        "lon": 33.35887,
        "lat": 8.11304,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 33.54258,
        "lat": 8.11304,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r3c4",
        "lon": 33.72629,
        "lat": 8.11304,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 33.91001,
        "lat": 8.11304,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c1",
        "lon": 33.17515,
        "lat": 8.25097,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r4c2",
        "lon": 33.35887,
        "lat": 8.25097,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c3",
        "lon": 33.54258,
        "lat": 8.25097,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r4c4",
        "lon": 33.72629,
        "lat": 8.25097,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c5",
        "lon": 33.91001,
        "lat": 8.25097,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 33.17515,
        "lat": 8.38889,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r5c2",
        "lon": 33.35887,
        "lat": 8.38889,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c3",
        "lon": 33.54258,
        "lat": 8.38889,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 33.72629,
        "lat": 8.38889,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c5",
        "lon": 33.91001,
        "lat": 8.38889,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      }
    ],
    "classShares": {
      "20": {
        "label": "Shrubland",
        "count": 1,
        "share": 0.04
      },
      "30": {
        "label": "Grassland",
        "count": 11,
        "share": 0.44
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 13,
        "share": 0.52
      }
    },
    "croplandShare": 0,
    "builtUpShare": 0,
    "treeCoverShare": 0,
    "waterWetlandShare": 0.52,
    "openVegetationShare": 0.48,
    "landUseSafeguardScore": 61
  },
  "Oromia__Arsi": {
    "id": "Oromia__Arsi",
    "region": "Oromia",
    "zone": "Arsi",
    "sourceBoundaryName": "Arsi",
    "areaKm2": 21064,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 39.01247,
        "lat": 7.42778,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 39.24179,
        "lat": 7.42778,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c3",
        "lon": 39.47315,
        "lat": 7.42778,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 39.70247,
        "lat": 7.42778,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 39.93179,
        "lat": 7.42778,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c6",
        "lon": 40.16315,
        "lat": 7.42778,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 40.39247,
        "lat": 7.42778,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 39.01247,
        "lat": 7.62088,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 39.24179,
        "lat": 7.62088,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 39.47315,
        "lat": 7.62088,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 39.70247,
        "lat": 7.62088,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c5",
        "lon": 39.93179,
        "lat": 7.62088,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c6",
        "lon": 40.16315,
        "lat": 7.62088,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 40.39247,
        "lat": 7.62088,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 39.01247,
        "lat": 7.81569,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 39.24179,
        "lat": 7.81569,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 39.47315,
        "lat": 7.81569,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c4",
        "lon": 39.70247,
        "lat": 7.81569,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 39.93179,
        "lat": 7.81569,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c6",
        "lon": 40.16315,
        "lat": 7.81569,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c7",
        "lon": 40.39247,
        "lat": 7.81569,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 39.01247,
        "lat": 8.00879,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c2",
        "lon": 39.24179,
        "lat": 8.00879,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c3",
        "lon": 39.47315,
        "lat": 8.00879,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c4",
        "lon": 39.70247,
        "lat": 8.00879,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 39.93179,
        "lat": 8.00879,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c6",
        "lon": 40.16315,
        "lat": 8.00879,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c7",
        "lon": 40.39247,
        "lat": 8.00879,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 39.01247,
        "lat": 8.20189,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c2",
        "lon": 39.24179,
        "lat": 8.20189,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 39.47315,
        "lat": 8.20189,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 39.70247,
        "lat": 8.20189,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c5",
        "lon": 39.93179,
        "lat": 8.20189,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 40.16315,
        "lat": 8.20189,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c7",
        "lon": 40.39247,
        "lat": 8.20189,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c1",
        "lon": 39.01247,
        "lat": 8.3967,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 39.24179,
        "lat": 8.3967,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c3",
        "lon": 39.47315,
        "lat": 8.3967,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 39.70247,
        "lat": 8.3967,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c5",
        "lon": 39.93179,
        "lat": 8.3967,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c6",
        "lon": 40.16315,
        "lat": 8.3967,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c7",
        "lon": 40.39247,
        "lat": 8.3967,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c1",
        "lon": 39.01247,
        "lat": 8.5898,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c2",
        "lon": 39.24179,
        "lat": 8.5898,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c3",
        "lon": 39.47315,
        "lat": 8.5898,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c4",
        "lon": 39.70247,
        "lat": 8.5898,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c5",
        "lon": 39.93179,
        "lat": 8.5898,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c6",
        "lon": 40.16315,
        "lat": 8.5898,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c7",
        "lon": 40.39247,
        "lat": 8.5898,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 3,
        "share": 0.061
      },
      "20": {
        "label": "Shrubland",
        "count": 13,
        "share": 0.265
      },
      "30": {
        "label": "Grassland",
        "count": 5,
        "share": 0.102
      },
      "40": {
        "label": "Cropland",
        "count": 28,
        "share": 0.571
      }
    },
    "croplandShare": 0.571,
    "builtUpShare": 0,
    "treeCoverShare": 0.061,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.367,
    "landUseSafeguardScore": 51
  },
  "Oromia__Bale": {
    "id": "Oromia__Bale",
    "region": "Oromia",
    "zone": "Bale",
    "sourceBoundaryName": "Bale",
    "areaKm2": 54876,
    "sampleGridSize": 9,
    "samples": [
      {
        "key": "r1c1",
        "lon": 39.69721,
        "lat": 5.80176,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 39.95156,
        "lat": 5.80176,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 40.20591,
        "lat": 5.80176,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 40.46025,
        "lat": 5.80176,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 40.7146,
        "lat": 5.80176,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c6",
        "lon": 40.96895,
        "lat": 5.80176,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 41.22329,
        "lat": 5.80176,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c8",
        "lon": 41.47764,
        "lat": 5.80176,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c9",
        "lon": 41.73199,
        "lat": 5.80176,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 39.69721,
        "lat": 6.03923,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 39.95156,
        "lat": 6.03923,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c3",
        "lon": 40.20591,
        "lat": 6.03923,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 40.46025,
        "lat": 6.03923,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 40.7146,
        "lat": 6.03923,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c6",
        "lon": 40.96895,
        "lat": 6.03923,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c7",
        "lon": 41.22329,
        "lat": 6.03923,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c8",
        "lon": 41.47764,
        "lat": 6.03923,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c9",
        "lon": 41.73199,
        "lat": 6.03923,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 39.69721,
        "lat": 6.2767,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 39.95156,
        "lat": 6.2767,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 40.20591,
        "lat": 6.2767,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 40.46025,
        "lat": 6.2767,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 40.7146,
        "lat": 6.2767,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 40.96895,
        "lat": 6.2767,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c7",
        "lon": 41.22329,
        "lat": 6.2767,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c8",
        "lon": 41.47764,
        "lat": 6.2767,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c9",
        "lon": 41.73199,
        "lat": 6.2767,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 39.69721,
        "lat": 6.51418,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 39.95156,
        "lat": 6.51418,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 40.20591,
        "lat": 6.51418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 40.46025,
        "lat": 6.51418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 40.7146,
        "lat": 6.51418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c6",
        "lon": 40.96895,
        "lat": 6.51418,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c7",
        "lon": 41.22329,
        "lat": 6.51418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c8",
        "lon": 41.47764,
        "lat": 6.51418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c9",
        "lon": 41.73199,
        "lat": 6.51418,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 39.69721,
        "lat": 6.75165,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 39.95156,
        "lat": 6.75165,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 40.20591,
        "lat": 6.75165,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 40.46025,
        "lat": 6.75165,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 40.7146,
        "lat": 6.75165,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c6",
        "lon": 40.96895,
        "lat": 6.75165,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 41.22329,
        "lat": 6.75165,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c8",
        "lon": 41.47764,
        "lat": 6.75165,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c9",
        "lon": 41.73199,
        "lat": 6.75165,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c1",
        "lon": 39.69721,
        "lat": 6.98912,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 39.95156,
        "lat": 6.98912,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c3",
        "lon": 40.20591,
        "lat": 6.98912,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c4",
        "lon": 40.46025,
        "lat": 6.98912,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c5",
        "lon": 40.7146,
        "lat": 6.98912,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 40.96895,
        "lat": 6.98912,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c7",
        "lon": 41.22329,
        "lat": 6.98912,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c8",
        "lon": 41.47764,
        "lat": 6.98912,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c9",
        "lon": 41.73199,
        "lat": 6.98912,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c1",
        "lon": 39.69721,
        "lat": 7.2266,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 39.95156,
        "lat": 7.2266,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c3",
        "lon": 40.20591,
        "lat": 7.2266,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c4",
        "lon": 40.46025,
        "lat": 7.2266,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c5",
        "lon": 40.7146,
        "lat": 7.2266,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c6",
        "lon": 40.96895,
        "lat": 7.2266,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c7",
        "lon": 41.22329,
        "lat": 7.2266,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c8",
        "lon": 41.47764,
        "lat": 7.2266,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c9",
        "lon": 41.73199,
        "lat": 7.2266,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c1",
        "lon": 39.69721,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c2",
        "lon": 39.95156,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c3",
        "lon": 40.20591,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c4",
        "lon": 40.46025,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c5",
        "lon": 40.7146,
        "lat": 7.46407,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r8c6",
        "lon": 40.96895,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c7",
        "lon": 41.22329,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c8",
        "lon": 41.47764,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c9",
        "lon": 41.73199,
        "lat": 7.46407,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c1",
        "lon": 39.69721,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c2",
        "lon": 39.95156,
        "lat": 7.70154,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r9c3",
        "lon": 40.20591,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c4",
        "lon": 40.46025,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c5",
        "lon": 40.7146,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c6",
        "lon": 40.96895,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c7",
        "lon": 41.22329,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c8",
        "lon": 41.47764,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c9",
        "lon": 41.73199,
        "lat": 7.70154,
        "classValue": 20,
        "classLabel": "Shrubland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 14,
        "share": 0.173
      },
      "20": {
        "label": "Shrubland",
        "count": 52,
        "share": 0.642
      },
      "30": {
        "label": "Grassland",
        "count": 7,
        "share": 0.086
      },
      "40": {
        "label": "Cropland",
        "count": 8,
        "share": 0.099
      }
    },
    "croplandShare": 0.099,
    "builtUpShare": 0,
    "treeCoverShare": 0.173,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.728,
    "landUseSafeguardScore": 79
  },
  "Oromia__Borena": {
    "id": "Oromia__Borena",
    "region": "Oromia",
    "zone": "Borena",
    "sourceBoundaryName": "Borena",
    "areaKm2": 52668,
    "sampleGridSize": 9,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.14312,
        "lat": 4.00497,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c2",
        "lon": 37.40658,
        "lat": 4.00497,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 37.67005,
        "lat": 4.00497,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c4",
        "lon": 37.93351,
        "lat": 4.00497,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c5",
        "lon": 38.19697,
        "lat": 4.00497,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c6",
        "lon": 38.46043,
        "lat": 4.00497,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 38.72389,
        "lat": 4.00497,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c8",
        "lon": 38.98736,
        "lat": 4.00497,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c9",
        "lon": 39.25082,
        "lat": 4.00497,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 37.14312,
        "lat": 4.26729,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c2",
        "lon": 37.40658,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 37.67005,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c4",
        "lon": 37.93351,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 38.19697,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c6",
        "lon": 38.46043,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 38.72389,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c8",
        "lon": 38.98736,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c9",
        "lon": 39.25082,
        "lat": 4.26729,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 37.14312,
        "lat": 4.52962,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 37.40658,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 37.67005,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 37.93351,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 38.19697,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 38.46043,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c7",
        "lon": 38.72389,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c8",
        "lon": 38.98736,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c9",
        "lon": 39.25082,
        "lat": 4.52962,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 37.14312,
        "lat": 4.79194,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 37.40658,
        "lat": 4.79194,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 37.67005,
        "lat": 4.79194,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 37.93351,
        "lat": 4.79194,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 38.19697,
        "lat": 4.79194,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c6",
        "lon": 38.46043,
        "lat": 4.79194,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c7",
        "lon": 38.72389,
        "lat": 4.79194,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c8",
        "lon": 38.98736,
        "lat": 4.79194,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c9",
        "lon": 39.25082,
        "lat": 4.79194,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 37.14312,
        "lat": 5.05426,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 37.40658,
        "lat": 5.05426,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c3",
        "lon": 37.67005,
        "lat": 5.05426,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 37.93351,
        "lat": 5.05426,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 38.19697,
        "lat": 5.05426,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c6",
        "lon": 38.46043,
        "lat": 5.05426,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 38.72389,
        "lat": 5.05426,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c8",
        "lon": 38.98736,
        "lat": 5.05426,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c9",
        "lon": 39.25082,
        "lat": 5.05426,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c1",
        "lon": 37.14312,
        "lat": 5.31658,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c2",
        "lon": 37.40658,
        "lat": 5.31658,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c3",
        "lon": 37.67005,
        "lat": 5.31658,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 37.93351,
        "lat": 5.31658,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c5",
        "lon": 38.19697,
        "lat": 5.31658,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 38.46043,
        "lat": 5.31658,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c7",
        "lon": 38.72389,
        "lat": 5.31658,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c8",
        "lon": 38.98736,
        "lat": 5.31658,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c9",
        "lon": 39.25082,
        "lat": 5.31658,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c1",
        "lon": 37.14312,
        "lat": 5.5789,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 37.40658,
        "lat": 5.5789,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c3",
        "lon": 37.67005,
        "lat": 5.5789,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c4",
        "lon": 37.93351,
        "lat": 5.5789,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c5",
        "lon": 38.19697,
        "lat": 5.5789,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c6",
        "lon": 38.46043,
        "lat": 5.5789,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c7",
        "lon": 38.72389,
        "lat": 5.5789,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c8",
        "lon": 38.98736,
        "lat": 5.5789,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c9",
        "lon": 39.25082,
        "lat": 5.5789,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r8c1",
        "lon": 37.14312,
        "lat": 5.84123,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c2",
        "lon": 37.40658,
        "lat": 5.84123,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r8c3",
        "lon": 37.67005,
        "lat": 5.84123,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r8c4",
        "lon": 37.93351,
        "lat": 5.84123,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r8c5",
        "lon": 38.19697,
        "lat": 5.84123,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r8c6",
        "lon": 38.46043,
        "lat": 5.84123,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r8c7",
        "lon": 38.72389,
        "lat": 5.84123,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r8c8",
        "lon": 38.98736,
        "lat": 5.84123,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r8c9",
        "lon": 39.25082,
        "lat": 5.84123,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r9c1",
        "lon": 37.14312,
        "lat": 6.10355,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c2",
        "lon": 37.40658,
        "lat": 6.10355,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r9c3",
        "lon": 37.67005,
        "lat": 6.10355,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r9c4",
        "lon": 37.93351,
        "lat": 6.10355,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r9c5",
        "lon": 38.19697,
        "lat": 6.10355,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r9c6",
        "lon": 38.46043,
        "lat": 6.10355,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r9c7",
        "lon": 38.72389,
        "lat": 6.10355,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r9c8",
        "lon": 38.98736,
        "lat": 6.10355,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r9c9",
        "lon": 39.25082,
        "lat": 6.10355,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 18,
        "share": 0.222
      },
      "20": {
        "label": "Shrubland",
        "count": 42,
        "share": 0.519
      },
      "30": {
        "label": "Grassland",
        "count": 12,
        "share": 0.148
      },
      "40": {
        "label": "Cropland",
        "count": 8,
        "share": 0.099
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.012
      }
    },
    "croplandShare": 0.099,
    "builtUpShare": 0,
    "treeCoverShare": 0.222,
    "waterWetlandShare": 0.012,
    "openVegetationShare": 0.667,
    "landUseSafeguardScore": 77
  },
  "Oromia__East Hararge": {
    "id": "Oromia__East Hararge",
    "region": "Oromia",
    "zone": "East Hararge",
    "sourceBoundaryName": "East Harerge",
    "areaKm2": 25102,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 41.46431,
        "lat": 7.87794,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 41.66831,
        "lat": 7.87794,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 41.87412,
        "lat": 7.87794,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 42.07812,
        "lat": 7.87794,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 42.28212,
        "lat": 7.87794,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c6",
        "lon": 42.48793,
        "lat": 7.87794,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 42.69193,
        "lat": 7.87794,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 41.46431,
        "lat": 8.13348,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 41.66831,
        "lat": 8.13348,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 41.87412,
        "lat": 8.13348,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c4",
        "lon": 42.07812,
        "lat": 8.13348,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 42.28212,
        "lat": 8.13348,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c6",
        "lon": 42.48793,
        "lat": 8.13348,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 42.69193,
        "lat": 8.13348,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c1",
        "lon": 41.46431,
        "lat": 8.39128,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 41.66831,
        "lat": 8.39128,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 41.87412,
        "lat": 8.39128,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 42.07812,
        "lat": 8.39128,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 42.28212,
        "lat": 8.39128,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 42.48793,
        "lat": 8.39128,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c7",
        "lon": 42.69193,
        "lat": 8.39128,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 41.46431,
        "lat": 8.64682,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 41.66831,
        "lat": 8.64682,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c3",
        "lon": 41.87412,
        "lat": 8.64682,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 42.07812,
        "lat": 8.64682,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 42.28212,
        "lat": 8.64682,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c6",
        "lon": 42.48793,
        "lat": 8.64682,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c7",
        "lon": 42.69193,
        "lat": 8.64682,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 41.46431,
        "lat": 8.90236,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 41.66831,
        "lat": 8.90236,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 41.87412,
        "lat": 8.90236,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 42.07812,
        "lat": 8.90236,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 42.28212,
        "lat": 8.90236,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c6",
        "lon": 42.48793,
        "lat": 8.90236,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 42.69193,
        "lat": 8.90236,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c1",
        "lon": 41.46431,
        "lat": 9.16016,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 41.66831,
        "lat": 9.16016,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c3",
        "lon": 41.87412,
        "lat": 9.16016,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 42.07812,
        "lat": 9.16016,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c5",
        "lon": 42.28212,
        "lat": 9.16016,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 42.48793,
        "lat": 9.16016,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c7",
        "lon": 42.69193,
        "lat": 9.16016,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c1",
        "lon": 41.46431,
        "lat": 9.4157,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c2",
        "lon": 41.66831,
        "lat": 9.4157,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c3",
        "lon": 41.87412,
        "lat": 9.4157,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 42.07812,
        "lat": 9.4157,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c5",
        "lon": 42.28212,
        "lat": 9.4157,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c6",
        "lon": 42.48793,
        "lat": 9.4157,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c7",
        "lon": 42.69193,
        "lat": 9.4157,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "20": {
        "label": "Shrubland",
        "count": 36,
        "share": 0.735
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.122
      },
      "40": {
        "label": "Cropland",
        "count": 7,
        "share": 0.143
      }
    },
    "croplandShare": 0.143,
    "builtUpShare": 0,
    "treeCoverShare": 0,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.857,
    "landUseSafeguardScore": 81
  },
  "Oromia__East Shewa": {
    "id": "Oromia__East Shewa",
    "region": "Oromia",
    "zone": "East Shewa",
    "sourceBoundaryName": "East Shewa",
    "areaKm2": 10060,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 38.66824,
        "lat": 7.82337,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 38.85652,
        "lat": 7.82337,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c3",
        "lon": 39.04646,
        "lat": 7.82337,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 39.23474,
        "lat": 7.82337,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 39.42302,
        "lat": 7.82337,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c6",
        "lon": 39.61296,
        "lat": 7.82337,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c7",
        "lon": 39.80124,
        "lat": 7.82337,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 38.66824,
        "lat": 8.00187,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 38.85652,
        "lat": 8.00187,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r2c3",
        "lon": 39.04646,
        "lat": 8.00187,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 39.23474,
        "lat": 8.00187,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 39.42302,
        "lat": 8.00187,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c6",
        "lon": 39.61296,
        "lat": 8.00187,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c7",
        "lon": 39.80124,
        "lat": 8.00187,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 38.66824,
        "lat": 8.18196,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 38.85652,
        "lat": 8.18196,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 39.04646,
        "lat": 8.18196,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c4",
        "lon": 39.23474,
        "lat": 8.18196,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 39.42302,
        "lat": 8.18196,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c6",
        "lon": 39.61296,
        "lat": 8.18196,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c7",
        "lon": 39.80124,
        "lat": 8.18196,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 38.66824,
        "lat": 8.36046,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c2",
        "lon": 38.85652,
        "lat": 8.36046,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 39.04646,
        "lat": 8.36046,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r4c4",
        "lon": 39.23474,
        "lat": 8.36046,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 39.42302,
        "lat": 8.36046,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c6",
        "lon": 39.61296,
        "lat": 8.36046,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c7",
        "lon": 39.80124,
        "lat": 8.36046,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 38.66824,
        "lat": 8.53896,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c2",
        "lon": 38.85652,
        "lat": 8.53896,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c3",
        "lon": 39.04646,
        "lat": 8.53896,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 39.23474,
        "lat": 8.53896,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c5",
        "lon": 39.42302,
        "lat": 8.53896,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c6",
        "lon": 39.61296,
        "lat": 8.53896,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 39.80124,
        "lat": 8.53896,
        "classValue": 60,
        "classLabel": "Bare / sparse vegetation"
      },
      {
        "key": "r6c1",
        "lon": 38.66824,
        "lat": 8.71905,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 38.85652,
        "lat": 8.71905,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c3",
        "lon": 39.04646,
        "lat": 8.71905,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 39.23474,
        "lat": 8.71905,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c5",
        "lon": 39.42302,
        "lat": 8.71905,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c6",
        "lon": 39.61296,
        "lat": 8.71905,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c7",
        "lon": 39.80124,
        "lat": 8.71905,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c1",
        "lon": 38.66824,
        "lat": 8.89755,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c2",
        "lon": 38.85652,
        "lat": 8.89755,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c3",
        "lon": 39.04646,
        "lat": 8.89755,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 39.23474,
        "lat": 8.89755,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c5",
        "lon": 39.42302,
        "lat": 8.89755,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c6",
        "lon": 39.61296,
        "lat": 8.89755,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c7",
        "lon": 39.80124,
        "lat": 8.89755,
        "classValue": 20,
        "classLabel": "Shrubland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 1,
        "share": 0.02
      },
      "20": {
        "label": "Shrubland",
        "count": 6,
        "share": 0.122
      },
      "30": {
        "label": "Grassland",
        "count": 9,
        "share": 0.184
      },
      "40": {
        "label": "Cropland",
        "count": 30,
        "share": 0.612
      },
      "60": {
        "label": "Bare / sparse vegetation",
        "count": 1,
        "share": 0.02
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.02
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 1,
        "share": 0.02
      }
    },
    "croplandShare": 0.612,
    "builtUpShare": 0,
    "treeCoverShare": 0.02,
    "waterWetlandShare": 0.041,
    "openVegetationShare": 0.327,
    "landUseSafeguardScore": 47
  },
  "Oromia__East Wellega": {
    "id": "Oromia__East Wellega",
    "region": "Oromia",
    "zone": "East Wellega",
    "sourceBoundaryName": "East Wellega",
    "areaKm2": 13992,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 36.27914,
        "lat": 8.8091,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 36.40138,
        "lat": 8.8091,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 36.5247,
        "lat": 8.8091,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 36.64694,
        "lat": 8.8091,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 36.76918,
        "lat": 8.8091,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c6",
        "lon": 36.8925,
        "lat": 8.8091,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 37.01474,
        "lat": 8.8091,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 36.27914,
        "lat": 9.01884,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 36.40138,
        "lat": 9.01884,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 36.5247,
        "lat": 9.01884,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 36.64694,
        "lat": 9.01884,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 36.76918,
        "lat": 9.01884,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c6",
        "lon": 36.8925,
        "lat": 9.01884,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c7",
        "lon": 37.01474,
        "lat": 9.01884,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 36.27914,
        "lat": 9.23044,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 36.40138,
        "lat": 9.23044,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 36.5247,
        "lat": 9.23044,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 36.64694,
        "lat": 9.23044,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 36.76918,
        "lat": 9.23044,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c6",
        "lon": 36.8925,
        "lat": 9.23044,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c7",
        "lon": 37.01474,
        "lat": 9.23044,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 36.27914,
        "lat": 9.44018,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c2",
        "lon": 36.40138,
        "lat": 9.44018,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c3",
        "lon": 36.5247,
        "lat": 9.44018,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c4",
        "lon": 36.64694,
        "lat": 9.44018,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 36.76918,
        "lat": 9.44018,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c6",
        "lon": 36.8925,
        "lat": 9.44018,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c7",
        "lon": 37.01474,
        "lat": 9.44018,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 36.27914,
        "lat": 9.64992,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 36.40138,
        "lat": 9.64992,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 36.5247,
        "lat": 9.64992,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 36.64694,
        "lat": 9.64992,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 36.76918,
        "lat": 9.64992,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c6",
        "lon": 36.8925,
        "lat": 9.64992,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c7",
        "lon": 37.01474,
        "lat": 9.64992,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c1",
        "lon": 36.27914,
        "lat": 9.86152,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c2",
        "lon": 36.40138,
        "lat": 9.86152,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c3",
        "lon": 36.5247,
        "lat": 9.86152,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 36.64694,
        "lat": 9.86152,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c5",
        "lon": 36.76918,
        "lat": 9.86152,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c6",
        "lon": 36.8925,
        "lat": 9.86152,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c7",
        "lon": 37.01474,
        "lat": 9.86152,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c1",
        "lon": 36.27914,
        "lat": 10.07126,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 36.40138,
        "lat": 10.07126,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c3",
        "lon": 36.5247,
        "lat": 10.07126,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c4",
        "lon": 36.64694,
        "lat": 10.07126,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c5",
        "lon": 36.76918,
        "lat": 10.07126,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 36.8925,
        "lat": 10.07126,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c7",
        "lon": 37.01474,
        "lat": 10.07126,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 10,
        "share": 0.204
      },
      "20": {
        "label": "Shrubland",
        "count": 6,
        "share": 0.122
      },
      "30": {
        "label": "Grassland",
        "count": 7,
        "share": 0.143
      },
      "40": {
        "label": "Cropland",
        "count": 26,
        "share": 0.531
      }
    },
    "croplandShare": 0.531,
    "builtUpShare": 0,
    "treeCoverShare": 0.204,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.265,
    "landUseSafeguardScore": 50
  },
  "Oromia__Guji": {
    "id": "Oromia__Guji",
    "region": "Oromia",
    "zone": "Guji",
    "sourceBoundaryName": "Guji",
    "areaKm2": 18738,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 38.55446,
        "lat": 4.9425,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 38.75356,
        "lat": 4.9425,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 38.95443,
        "lat": 4.9425,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 39.15354,
        "lat": 4.9425,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 39.35265,
        "lat": 4.9425,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c6",
        "lon": 39.55352,
        "lat": 4.9425,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 39.75262,
        "lat": 4.9425,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 38.55446,
        "lat": 5.14418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 38.75356,
        "lat": 5.14418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 38.95443,
        "lat": 5.14418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c4",
        "lon": 39.15354,
        "lat": 5.14418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 39.35265,
        "lat": 5.14418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c6",
        "lon": 39.55352,
        "lat": 5.14418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 39.75262,
        "lat": 5.14418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 38.55446,
        "lat": 5.34765,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 38.75356,
        "lat": 5.34765,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 38.95443,
        "lat": 5.34765,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 39.15354,
        "lat": 5.34765,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 39.35265,
        "lat": 5.34765,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 39.55352,
        "lat": 5.34765,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c7",
        "lon": 39.75262,
        "lat": 5.34765,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 38.55446,
        "lat": 5.54933,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 38.75356,
        "lat": 5.54933,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 38.95443,
        "lat": 5.54933,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 39.15354,
        "lat": 5.54933,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 39.35265,
        "lat": 5.54933,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c6",
        "lon": 39.55352,
        "lat": 5.54933,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c7",
        "lon": 39.75262,
        "lat": 5.54933,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 38.55446,
        "lat": 5.75101,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 38.75356,
        "lat": 5.75101,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 38.95443,
        "lat": 5.75101,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 39.15354,
        "lat": 5.75101,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 39.35265,
        "lat": 5.75101,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 39.55352,
        "lat": 5.75101,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c7",
        "lon": 39.75262,
        "lat": 5.75101,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c1",
        "lon": 38.55446,
        "lat": 5.95448,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c2",
        "lon": 38.75356,
        "lat": 5.95448,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c3",
        "lon": 38.95443,
        "lat": 5.95448,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c4",
        "lon": 39.15354,
        "lat": 5.95448,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c5",
        "lon": 39.35265,
        "lat": 5.95448,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c6",
        "lon": 39.55352,
        "lat": 5.95448,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c7",
        "lon": 39.75262,
        "lat": 5.95448,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c1",
        "lon": 38.55446,
        "lat": 6.15616,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c2",
        "lon": 38.75356,
        "lat": 6.15616,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c3",
        "lon": 38.95443,
        "lat": 6.15616,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 39.15354,
        "lat": 6.15616,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c5",
        "lon": 39.35265,
        "lat": 6.15616,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c6",
        "lon": 39.55352,
        "lat": 6.15616,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c7",
        "lon": 39.75262,
        "lat": 6.15616,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 16,
        "share": 0.327
      },
      "20": {
        "label": "Shrubland",
        "count": 22,
        "share": 0.449
      },
      "30": {
        "label": "Grassland",
        "count": 5,
        "share": 0.102
      },
      "40": {
        "label": "Cropland",
        "count": 6,
        "share": 0.122
      }
    },
    "croplandShare": 0.122,
    "builtUpShare": 0,
    "treeCoverShare": 0.327,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.551,
    "landUseSafeguardScore": 74
  },
  "Oromia__Horo Gudru Wellega": {
    "id": "Oromia__Horo Gudru Wellega",
    "region": "Oromia",
    "zone": "Horo Gudru Wellega",
    "sourceBoundaryName": "Horo Guduru",
    "areaKm2": 8121,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 36.81573,
        "lat": 9.3476,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 36.9897,
        "lat": 9.3476,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 37.16366,
        "lat": 9.3476,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r1c4",
        "lon": 37.33762,
        "lat": 9.3476,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 37.51159,
        "lat": 9.3476,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 36.81573,
        "lat": 9.54913,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 36.9897,
        "lat": 9.54913,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 37.16366,
        "lat": 9.54913,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r2c4",
        "lon": 37.33762,
        "lat": 9.54913,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 37.51159,
        "lat": 9.54913,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r3c1",
        "lon": 36.81573,
        "lat": 9.75066,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 36.9897,
        "lat": 9.75066,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 37.16366,
        "lat": 9.75066,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c4",
        "lon": 37.33762,
        "lat": 9.75066,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 37.51159,
        "lat": 9.75066,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 36.81573,
        "lat": 9.95219,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c2",
        "lon": 36.9897,
        "lat": 9.95219,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 37.16366,
        "lat": 9.95219,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c4",
        "lon": 37.33762,
        "lat": 9.95219,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 37.51159,
        "lat": 9.95219,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 36.81573,
        "lat": 10.15372,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c2",
        "lon": 36.9897,
        "lat": 10.15372,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 37.16366,
        "lat": 10.15372,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 37.33762,
        "lat": 10.15372,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 37.51159,
        "lat": 10.15372,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 4,
        "share": 0.16
      },
      "20": {
        "label": "Shrubland",
        "count": 3,
        "share": 0.12
      },
      "40": {
        "label": "Cropland",
        "count": 15,
        "share": 0.6
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 3,
        "share": 0.12
      }
    },
    "croplandShare": 0.6,
    "builtUpShare": 0,
    "treeCoverShare": 0.16,
    "waterWetlandShare": 0.12,
    "openVegetationShare": 0.12,
    "landUseSafeguardScore": 40
  },
  "Oromia__Ilu Aba Bora": {
    "id": "Oromia__Ilu Aba Bora",
    "region": "Oromia",
    "zone": "Ilu Aba Bora",
    "sourceBoundaryName": "Ilubabor",
    "areaKm2": 15600,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 35.23479,
        "lat": 7.87583,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 35.44811,
        "lat": 7.87583,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 35.66332,
        "lat": 7.87583,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 35.87665,
        "lat": 7.87583,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 36.08998,
        "lat": 7.87583,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r1c6",
        "lon": 36.30519,
        "lat": 7.87583,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c7",
        "lon": 36.51851,
        "lat": 7.87583,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c1",
        "lon": 35.23479,
        "lat": 8.03797,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 35.44811,
        "lat": 8.03797,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 35.66332,
        "lat": 8.03797,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 35.87665,
        "lat": 8.03797,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 36.08998,
        "lat": 8.03797,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c6",
        "lon": 36.30519,
        "lat": 8.03797,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c7",
        "lon": 36.51851,
        "lat": 8.03797,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 35.23479,
        "lat": 8.20154,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 35.44811,
        "lat": 8.20154,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 35.66332,
        "lat": 8.20154,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.87665,
        "lat": 8.20154,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 36.08998,
        "lat": 8.20154,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c6",
        "lon": 36.30519,
        "lat": 8.20154,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c7",
        "lon": 36.51851,
        "lat": 8.20154,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 35.23479,
        "lat": 8.36367,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 35.44811,
        "lat": 8.36367,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 35.66332,
        "lat": 8.36367,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 35.87665,
        "lat": 8.36367,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 36.08998,
        "lat": 8.36367,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c6",
        "lon": 36.30519,
        "lat": 8.36367,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c7",
        "lon": 36.51851,
        "lat": 8.36367,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 35.23479,
        "lat": 8.5258,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 35.44811,
        "lat": 8.5258,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 35.66332,
        "lat": 8.5258,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 35.87665,
        "lat": 8.5258,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 36.08998,
        "lat": 8.5258,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c6",
        "lon": 36.30519,
        "lat": 8.5258,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 36.51851,
        "lat": 8.5258,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c1",
        "lon": 35.23479,
        "lat": 8.68937,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 35.44811,
        "lat": 8.68937,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c3",
        "lon": 35.66332,
        "lat": 8.68937,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 35.87665,
        "lat": 8.68937,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c5",
        "lon": 36.08998,
        "lat": 8.68937,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c6",
        "lon": 36.30519,
        "lat": 8.68937,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c7",
        "lon": 36.51851,
        "lat": 8.68937,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c1",
        "lon": 35.23479,
        "lat": 8.85151,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c2",
        "lon": 35.44811,
        "lat": 8.85151,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c3",
        "lon": 35.66332,
        "lat": 8.85151,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c4",
        "lon": 35.87665,
        "lat": 8.85151,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c5",
        "lon": 36.08998,
        "lat": 8.85151,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 36.30519,
        "lat": 8.85151,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c7",
        "lon": 36.51851,
        "lat": 8.85151,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 27,
        "share": 0.551
      },
      "20": {
        "label": "Shrubland",
        "count": 3,
        "share": 0.061
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.122
      },
      "40": {
        "label": "Cropland",
        "count": 12,
        "share": 0.245
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 1,
        "share": 0.02
      }
    },
    "croplandShare": 0.245,
    "builtUpShare": 0,
    "treeCoverShare": 0.551,
    "waterWetlandShare": 0.02,
    "openVegetationShare": 0.184,
    "landUseSafeguardScore": 59
  },
  "Oromia__Jimma": {
    "id": "Oromia__Jimma",
    "region": "Oromia",
    "zone": "Jimma",
    "sourceBoundaryName": "Jimma",
    "areaKm2": 18413,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 36.13344,
        "lat": 7.48929,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 36.33404,
        "lat": 7.48929,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 36.53643,
        "lat": 7.48929,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 36.73704,
        "lat": 7.48929,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 36.93765,
        "lat": 7.48929,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c6",
        "lon": 37.14004,
        "lat": 7.48929,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c7",
        "lon": 37.34064,
        "lat": 7.48929,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 36.13344,
        "lat": 7.67546,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 36.33404,
        "lat": 7.67546,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 36.53643,
        "lat": 7.67546,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 36.73704,
        "lat": 7.67546,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 36.93765,
        "lat": 7.67546,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c6",
        "lon": 37.14004,
        "lat": 7.67546,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c7",
        "lon": 37.34064,
        "lat": 7.67546,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 36.13344,
        "lat": 7.86327,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 36.33404,
        "lat": 7.86327,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 36.53643,
        "lat": 7.86327,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 36.73704,
        "lat": 7.86327,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 36.93765,
        "lat": 7.86327,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c6",
        "lon": 37.14004,
        "lat": 7.86327,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c7",
        "lon": 37.34064,
        "lat": 7.86327,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 36.13344,
        "lat": 8.04943,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c2",
        "lon": 36.33404,
        "lat": 8.04943,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 36.53643,
        "lat": 8.04943,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c4",
        "lon": 36.73704,
        "lat": 8.04943,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 36.93765,
        "lat": 8.04943,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c6",
        "lon": 37.14004,
        "lat": 8.04943,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c7",
        "lon": 37.34064,
        "lat": 8.04943,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 36.13344,
        "lat": 8.23559,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 36.33404,
        "lat": 8.23559,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c3",
        "lon": 36.53643,
        "lat": 8.23559,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 36.73704,
        "lat": 8.23559,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 36.93765,
        "lat": 8.23559,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c6",
        "lon": 37.14004,
        "lat": 8.23559,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 37.34064,
        "lat": 8.23559,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c1",
        "lon": 36.13344,
        "lat": 8.4234,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c2",
        "lon": 36.33404,
        "lat": 8.4234,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c3",
        "lon": 36.53643,
        "lat": 8.4234,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 36.73704,
        "lat": 8.4234,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c5",
        "lon": 36.93765,
        "lat": 8.4234,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c6",
        "lon": 37.14004,
        "lat": 8.4234,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c7",
        "lon": 37.34064,
        "lat": 8.4234,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c1",
        "lon": 36.13344,
        "lat": 8.60957,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c2",
        "lon": 36.33404,
        "lat": 8.60957,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c3",
        "lon": 36.53643,
        "lat": 8.60957,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 36.73704,
        "lat": 8.60957,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c5",
        "lon": 36.93765,
        "lat": 8.60957,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 37.14004,
        "lat": 8.60957,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c7",
        "lon": 37.34064,
        "lat": 8.60957,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 19,
        "share": 0.388
      },
      "20": {
        "label": "Shrubland",
        "count": 7,
        "share": 0.143
      },
      "30": {
        "label": "Grassland",
        "count": 5,
        "share": 0.102
      },
      "40": {
        "label": "Cropland",
        "count": 18,
        "share": 0.367
      }
    },
    "croplandShare": 0.367,
    "builtUpShare": 0,
    "treeCoverShare": 0.388,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.245,
    "landUseSafeguardScore": 56
  },
  "Oromia__Kelem Wellega": {
    "id": "Oromia__Kelem Wellega",
    "region": "Oromia",
    "zone": "Kelem Wellega",
    "sourceBoundaryName": "Kelem Wellega",
    "areaKm2": 9465,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 34.34674,
        "lat": 8.4277,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 34.56615,
        "lat": 8.4277,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 34.78556,
        "lat": 8.4277,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c4",
        "lon": 35.00497,
        "lat": 8.4277,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 35.22438,
        "lat": 8.4277,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 34.34674,
        "lat": 8.61813,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c2",
        "lon": 34.56615,
        "lat": 8.61813,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 34.78556,
        "lat": 8.61813,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 35.00497,
        "lat": 8.61813,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c5",
        "lon": 35.22438,
        "lat": 8.61813,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c1",
        "lon": 34.34674,
        "lat": 8.80857,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 34.56615,
        "lat": 8.80857,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 34.78556,
        "lat": 8.80857,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.00497,
        "lat": 8.80857,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 35.22438,
        "lat": 8.80857,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 34.34674,
        "lat": 8.99901,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 34.56615,
        "lat": 8.99901,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 34.78556,
        "lat": 8.99901,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c4",
        "lon": 35.00497,
        "lat": 8.99901,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 35.22438,
        "lat": 8.99901,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 34.34674,
        "lat": 9.18944,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 34.56615,
        "lat": 9.18944,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 34.78556,
        "lat": 9.18944,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 35.00497,
        "lat": 9.18944,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 35.22438,
        "lat": 9.18944,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 16,
        "share": 0.64
      },
      "20": {
        "label": "Shrubland",
        "count": 1,
        "share": 0.04
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.24
      },
      "40": {
        "label": "Cropland",
        "count": 2,
        "share": 0.08
      }
    },
    "croplandShare": 0.08,
    "builtUpShare": 0,
    "treeCoverShare": 0.64,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.28,
    "landUseSafeguardScore": 69
  },
  "Oromia__North Shewa (OR)": {
    "id": "Oromia__North Shewa (OR)",
    "region": "Oromia",
    "zone": "North Shewa (OR)",
    "sourceBoundaryName": "North Shewa(R4)",
    "areaKm2": 11293,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 38.17657,
        "lat": 9.14762,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 38.34851,
        "lat": 9.14762,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 38.52198,
        "lat": 9.14762,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 38.69392,
        "lat": 9.14762,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 38.86586,
        "lat": 9.14762,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c6",
        "lon": 39.03933,
        "lat": 9.14762,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c7",
        "lon": 39.21127,
        "lat": 9.14762,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 38.17657,
        "lat": 9.31445,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 38.34851,
        "lat": 9.31445,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 38.52198,
        "lat": 9.31445,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 38.69392,
        "lat": 9.31445,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 38.86586,
        "lat": 9.31445,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c6",
        "lon": 39.03933,
        "lat": 9.31445,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c7",
        "lon": 39.21127,
        "lat": 9.31445,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 38.17657,
        "lat": 9.48276,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 38.34851,
        "lat": 9.48276,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 38.52198,
        "lat": 9.48276,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 38.69392,
        "lat": 9.48276,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 38.86586,
        "lat": 9.48276,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c6",
        "lon": 39.03933,
        "lat": 9.48276,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c7",
        "lon": 39.21127,
        "lat": 9.48276,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 38.17657,
        "lat": 9.64959,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 38.34851,
        "lat": 9.64959,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c3",
        "lon": 38.52198,
        "lat": 9.64959,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c4",
        "lon": 38.69392,
        "lat": 9.64959,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 38.86586,
        "lat": 9.64959,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c6",
        "lon": 39.03933,
        "lat": 9.64959,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c7",
        "lon": 39.21127,
        "lat": 9.64959,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 38.17657,
        "lat": 9.81642,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c2",
        "lon": 38.34851,
        "lat": 9.81642,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 38.52198,
        "lat": 9.81642,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 38.69392,
        "lat": 9.81642,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c5",
        "lon": 38.86586,
        "lat": 9.81642,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 39.03933,
        "lat": 9.81642,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 39.21127,
        "lat": 9.81642,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c1",
        "lon": 38.17657,
        "lat": 9.98473,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c2",
        "lon": 38.34851,
        "lat": 9.98473,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c3",
        "lon": 38.52198,
        "lat": 9.98473,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 38.69392,
        "lat": 9.98473,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c5",
        "lon": 38.86586,
        "lat": 9.98473,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 39.03933,
        "lat": 9.98473,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c7",
        "lon": 39.21127,
        "lat": 9.98473,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c1",
        "lon": 38.17657,
        "lat": 10.15156,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c2",
        "lon": 38.34851,
        "lat": 10.15156,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c3",
        "lon": 38.52198,
        "lat": 10.15156,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 38.69392,
        "lat": 10.15156,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c5",
        "lon": 38.86586,
        "lat": 10.15156,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c6",
        "lon": 39.03933,
        "lat": 10.15156,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c7",
        "lon": 39.21127,
        "lat": 10.15156,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 1,
        "share": 0.02
      },
      "20": {
        "label": "Shrubland",
        "count": 9,
        "share": 0.184
      },
      "30": {
        "label": "Grassland",
        "count": 8,
        "share": 0.163
      },
      "40": {
        "label": "Cropland",
        "count": 31,
        "share": 0.633
      }
    },
    "croplandShare": 0.633,
    "builtUpShare": 0,
    "treeCoverShare": 0.02,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.347,
    "landUseSafeguardScore": 48
  },
  "Oromia__South West Shewa": {
    "id": "Oromia__South West Shewa",
    "region": "Oromia",
    "zone": "South West Shewa",
    "sourceBoundaryName": "South West Shewa",
    "areaKm2": 6595,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.73283,
        "lat": 8.37692,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 37.94223,
        "lat": 8.37692,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c3",
        "lon": 38.15163,
        "lat": 8.37692,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 38.36103,
        "lat": 8.37692,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 38.57043,
        "lat": 8.37692,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 37.73283,
        "lat": 8.50609,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 37.94223,
        "lat": 8.50609,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 38.15163,
        "lat": 8.50609,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 38.36103,
        "lat": 8.50609,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 38.57043,
        "lat": 8.50609,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 37.73283,
        "lat": 8.63526,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 37.94223,
        "lat": 8.63526,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 38.15163,
        "lat": 8.63526,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c4",
        "lon": 38.36103,
        "lat": 8.63526,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 38.57043,
        "lat": 8.63526,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 37.73283,
        "lat": 8.76443,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 37.94223,
        "lat": 8.76443,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 38.15163,
        "lat": 8.76443,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c4",
        "lon": 38.36103,
        "lat": 8.76443,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 38.57043,
        "lat": 8.76443,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 37.73283,
        "lat": 8.8936,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 37.94223,
        "lat": 8.8936,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 38.15163,
        "lat": 8.8936,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 38.36103,
        "lat": 8.8936,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c5",
        "lon": 38.57043,
        "lat": 8.8936,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 1,
        "share": 0.04
      },
      "20": {
        "label": "Shrubland",
        "count": 3,
        "share": 0.12
      },
      "40": {
        "label": "Cropland",
        "count": 21,
        "share": 0.84
      }
    },
    "croplandShare": 0.84,
    "builtUpShare": 0,
    "treeCoverShare": 0.04,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.12,
    "landUseSafeguardScore": 34
  },
  "Oromia__West Arsi": {
    "id": "Oromia__West Arsi",
    "region": "Oromia",
    "zone": "West Arsi",
    "sourceBoundaryName": "West Arsi",
    "areaKm2": 12615,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 38.33573,
        "lat": 6.5185,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 38.52888,
        "lat": 6.5185,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 38.72373,
        "lat": 6.5185,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 38.91688,
        "lat": 6.5185,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 39.11003,
        "lat": 6.5185,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c6",
        "lon": 39.30488,
        "lat": 6.5185,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c7",
        "lon": 39.49803,
        "lat": 6.5185,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 38.33573,
        "lat": 6.67838,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 38.52888,
        "lat": 6.67838,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 38.72373,
        "lat": 6.67838,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 38.91688,
        "lat": 6.67838,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 39.11003,
        "lat": 6.67838,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c6",
        "lon": 39.30488,
        "lat": 6.67838,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 39.49803,
        "lat": 6.67838,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 38.33573,
        "lat": 6.83966,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 38.52888,
        "lat": 6.83966,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 38.72373,
        "lat": 6.83966,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c4",
        "lon": 38.91688,
        "lat": 6.83966,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 39.11003,
        "lat": 6.83966,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c6",
        "lon": 39.30488,
        "lat": 6.83966,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c7",
        "lon": 39.49803,
        "lat": 6.83966,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c1",
        "lon": 38.33573,
        "lat": 6.99954,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c2",
        "lon": 38.52888,
        "lat": 6.99954,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 38.72373,
        "lat": 6.99954,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 38.91688,
        "lat": 6.99954,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 39.11003,
        "lat": 6.99954,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c6",
        "lon": 39.30488,
        "lat": 6.99954,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c7",
        "lon": 39.49803,
        "lat": 6.99954,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 38.33573,
        "lat": 7.15942,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c2",
        "lon": 38.52888,
        "lat": 7.15942,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 38.72373,
        "lat": 7.15942,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 38.91688,
        "lat": 7.15942,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c5",
        "lon": 39.11003,
        "lat": 7.15942,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 39.30488,
        "lat": 7.15942,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c7",
        "lon": 39.49803,
        "lat": 7.15942,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c1",
        "lon": 38.33573,
        "lat": 7.3207,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 38.52888,
        "lat": 7.3207,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c3",
        "lon": 38.72373,
        "lat": 7.3207,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 38.91688,
        "lat": 7.3207,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c5",
        "lon": 39.11003,
        "lat": 7.3207,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c6",
        "lon": 39.30488,
        "lat": 7.3207,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c7",
        "lon": 39.49803,
        "lat": 7.3207,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c1",
        "lon": 38.33573,
        "lat": 7.48058,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c2",
        "lon": 38.52888,
        "lat": 7.48058,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r7c3",
        "lon": 38.72373,
        "lat": 7.48058,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 38.91688,
        "lat": 7.48058,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c5",
        "lon": 39.11003,
        "lat": 7.48058,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c6",
        "lon": 39.30488,
        "lat": 7.48058,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c7",
        "lon": 39.49803,
        "lat": 7.48058,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 12,
        "share": 0.245
      },
      "20": {
        "label": "Shrubland",
        "count": 9,
        "share": 0.184
      },
      "30": {
        "label": "Grassland",
        "count": 9,
        "share": 0.184
      },
      "40": {
        "label": "Cropland",
        "count": 18,
        "share": 0.367
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.02
      }
    },
    "croplandShare": 0.367,
    "builtUpShare": 0,
    "treeCoverShare": 0.245,
    "waterWetlandShare": 0.02,
    "openVegetationShare": 0.367,
    "landUseSafeguardScore": 58
  },
  "Oromia__West Hararge": {
    "id": "Oromia__West Hararge",
    "region": "Oromia",
    "zone": "West Hararge",
    "sourceBoundaryName": "West Harerge",
    "areaKm2": 17532,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 40.27323,
        "lat": 8.13577,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 40.4478,
        "lat": 8.13577,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 40.62392,
        "lat": 8.13577,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 40.7985,
        "lat": 8.13577,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 40.97308,
        "lat": 8.13577,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c6",
        "lon": 41.1492,
        "lat": 8.13577,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 41.32377,
        "lat": 8.13577,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 40.27323,
        "lat": 8.31687,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 40.4478,
        "lat": 8.31687,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 40.62392,
        "lat": 8.31687,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 40.7985,
        "lat": 8.31687,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 40.97308,
        "lat": 8.31687,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c6",
        "lon": 41.1492,
        "lat": 8.31687,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 41.32377,
        "lat": 8.31687,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 40.27323,
        "lat": 8.49957,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 40.4478,
        "lat": 8.49957,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 40.62392,
        "lat": 8.49957,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 40.7985,
        "lat": 8.49957,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 40.97308,
        "lat": 8.49957,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 41.1492,
        "lat": 8.49957,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c7",
        "lon": 41.32377,
        "lat": 8.49957,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 40.27323,
        "lat": 8.68067,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 40.4478,
        "lat": 8.68067,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 40.62392,
        "lat": 8.68067,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 40.7985,
        "lat": 8.68067,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 40.97308,
        "lat": 8.68067,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c6",
        "lon": 41.1492,
        "lat": 8.68067,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c7",
        "lon": 41.32377,
        "lat": 8.68067,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 40.27323,
        "lat": 8.86177,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 40.4478,
        "lat": 8.86177,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c3",
        "lon": 40.62392,
        "lat": 8.86177,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 40.7985,
        "lat": 8.86177,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 40.97308,
        "lat": 8.86177,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 41.1492,
        "lat": 8.86177,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c7",
        "lon": 41.32377,
        "lat": 8.86177,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c1",
        "lon": 40.27323,
        "lat": 9.04447,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c2",
        "lon": 40.4478,
        "lat": 9.04447,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c3",
        "lon": 40.62392,
        "lat": 9.04447,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 40.7985,
        "lat": 9.04447,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c5",
        "lon": 40.97308,
        "lat": 9.04447,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 41.1492,
        "lat": 9.04447,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c7",
        "lon": 41.32377,
        "lat": 9.04447,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c1",
        "lon": 40.27323,
        "lat": 9.22557,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 40.4478,
        "lat": 9.22557,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c3",
        "lon": 40.62392,
        "lat": 9.22557,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 40.7985,
        "lat": 9.22557,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c5",
        "lon": 40.97308,
        "lat": 9.22557,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c6",
        "lon": 41.1492,
        "lat": 9.22557,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c7",
        "lon": 41.32377,
        "lat": 9.22557,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "20": {
        "label": "Shrubland",
        "count": 31,
        "share": 0.633
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.122
      },
      "40": {
        "label": "Cropland",
        "count": 12,
        "share": 0.245
      }
    },
    "croplandShare": 0.245,
    "builtUpShare": 0,
    "treeCoverShare": 0,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.755,
    "landUseSafeguardScore": 74
  },
  "Oromia__West Shewa": {
    "id": "Oromia__West Shewa",
    "region": "Oromia",
    "zone": "West Shewa",
    "sourceBoundaryName": "West Shewa",
    "areaKm2": 15338,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.29724,
        "lat": 8.57263,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 37.4873,
        "lat": 8.57263,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 37.67903,
        "lat": 8.57263,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 37.86909,
        "lat": 8.57263,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 38.05915,
        "lat": 8.57263,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c6",
        "lon": 38.25088,
        "lat": 8.57263,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c7",
        "lon": 38.44094,
        "lat": 8.57263,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 37.29724,
        "lat": 8.75614,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 37.4873,
        "lat": 8.75614,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 37.67903,
        "lat": 8.75614,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 37.86909,
        "lat": 8.75614,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c5",
        "lon": 38.05915,
        "lat": 8.75614,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c6",
        "lon": 38.25088,
        "lat": 8.75614,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c7",
        "lon": 38.44094,
        "lat": 8.75614,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 37.29724,
        "lat": 8.94126,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 37.4873,
        "lat": 8.94126,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 37.67903,
        "lat": 8.94126,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c4",
        "lon": 37.86909,
        "lat": 8.94126,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 38.05915,
        "lat": 8.94126,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c6",
        "lon": 38.25088,
        "lat": 8.94126,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c7",
        "lon": 38.44094,
        "lat": 8.94126,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 37.29724,
        "lat": 9.12477,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 37.4873,
        "lat": 9.12477,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 37.67903,
        "lat": 9.12477,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 37.86909,
        "lat": 9.12477,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 38.05915,
        "lat": 9.12477,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c6",
        "lon": 38.25088,
        "lat": 9.12477,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c7",
        "lon": 38.44094,
        "lat": 9.12477,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 37.29724,
        "lat": 9.30828,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r5c2",
        "lon": 37.4873,
        "lat": 9.30828,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 37.67903,
        "lat": 9.30828,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 37.86909,
        "lat": 9.30828,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 38.05915,
        "lat": 9.30828,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c6",
        "lon": 38.25088,
        "lat": 9.30828,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c7",
        "lon": 38.44094,
        "lat": 9.30828,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c1",
        "lon": 37.29724,
        "lat": 9.4934,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 37.4873,
        "lat": 9.4934,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r6c3",
        "lon": 37.67903,
        "lat": 9.4934,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c4",
        "lon": 37.86909,
        "lat": 9.4934,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c5",
        "lon": 38.05915,
        "lat": 9.4934,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 38.25088,
        "lat": 9.4934,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c7",
        "lon": 38.44094,
        "lat": 9.4934,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c1",
        "lon": 37.29724,
        "lat": 9.67691,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 37.4873,
        "lat": 9.67691,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c3",
        "lon": 37.67903,
        "lat": 9.67691,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c4",
        "lon": 37.86909,
        "lat": 9.67691,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c5",
        "lon": 38.05915,
        "lat": 9.67691,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c6",
        "lon": 38.25088,
        "lat": 9.67691,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c7",
        "lon": 38.44094,
        "lat": 9.67691,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 9,
        "share": 0.184
      },
      "20": {
        "label": "Shrubland",
        "count": 10,
        "share": 0.204
      },
      "30": {
        "label": "Grassland",
        "count": 4,
        "share": 0.082
      },
      "40": {
        "label": "Cropland",
        "count": 24,
        "share": 0.49
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 2,
        "share": 0.041
      }
    },
    "croplandShare": 0.49,
    "builtUpShare": 0,
    "treeCoverShare": 0.184,
    "waterWetlandShare": 0.041,
    "openVegetationShare": 0.286,
    "landUseSafeguardScore": 51
  },
  "Oromia__West Wellega": {
    "id": "Oromia__West Wellega",
    "region": "Oromia",
    "zone": "West Wellega",
    "sourceBoundaryName": "West Wellega",
    "areaKm2": 12897,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 34.61566,
        "lat": 8.87564,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 34.8092,
        "lat": 8.87564,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 35.00446,
        "lat": 8.87564,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 35.198,
        "lat": 8.87564,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 35.39154,
        "lat": 8.87564,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c6",
        "lon": 35.5868,
        "lat": 8.87564,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c7",
        "lon": 35.78034,
        "lat": 8.87564,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 34.61566,
        "lat": 9.02659,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 34.8092,
        "lat": 9.02659,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c3",
        "lon": 35.00446,
        "lat": 9.02659,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 35.198,
        "lat": 9.02659,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 35.39154,
        "lat": 9.02659,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c6",
        "lon": 35.5868,
        "lat": 9.02659,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c7",
        "lon": 35.78034,
        "lat": 9.02659,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 34.61566,
        "lat": 9.17887,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 34.8092,
        "lat": 9.17887,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 35.00446,
        "lat": 9.17887,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.198,
        "lat": 9.17887,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 35.39154,
        "lat": 9.17887,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c6",
        "lon": 35.5868,
        "lat": 9.17887,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c7",
        "lon": 35.78034,
        "lat": 9.17887,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 34.61566,
        "lat": 9.32982,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 34.8092,
        "lat": 9.32982,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 35.00446,
        "lat": 9.32982,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 35.198,
        "lat": 9.32982,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 35.39154,
        "lat": 9.32982,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c6",
        "lon": 35.5868,
        "lat": 9.32982,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c7",
        "lon": 35.78034,
        "lat": 9.32982,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c1",
        "lon": 34.61566,
        "lat": 9.48077,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 34.8092,
        "lat": 9.48077,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 35.00446,
        "lat": 9.48077,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 35.198,
        "lat": 9.48077,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 35.39154,
        "lat": 9.48077,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 35.5868,
        "lat": 9.48077,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c7",
        "lon": 35.78034,
        "lat": 9.48077,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c1",
        "lon": 34.61566,
        "lat": 9.63305,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 34.8092,
        "lat": 9.63305,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c3",
        "lon": 35.00446,
        "lat": 9.63305,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c4",
        "lon": 35.198,
        "lat": 9.63305,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c5",
        "lon": 35.39154,
        "lat": 9.63305,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c6",
        "lon": 35.5868,
        "lat": 9.63305,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c7",
        "lon": 35.78034,
        "lat": 9.63305,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c1",
        "lon": 34.61566,
        "lat": 9.784,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c2",
        "lon": 34.8092,
        "lat": 9.784,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c3",
        "lon": 35.00446,
        "lat": 9.784,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c4",
        "lon": 35.198,
        "lat": 9.784,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c5",
        "lon": 35.39154,
        "lat": 9.784,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c6",
        "lon": 35.5868,
        "lat": 9.784,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c7",
        "lon": 35.78034,
        "lat": 9.784,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 18,
        "share": 0.367
      },
      "20": {
        "label": "Shrubland",
        "count": 3,
        "share": 0.061
      },
      "30": {
        "label": "Grassland",
        "count": 13,
        "share": 0.265
      },
      "40": {
        "label": "Cropland",
        "count": 15,
        "share": 0.306
      }
    },
    "croplandShare": 0.306,
    "builtUpShare": 0,
    "treeCoverShare": 0.367,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.327,
    "landUseSafeguardScore": 61
  },
  "SNNPR__Basketo": {
    "id": "SNNPR__Basketo",
    "region": "SNNPR",
    "zone": "Basketo",
    "sourceBoundaryName": "Basketo",
    "areaKm2": 421,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 36.44557,
        "lat": 6.18188,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 36.49505,
        "lat": 6.18188,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 36.54453,
        "lat": 6.18188,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 36.59401,
        "lat": 6.18188,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 36.64349,
        "lat": 6.18188,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c1",
        "lon": 36.44557,
        "lat": 6.22337,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c2",
        "lon": 36.49505,
        "lat": 6.22337,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c3",
        "lon": 36.54453,
        "lat": 6.22337,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c4",
        "lon": 36.59401,
        "lat": 6.22337,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 36.64349,
        "lat": 6.22337,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 36.44557,
        "lat": 6.26485,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 36.49505,
        "lat": 6.26485,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 36.54453,
        "lat": 6.26485,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c4",
        "lon": 36.59401,
        "lat": 6.26485,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 36.64349,
        "lat": 6.26485,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 36.44557,
        "lat": 6.30633,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c2",
        "lon": 36.49505,
        "lat": 6.30633,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 36.54453,
        "lat": 6.30633,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 36.59401,
        "lat": 6.30633,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 36.64349,
        "lat": 6.30633,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 36.44557,
        "lat": 6.34782,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 36.49505,
        "lat": 6.34782,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 36.54453,
        "lat": 6.34782,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 36.59401,
        "lat": 6.34782,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 36.64349,
        "lat": 6.34782,
        "classValue": 20,
        "classLabel": "Shrubland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 6,
        "share": 0.24
      },
      "20": {
        "label": "Shrubland",
        "count": 12,
        "share": 0.48
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.24
      },
      "40": {
        "label": "Cropland",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.04,
    "builtUpShare": 0,
    "treeCoverShare": 0.24,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.72,
    "landUseSafeguardScore": 81
  },
  "SNNPR__Bench Sheko": {
    "id": "SNNPR__Bench Sheko",
    "region": "SNNPR",
    "zone": "Bench Sheko",
    "sourceBoundaryName": "Bench Maji",
    "areaKm2": 19167,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 35.07888,
        "lat": 5.63513,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c2",
        "lon": 35.22088,
        "lat": 5.63513,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 35.36413,
        "lat": 5.63513,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 35.50612,
        "lat": 5.63513,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 35.64811,
        "lat": 5.63513,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c6",
        "lon": 35.79136,
        "lat": 5.63513,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c7",
        "lon": 35.93336,
        "lat": 5.63513,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 35.07888,
        "lat": 5.85038,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c2",
        "lon": 35.22088,
        "lat": 5.85038,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c3",
        "lon": 35.36413,
        "lat": 5.85038,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 35.50612,
        "lat": 5.85038,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c5",
        "lon": 35.64811,
        "lat": 5.85038,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c6",
        "lon": 35.79136,
        "lat": 5.85038,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c7",
        "lon": 35.93336,
        "lat": 5.85038,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 35.07888,
        "lat": 6.06754,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c2",
        "lon": 35.22088,
        "lat": 6.06754,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 35.36413,
        "lat": 6.06754,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.50612,
        "lat": 6.06754,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 35.64811,
        "lat": 6.06754,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 35.79136,
        "lat": 6.06754,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c7",
        "lon": 35.93336,
        "lat": 6.06754,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 35.07888,
        "lat": 6.28279,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 35.22088,
        "lat": 6.28279,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 35.36413,
        "lat": 6.28279,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 35.50612,
        "lat": 6.28279,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 35.64811,
        "lat": 6.28279,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c6",
        "lon": 35.79136,
        "lat": 6.28279,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c7",
        "lon": 35.93336,
        "lat": 6.28279,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 35.07888,
        "lat": 6.49804,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 35.22088,
        "lat": 6.49804,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c3",
        "lon": 35.36413,
        "lat": 6.49804,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 35.50612,
        "lat": 6.49804,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 35.64811,
        "lat": 6.49804,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c6",
        "lon": 35.79136,
        "lat": 6.49804,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c7",
        "lon": 35.93336,
        "lat": 6.49804,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c1",
        "lon": 35.07888,
        "lat": 6.7152,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c2",
        "lon": 35.22088,
        "lat": 6.7152,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c3",
        "lon": 35.36413,
        "lat": 6.7152,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c4",
        "lon": 35.50612,
        "lat": 6.7152,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c5",
        "lon": 35.64811,
        "lat": 6.7152,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c6",
        "lon": 35.79136,
        "lat": 6.7152,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c7",
        "lon": 35.93336,
        "lat": 6.7152,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c1",
        "lon": 35.07888,
        "lat": 6.93045,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c2",
        "lon": 35.22088,
        "lat": 6.93045,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c3",
        "lon": 35.36413,
        "lat": 6.93045,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c4",
        "lon": 35.50612,
        "lat": 6.93045,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c5",
        "lon": 35.64811,
        "lat": 6.93045,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 35.79136,
        "lat": 6.93045,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c7",
        "lon": 35.93336,
        "lat": 6.93045,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 22,
        "share": 0.449
      },
      "20": {
        "label": "Shrubland",
        "count": 12,
        "share": 0.245
      },
      "30": {
        "label": "Grassland",
        "count": 14,
        "share": 0.286
      },
      "40": {
        "label": "Cropland",
        "count": 1,
        "share": 0.02
      }
    },
    "croplandShare": 0.02,
    "builtUpShare": 0,
    "treeCoverShare": 0.449,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.531,
    "landUseSafeguardScore": 77
  },
  "SNNPR__Dawuro": {
    "id": "SNNPR__Dawuro",
    "region": "SNNPR",
    "zone": "Dawuro",
    "sourceBoundaryName": "Dawro",
    "areaKm2": 4400,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 36.81726,
        "lat": 6.71168,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 36.96279,
        "lat": 6.71168,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 37.10832,
        "lat": 6.71168,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 37.25385,
        "lat": 6.71168,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 37.39938,
        "lat": 6.71168,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 36.81726,
        "lat": 6.83978,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 36.96279,
        "lat": 6.83978,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 37.10832,
        "lat": 6.83978,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 37.25385,
        "lat": 6.83978,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 37.39938,
        "lat": 6.83978,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 36.81726,
        "lat": 6.96788,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 36.96279,
        "lat": 6.96788,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 37.10832,
        "lat": 6.96788,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 37.25385,
        "lat": 6.96788,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 37.39938,
        "lat": 6.96788,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r4c1",
        "lon": 36.81726,
        "lat": 7.09598,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 36.96279,
        "lat": 7.09598,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 37.10832,
        "lat": 7.09598,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 37.25385,
        "lat": 7.09598,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 37.39938,
        "lat": 7.09598,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 36.81726,
        "lat": 7.22408,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 36.96279,
        "lat": 7.22408,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 37.10832,
        "lat": 7.22408,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 37.25385,
        "lat": 7.22408,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 37.39938,
        "lat": 7.22408,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 10,
        "share": 0.4
      },
      "20": {
        "label": "Shrubland",
        "count": 11,
        "share": 0.44
      },
      "40": {
        "label": "Cropland",
        "count": 3,
        "share": 0.12
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.12,
    "builtUpShare": 0,
    "treeCoverShare": 0.4,
    "waterWetlandShare": 0.04,
    "openVegetationShare": 0.44,
    "landUseSafeguardScore": 69
  },
  "SNNPR__Gamo": {
    "id": "SNNPR__Gamo",
    "region": "SNNPR",
    "zone": "Gamo",
    "sourceBoundaryName": "Gamo Gofa",
    "areaKm2": 12164,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 36.60898,
        "lat": 5.7936,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 36.77633,
        "lat": 5.7936,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 36.94515,
        "lat": 5.7936,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 37.1125,
        "lat": 5.7936,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 37.27985,
        "lat": 5.7936,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c6",
        "lon": 37.44867,
        "lat": 5.7936,
        "classValue": 50,
        "classLabel": "Built-up"
      },
      {
        "key": "r1c7",
        "lon": 37.61602,
        "lat": 5.7936,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r2c1",
        "lon": 36.60898,
        "lat": 5.91715,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 36.77633,
        "lat": 5.91715,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 36.94515,
        "lat": 5.91715,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 37.1125,
        "lat": 5.91715,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 37.27985,
        "lat": 5.91715,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c6",
        "lon": 37.44867,
        "lat": 5.91715,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 37.61602,
        "lat": 5.91715,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r3c1",
        "lon": 36.60898,
        "lat": 6.0418,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 36.77633,
        "lat": 6.0418,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 36.94515,
        "lat": 6.0418,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c4",
        "lon": 37.1125,
        "lat": 6.0418,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 37.27985,
        "lat": 6.0418,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c6",
        "lon": 37.44867,
        "lat": 6.0418,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c7",
        "lon": 37.61602,
        "lat": 6.0418,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r4c1",
        "lon": 36.60898,
        "lat": 6.16535,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 36.77633,
        "lat": 6.16535,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 36.94515,
        "lat": 6.16535,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 37.1125,
        "lat": 6.16535,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 37.27985,
        "lat": 6.16535,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c6",
        "lon": 37.44867,
        "lat": 6.16535,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c7",
        "lon": 37.61602,
        "lat": 6.16535,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c1",
        "lon": 36.60898,
        "lat": 6.2889,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 36.77633,
        "lat": 6.2889,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 36.94515,
        "lat": 6.2889,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 37.1125,
        "lat": 6.2889,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 37.27985,
        "lat": 6.2889,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c6",
        "lon": 37.44867,
        "lat": 6.2889,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c7",
        "lon": 37.61602,
        "lat": 6.2889,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c1",
        "lon": 36.60898,
        "lat": 6.41355,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c2",
        "lon": 36.77633,
        "lat": 6.41355,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c3",
        "lon": 36.94515,
        "lat": 6.41355,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c4",
        "lon": 37.1125,
        "lat": 6.41355,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c5",
        "lon": 37.27985,
        "lat": 6.41355,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 37.44867,
        "lat": 6.41355,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c7",
        "lon": 37.61602,
        "lat": 6.41355,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c1",
        "lon": 36.60898,
        "lat": 6.5371,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c2",
        "lon": 36.77633,
        "lat": 6.5371,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c3",
        "lon": 36.94515,
        "lat": 6.5371,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c4",
        "lon": 37.1125,
        "lat": 6.5371,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c5",
        "lon": 37.27985,
        "lat": 6.5371,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c6",
        "lon": 37.44867,
        "lat": 6.5371,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c7",
        "lon": 37.61602,
        "lat": 6.5371,
        "classValue": 20,
        "classLabel": "Shrubland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 14,
        "share": 0.286
      },
      "20": {
        "label": "Shrubland",
        "count": 20,
        "share": 0.408
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.122
      },
      "40": {
        "label": "Cropland",
        "count": 5,
        "share": 0.102
      },
      "50": {
        "label": "Built-up",
        "count": 1,
        "share": 0.02
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 3,
        "share": 0.061
      }
    },
    "croplandShare": 0.102,
    "builtUpShare": 0.02,
    "treeCoverShare": 0.286,
    "waterWetlandShare": 0.061,
    "openVegetationShare": 0.531,
    "landUseSafeguardScore": 69
  },
  "SNNPR__Gedeo": {
    "id": "SNNPR__Gedeo",
    "region": "SNNPR",
    "zone": "Gedeo",
    "sourceBoundaryName": "Gedio",
    "areaKm2": 1343,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 38.13814,
        "lat": 5.93227,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 38.19919,
        "lat": 5.93227,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 38.26024,
        "lat": 5.93227,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 38.32129,
        "lat": 5.93227,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 38.38234,
        "lat": 5.93227,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 38.13814,
        "lat": 6.03036,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 38.19919,
        "lat": 6.03036,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 38.26024,
        "lat": 6.03036,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c4",
        "lon": 38.32129,
        "lat": 6.03036,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 38.38234,
        "lat": 6.03036,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 38.13814,
        "lat": 6.12846,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 38.19919,
        "lat": 6.12846,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 38.26024,
        "lat": 6.12846,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 38.32129,
        "lat": 6.12846,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 38.38234,
        "lat": 6.12846,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c1",
        "lon": 38.13814,
        "lat": 6.22656,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c2",
        "lon": 38.19919,
        "lat": 6.22656,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 38.26024,
        "lat": 6.22656,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 38.32129,
        "lat": 6.22656,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 38.38234,
        "lat": 6.22656,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 38.13814,
        "lat": 6.32465,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 38.19919,
        "lat": 6.32465,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 38.26024,
        "lat": 6.32465,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 38.32129,
        "lat": 6.32465,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 38.38234,
        "lat": 6.32465,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 18,
        "share": 0.72
      },
      "20": {
        "label": "Shrubland",
        "count": 4,
        "share": 0.16
      },
      "30": {
        "label": "Grassland",
        "count": 3,
        "share": 0.12
      }
    },
    "croplandShare": 0,
    "builtUpShare": 0,
    "treeCoverShare": 0.72,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.28,
    "landUseSafeguardScore": 72
  },
  "SNNPR__Guraghe": {
    "id": "SNNPR__Guraghe",
    "region": "SNNPR",
    "zone": "Guraghe",
    "sourceBoundaryName": "Gurage",
    "areaKm2": 5982,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.66394,
        "lat": 7.86604,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 37.87703,
        "lat": 7.86604,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 38.09012,
        "lat": 7.86604,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 38.30321,
        "lat": 7.86604,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 38.5163,
        "lat": 7.86604,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 37.66394,
        "lat": 7.98598,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 37.87703,
        "lat": 7.98598,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 38.09012,
        "lat": 7.98598,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 38.30321,
        "lat": 7.98598,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 38.5163,
        "lat": 7.98598,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 37.66394,
        "lat": 8.10593,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 37.87703,
        "lat": 8.10593,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 38.09012,
        "lat": 8.10593,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 38.30321,
        "lat": 8.10593,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 38.5163,
        "lat": 8.10593,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 37.66394,
        "lat": 8.22588,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 37.87703,
        "lat": 8.22588,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c3",
        "lon": 38.09012,
        "lat": 8.22588,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 38.30321,
        "lat": 8.22588,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 38.5163,
        "lat": 8.22588,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 37.66394,
        "lat": 8.34582,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c2",
        "lon": 37.87703,
        "lat": 8.34582,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c3",
        "lon": 38.09012,
        "lat": 8.34582,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 38.30321,
        "lat": 8.34582,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c5",
        "lon": 38.5163,
        "lat": 8.34582,
        "classValue": 20,
        "classLabel": "Shrubland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 4,
        "share": 0.16
      },
      "20": {
        "label": "Shrubland",
        "count": 7,
        "share": 0.28
      },
      "30": {
        "label": "Grassland",
        "count": 1,
        "share": 0.04
      },
      "40": {
        "label": "Cropland",
        "count": 13,
        "share": 0.52
      }
    },
    "croplandShare": 0.52,
    "builtUpShare": 0,
    "treeCoverShare": 0.16,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.32,
    "landUseSafeguardScore": 52
  },
  "SNNPR__Hadiya": {
    "id": "SNNPR__Hadiya",
    "region": "SNNPR",
    "zone": "Hadiya",
    "sourceBoundaryName": "Hadiya",
    "areaKm2": 3668,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.45835,
        "lat": 7.19953,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r1c2",
        "lon": 37.59263,
        "lat": 7.19953,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 37.72691,
        "lat": 7.19953,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 37.86119,
        "lat": 7.19953,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 37.99547,
        "lat": 7.19953,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 37.45835,
        "lat": 7.3446,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 37.59263,
        "lat": 7.3446,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 37.72691,
        "lat": 7.3446,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 37.86119,
        "lat": 7.3446,
        "classValue": 50,
        "classLabel": "Built-up"
      },
      {
        "key": "r2c5",
        "lon": 37.99547,
        "lat": 7.3446,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 37.45835,
        "lat": 7.48968,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 37.59263,
        "lat": 7.48968,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 37.72691,
        "lat": 7.48968,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c4",
        "lon": 37.86119,
        "lat": 7.48968,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 37.99547,
        "lat": 7.48968,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 37.45835,
        "lat": 7.63476,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 37.59263,
        "lat": 7.63476,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 37.72691,
        "lat": 7.63476,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c4",
        "lon": 37.86119,
        "lat": 7.63476,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 37.99547,
        "lat": 7.63476,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 37.45835,
        "lat": 7.77983,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 37.59263,
        "lat": 7.77983,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c3",
        "lon": 37.72691,
        "lat": 7.77983,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 37.86119,
        "lat": 7.77983,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c5",
        "lon": 37.99547,
        "lat": 7.77983,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 6,
        "share": 0.24
      },
      "20": {
        "label": "Shrubland",
        "count": 5,
        "share": 0.2
      },
      "30": {
        "label": "Grassland",
        "count": 1,
        "share": 0.04
      },
      "40": {
        "label": "Cropland",
        "count": 11,
        "share": 0.44
      },
      "50": {
        "label": "Built-up",
        "count": 1,
        "share": 0.04
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.44,
    "builtUpShare": 0.04,
    "treeCoverShare": 0.24,
    "waterWetlandShare": 0.04,
    "openVegetationShare": 0.24,
    "landUseSafeguardScore": 48
  },
  "SNNPR__Halaba": {
    "id": "SNNPR__Halaba",
    "region": "SNNPR",
    "zone": "Halaba",
    "sourceBoundaryName": "Alaba",
    "areaKm2": 866,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 38.057,
        "lat": 7.2728,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 38.13257,
        "lat": 7.2728,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c3",
        "lon": 38.20813,
        "lat": 7.2728,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 38.28369,
        "lat": 7.2728,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 38.35926,
        "lat": 7.2728,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c1",
        "lon": 38.057,
        "lat": 7.34133,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c2",
        "lon": 38.13257,
        "lat": 7.34133,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 38.20813,
        "lat": 7.34133,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 38.28369,
        "lat": 7.34133,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 38.35926,
        "lat": 7.34133,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 38.057,
        "lat": 7.40987,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c2",
        "lon": 38.13257,
        "lat": 7.40987,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 38.20813,
        "lat": 7.40987,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c4",
        "lon": 38.28369,
        "lat": 7.40987,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 38.35926,
        "lat": 7.40987,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 38.057,
        "lat": 7.47841,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r4c2",
        "lon": 38.13257,
        "lat": 7.47841,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 38.20813,
        "lat": 7.47841,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c4",
        "lon": 38.28369,
        "lat": 7.47841,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 38.35926,
        "lat": 7.47841,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 38.057,
        "lat": 7.54694,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c2",
        "lon": 38.13257,
        "lat": 7.54694,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 38.20813,
        "lat": 7.54694,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 38.28369,
        "lat": 7.54694,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c5",
        "lon": 38.35926,
        "lat": 7.54694,
        "classValue": 30,
        "classLabel": "Grassland"
      }
    ],
    "classShares": {
      "20": {
        "label": "Shrubland",
        "count": 1,
        "share": 0.04
      },
      "30": {
        "label": "Grassland",
        "count": 2,
        "share": 0.08
      },
      "40": {
        "label": "Cropland",
        "count": 21,
        "share": 0.84
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.84,
    "builtUpShare": 0,
    "treeCoverShare": 0,
    "waterWetlandShare": 0.04,
    "openVegetationShare": 0.12,
    "landUseSafeguardScore": 32
  },
  "SNNPR__Kefa": {
    "id": "SNNPR__Kefa",
    "region": "SNNPR",
    "zone": "Kefa",
    "sourceBoundaryName": "Keffa",
    "areaKm2": 10565,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 35.69043,
        "lat": 6.53397,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 35.83768,
        "lat": 6.53397,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 35.98623,
        "lat": 6.53397,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 36.13348,
        "lat": 6.53397,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c5",
        "lon": 36.28073,
        "lat": 6.53397,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c6",
        "lon": 36.42928,
        "lat": 6.53397,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c7",
        "lon": 36.57653,
        "lat": 6.53397,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 35.69043,
        "lat": 6.74242,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 35.83768,
        "lat": 6.74242,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c3",
        "lon": 35.98623,
        "lat": 6.74242,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 36.13348,
        "lat": 6.74242,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 36.28073,
        "lat": 6.74242,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c6",
        "lon": 36.42928,
        "lat": 6.74242,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c7",
        "lon": 36.57653,
        "lat": 6.74242,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c1",
        "lon": 35.69043,
        "lat": 6.95272,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 35.83768,
        "lat": 6.95272,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 35.98623,
        "lat": 6.95272,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c4",
        "lon": 36.13348,
        "lat": 6.95272,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 36.28073,
        "lat": 6.95272,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c6",
        "lon": 36.42928,
        "lat": 6.95272,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c7",
        "lon": 36.57653,
        "lat": 6.95272,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c1",
        "lon": 35.69043,
        "lat": 7.16118,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 35.83768,
        "lat": 7.16118,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 35.98623,
        "lat": 7.16118,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 36.13348,
        "lat": 7.16118,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 36.28073,
        "lat": 7.16118,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c6",
        "lon": 36.42928,
        "lat": 7.16118,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c7",
        "lon": 36.57653,
        "lat": 7.16118,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 35.69043,
        "lat": 7.36964,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 35.83768,
        "lat": 7.36964,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 35.98623,
        "lat": 7.36964,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 36.13348,
        "lat": 7.36964,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 36.28073,
        "lat": 7.36964,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c6",
        "lon": 36.42928,
        "lat": 7.36964,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c7",
        "lon": 36.57653,
        "lat": 7.36964,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c1",
        "lon": 35.69043,
        "lat": 7.57994,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c2",
        "lon": 35.83768,
        "lat": 7.57994,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c3",
        "lon": 35.98623,
        "lat": 7.57994,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r6c4",
        "lon": 36.13348,
        "lat": 7.57994,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c5",
        "lon": 36.28073,
        "lat": 7.57994,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c6",
        "lon": 36.42928,
        "lat": 7.57994,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c7",
        "lon": 36.57653,
        "lat": 7.57994,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c1",
        "lon": 35.69043,
        "lat": 7.78839,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c2",
        "lon": 35.83768,
        "lat": 7.78839,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c3",
        "lon": 35.98623,
        "lat": 7.78839,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c4",
        "lon": 36.13348,
        "lat": 7.78839,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c5",
        "lon": 36.28073,
        "lat": 7.78839,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 36.42928,
        "lat": 7.78839,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c7",
        "lon": 36.57653,
        "lat": 7.78839,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 20,
        "share": 0.408
      },
      "20": {
        "label": "Shrubland",
        "count": 11,
        "share": 0.224
      },
      "30": {
        "label": "Grassland",
        "count": 9,
        "share": 0.184
      },
      "40": {
        "label": "Cropland",
        "count": 9,
        "share": 0.184
      }
    },
    "croplandShare": 0.184,
    "builtUpShare": 0,
    "treeCoverShare": 0.408,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.408,
    "landUseSafeguardScore": 68
  },
  "SNNPR__Kembata Tembaro": {
    "id": "SNNPR__Kembata Tembaro",
    "region": "SNNPR",
    "zone": "Kembata Tembaro",
    "sourceBoundaryName": "KT",
    "areaKm2": 1407,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.46175,
        "lat": 7.19723,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c2",
        "lon": 37.58261,
        "lat": 7.19723,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 37.70347,
        "lat": 7.19723,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 37.82433,
        "lat": 7.19723,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 37.94519,
        "lat": 7.19723,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 37.46175,
        "lat": 7.25344,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 37.58261,
        "lat": 7.25344,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 37.70347,
        "lat": 7.25344,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 37.82433,
        "lat": 7.25344,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c5",
        "lon": 37.94519,
        "lat": 7.25344,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 37.46175,
        "lat": 7.30965,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c2",
        "lon": 37.58261,
        "lat": 7.30965,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 37.70347,
        "lat": 7.30965,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 37.82433,
        "lat": 7.30965,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 37.94519,
        "lat": 7.30965,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 37.46175,
        "lat": 7.36586,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 37.58261,
        "lat": 7.36586,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 37.70347,
        "lat": 7.36586,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 37.82433,
        "lat": 7.36586,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 37.94519,
        "lat": 7.36586,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 37.46175,
        "lat": 7.42207,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 37.58261,
        "lat": 7.42207,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 37.70347,
        "lat": 7.42207,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 37.82433,
        "lat": 7.42207,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c5",
        "lon": 37.94519,
        "lat": 7.42207,
        "classValue": 40,
        "classLabel": "Cropland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 5,
        "share": 0.2
      },
      "20": {
        "label": "Shrubland",
        "count": 10,
        "share": 0.4
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.24
      },
      "40": {
        "label": "Cropland",
        "count": 4,
        "share": 0.16
      }
    },
    "croplandShare": 0.16,
    "builtUpShare": 0,
    "treeCoverShare": 0.2,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.64,
    "landUseSafeguardScore": 75
  },
  "SNNPR__Konta Special": {
    "id": "SNNPR__Konta Special",
    "region": "SNNPR",
    "zone": "Konta Special",
    "sourceBoundaryName": "Konta",
    "areaKm2": 2363,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 36.42506,
        "lat": 6.59339,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 36.53465,
        "lat": 6.59339,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 36.64425,
        "lat": 6.59339,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c4",
        "lon": 36.75385,
        "lat": 6.59339,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 36.86344,
        "lat": 6.59339,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 36.42506,
        "lat": 6.74264,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c2",
        "lon": 36.53465,
        "lat": 6.74264,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 36.64425,
        "lat": 6.74264,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 36.75385,
        "lat": 6.74264,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 36.86344,
        "lat": 6.74264,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 36.42506,
        "lat": 6.8919,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 36.53465,
        "lat": 6.8919,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 36.64425,
        "lat": 6.8919,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 36.75385,
        "lat": 6.8919,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 36.86344,
        "lat": 6.8919,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 36.42506,
        "lat": 7.04116,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 36.53465,
        "lat": 7.04116,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 36.64425,
        "lat": 7.04116,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 36.75385,
        "lat": 7.04116,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 36.86344,
        "lat": 7.04116,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c1",
        "lon": 36.42506,
        "lat": 7.19041,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 36.53465,
        "lat": 7.19041,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 36.64425,
        "lat": 7.19041,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 36.75385,
        "lat": 7.19041,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 36.86344,
        "lat": 7.19041,
        "classValue": 20,
        "classLabel": "Shrubland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 14,
        "share": 0.56
      },
      "20": {
        "label": "Shrubland",
        "count": 7,
        "share": 0.28
      },
      "30": {
        "label": "Grassland",
        "count": 3,
        "share": 0.12
      },
      "40": {
        "label": "Cropland",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.04,
    "builtUpShare": 0,
    "treeCoverShare": 0.56,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.4,
    "landUseSafeguardScore": 73
  },
  "SNNPR__Segen Peoples'": {
    "id": "SNNPR__Segen Peoples'",
    "region": "SNNPR",
    "zone": "Segen Peoples'",
    "sourceBoundaryName": "Segen Peoples'",
    "areaKm2": 6845,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.1778,
        "lat": 5.29341,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 37.36235,
        "lat": 5.29341,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 37.5469,
        "lat": 5.29341,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 37.73145,
        "lat": 5.29341,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 37.916,
        "lat": 5.29341,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 37.1778,
        "lat": 5.43889,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 37.36235,
        "lat": 5.43889,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 37.5469,
        "lat": 5.43889,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c4",
        "lon": 37.73145,
        "lat": 5.43889,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 37.916,
        "lat": 5.43889,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 37.1778,
        "lat": 5.58437,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 37.36235,
        "lat": 5.58437,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 37.5469,
        "lat": 5.58437,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 37.73145,
        "lat": 5.58437,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c5",
        "lon": 37.916,
        "lat": 5.58437,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 37.1778,
        "lat": 5.72985,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 37.36235,
        "lat": 5.72985,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 37.5469,
        "lat": 5.72985,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c4",
        "lon": 37.73145,
        "lat": 5.72985,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 37.916,
        "lat": 5.72985,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c1",
        "lon": 37.1778,
        "lat": 5.87533,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 37.36235,
        "lat": 5.87533,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c3",
        "lon": 37.5469,
        "lat": 5.87533,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r5c4",
        "lon": 37.73145,
        "lat": 5.87533,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 37.916,
        "lat": 5.87533,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 4,
        "share": 0.16
      },
      "20": {
        "label": "Shrubland",
        "count": 17,
        "share": 0.68
      },
      "30": {
        "label": "Grassland",
        "count": 2,
        "share": 0.08
      },
      "40": {
        "label": "Cropland",
        "count": 1,
        "share": 0.04
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.04,
    "builtUpShare": 0,
    "treeCoverShare": 0.16,
    "waterWetlandShare": 0.04,
    "openVegetationShare": 0.76,
    "landUseSafeguardScore": 80
  },
  "SNNPR__Sheka": {
    "id": "SNNPR__Sheka",
    "region": "SNNPR",
    "zone": "Sheka",
    "sourceBoundaryName": "Sheka",
    "areaKm2": 2355,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 35.20416,
        "lat": 7.24351,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c2",
        "lon": 35.29741,
        "lat": 7.24351,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 35.39066,
        "lat": 7.24351,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 35.48391,
        "lat": 7.24351,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 35.57716,
        "lat": 7.24351,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 35.20416,
        "lat": 7.37572,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 35.29741,
        "lat": 7.37572,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 35.39066,
        "lat": 7.37572,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 35.48391,
        "lat": 7.37572,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 35.57716,
        "lat": 7.37572,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c1",
        "lon": 35.20416,
        "lat": 7.50792,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 35.29741,
        "lat": 7.50792,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 35.39066,
        "lat": 7.50792,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c4",
        "lon": 35.48391,
        "lat": 7.50792,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 35.57716,
        "lat": 7.50792,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 35.20416,
        "lat": 7.64012,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 35.29741,
        "lat": 7.64012,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c3",
        "lon": 35.39066,
        "lat": 7.64012,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 35.48391,
        "lat": 7.64012,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c5",
        "lon": 35.57716,
        "lat": 7.64012,
        "classValue": 90,
        "classLabel": "Herbaceous wetland"
      },
      {
        "key": "r5c1",
        "lon": 35.20416,
        "lat": 7.77233,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 35.29741,
        "lat": 7.77233,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 35.39066,
        "lat": 7.77233,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 35.48391,
        "lat": 7.77233,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 35.57716,
        "lat": 7.77233,
        "classValue": 10,
        "classLabel": "Tree cover"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 22,
        "share": 0.88
      },
      "20": {
        "label": "Shrubland",
        "count": 1,
        "share": 0.04
      },
      "40": {
        "label": "Cropland",
        "count": 1,
        "share": 0.04
      },
      "90": {
        "label": "Herbaceous wetland",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.04,
    "builtUpShare": 0,
    "treeCoverShare": 0.88,
    "waterWetlandShare": 0.04,
    "openVegetationShare": 0.04,
    "landUseSafeguardScore": 63
  },
  "SNNPR__Sidama": {
    "id": "SNNPR__Sidama",
    "region": "SNNPR",
    "zone": "Sidama",
    "sourceBoundaryName": "Sidama",
    "areaKm2": 6909,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 38.10261,
        "lat": 6.30305,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 38.31108,
        "lat": 6.30305,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c3",
        "lon": 38.51955,
        "lat": 6.30305,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 38.72802,
        "lat": 6.30305,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c5",
        "lon": 38.93649,
        "lat": 6.30305,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c1",
        "lon": 38.10261,
        "lat": 6.47762,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c2",
        "lon": 38.31108,
        "lat": 6.47762,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 38.51955,
        "lat": 6.47762,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c4",
        "lon": 38.72802,
        "lat": 6.47762,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 38.93649,
        "lat": 6.47762,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c1",
        "lon": 38.10261,
        "lat": 6.6522,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c2",
        "lon": 38.31108,
        "lat": 6.6522,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 38.51955,
        "lat": 6.6522,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 38.72802,
        "lat": 6.6522,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 38.93649,
        "lat": 6.6522,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c1",
        "lon": 38.10261,
        "lat": 6.82678,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c2",
        "lon": 38.31108,
        "lat": 6.82678,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 38.51955,
        "lat": 6.82678,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 38.72802,
        "lat": 6.82678,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 38.93649,
        "lat": 6.82678,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 38.10261,
        "lat": 7.00135,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 38.31108,
        "lat": 7.00135,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 38.51955,
        "lat": 7.00135,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c4",
        "lon": 38.72802,
        "lat": 7.00135,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c5",
        "lon": 38.93649,
        "lat": 7.00135,
        "classValue": 30,
        "classLabel": "Grassland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 6,
        "share": 0.24
      },
      "20": {
        "label": "Shrubland",
        "count": 7,
        "share": 0.28
      },
      "30": {
        "label": "Grassland",
        "count": 10,
        "share": 0.4
      },
      "40": {
        "label": "Cropland",
        "count": 2,
        "share": 0.08
      }
    },
    "croplandShare": 0.08,
    "builtUpShare": 0,
    "treeCoverShare": 0.24,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.68,
    "landUseSafeguardScore": 79
  },
  "SNNPR__Siltie": {
    "id": "SNNPR__Siltie",
    "region": "SNNPR",
    "zone": "Siltie",
    "sourceBoundaryName": "Selti",
    "areaKm2": 2593,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.97137,
        "lat": 7.51691,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c2",
        "lon": 38.08422,
        "lat": 7.51691,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c3",
        "lon": 38.19707,
        "lat": 7.51691,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 38.30992,
        "lat": 7.51691,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c5",
        "lon": 38.42277,
        "lat": 7.51691,
        "classValue": 80,
        "classLabel": "Permanent water bodies"
      },
      {
        "key": "r2c1",
        "lon": 37.97137,
        "lat": 7.63505,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 38.08422,
        "lat": 7.63505,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c3",
        "lon": 38.19707,
        "lat": 7.63505,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 38.30992,
        "lat": 7.63505,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 38.42277,
        "lat": 7.63505,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c1",
        "lon": 37.97137,
        "lat": 7.7532,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c2",
        "lon": 38.08422,
        "lat": 7.7532,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "center",
        "lon": 38.19707,
        "lat": 7.7532,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c4",
        "lon": 38.30992,
        "lat": 7.7532,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r3c5",
        "lon": 38.42277,
        "lat": 7.7532,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c1",
        "lon": 37.97137,
        "lat": 7.87135,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c2",
        "lon": 38.08422,
        "lat": 7.87135,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 38.19707,
        "lat": 7.87135,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 38.30992,
        "lat": 7.87135,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 38.42277,
        "lat": 7.87135,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 37.97137,
        "lat": 7.98949,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 38.08422,
        "lat": 7.98949,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c3",
        "lon": 38.19707,
        "lat": 7.98949,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c4",
        "lon": 38.30992,
        "lat": 7.98949,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c5",
        "lon": 38.42277,
        "lat": 7.98949,
        "classValue": 30,
        "classLabel": "Grassland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 1,
        "share": 0.04
      },
      "20": {
        "label": "Shrubland",
        "count": 3,
        "share": 0.12
      },
      "30": {
        "label": "Grassland",
        "count": 6,
        "share": 0.24
      },
      "40": {
        "label": "Cropland",
        "count": 14,
        "share": 0.56
      },
      "80": {
        "label": "Permanent water bodies",
        "count": 1,
        "share": 0.04
      }
    },
    "croplandShare": 0.56,
    "builtUpShare": 0,
    "treeCoverShare": 0.04,
    "waterWetlandShare": 0.04,
    "openVegetationShare": 0.36,
    "landUseSafeguardScore": 49
  },
  "SNNPR__South Omo": {
    "id": "SNNPR__South Omo",
    "region": "SNNPR",
    "zone": "South Omo",
    "sourceBoundaryName": "South Omo",
    "areaKm2": 23131,
    "sampleGridSize": 7,
    "samples": [
      {
        "key": "r1c1",
        "lon": 35.94892,
        "lat": 4.76367,
        "classValue": 60,
        "classLabel": "Bare / sparse vegetation"
      },
      {
        "key": "r1c2",
        "lon": 36.09888,
        "lat": 4.76367,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 36.25018,
        "lat": 4.76367,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c4",
        "lon": 36.40015,
        "lat": 4.76367,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 36.55012,
        "lat": 4.76367,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c6",
        "lon": 36.70142,
        "lat": 4.76367,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c7",
        "lon": 36.85138,
        "lat": 4.76367,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c1",
        "lon": 35.94892,
        "lat": 4.99184,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 36.09888,
        "lat": 4.99184,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 36.25018,
        "lat": 4.99184,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c4",
        "lon": 36.40015,
        "lat": 4.99184,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c5",
        "lon": 36.55012,
        "lat": 4.99184,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c6",
        "lon": 36.70142,
        "lat": 4.99184,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c7",
        "lon": 36.85138,
        "lat": 4.99184,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c1",
        "lon": 35.94892,
        "lat": 5.22202,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 36.09888,
        "lat": 5.22202,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "center",
        "lon": 36.25018,
        "lat": 5.22202,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c4",
        "lon": 36.40015,
        "lat": 5.22202,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r3c5",
        "lon": 36.55012,
        "lat": 5.22202,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c6",
        "lon": 36.70142,
        "lat": 5.22202,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c7",
        "lon": 36.85138,
        "lat": 5.22202,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c1",
        "lon": 35.94892,
        "lat": 5.45019,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c2",
        "lon": 36.09888,
        "lat": 5.45019,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 36.25018,
        "lat": 5.45019,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c4",
        "lon": 36.40015,
        "lat": 5.45019,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c5",
        "lon": 36.55012,
        "lat": 5.45019,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c6",
        "lon": 36.70142,
        "lat": 5.45019,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c7",
        "lon": 36.85138,
        "lat": 5.45019,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c1",
        "lon": 35.94892,
        "lat": 5.67836,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c2",
        "lon": 36.09888,
        "lat": 5.67836,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c3",
        "lon": 36.25018,
        "lat": 5.67836,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 36.40015,
        "lat": 5.67836,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 36.55012,
        "lat": 5.67836,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r5c6",
        "lon": 36.70142,
        "lat": 5.67836,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c7",
        "lon": 36.85138,
        "lat": 5.67836,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c1",
        "lon": 35.94892,
        "lat": 5.90854,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c2",
        "lon": 36.09888,
        "lat": 5.90854,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c3",
        "lon": 36.25018,
        "lat": 5.90854,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r6c4",
        "lon": 36.40015,
        "lat": 5.90854,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c5",
        "lon": 36.55012,
        "lat": 5.90854,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r6c6",
        "lon": 36.70142,
        "lat": 5.90854,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r6c7",
        "lon": 36.85138,
        "lat": 5.90854,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c1",
        "lon": 35.94892,
        "lat": 6.13671,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r7c2",
        "lon": 36.09888,
        "lat": 6.13671,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r7c3",
        "lon": 36.25018,
        "lat": 6.13671,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c4",
        "lon": 36.40015,
        "lat": 6.13671,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c5",
        "lon": 36.55012,
        "lat": 6.13671,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r7c6",
        "lon": 36.70142,
        "lat": 6.13671,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r7c7",
        "lon": 36.85138,
        "lat": 6.13671,
        "classValue": 20,
        "classLabel": "Shrubland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 14,
        "share": 0.286
      },
      "20": {
        "label": "Shrubland",
        "count": 20,
        "share": 0.408
      },
      "30": {
        "label": "Grassland",
        "count": 13,
        "share": 0.265
      },
      "40": {
        "label": "Cropland",
        "count": 1,
        "share": 0.02
      },
      "60": {
        "label": "Bare / sparse vegetation",
        "count": 1,
        "share": 0.02
      }
    },
    "croplandShare": 0.02,
    "builtUpShare": 0,
    "treeCoverShare": 0.286,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.694,
    "landUseSafeguardScore": 81
  },
  "SNNPR__Wolayita": {
    "id": "SNNPR__Wolayita",
    "region": "SNNPR",
    "zone": "Wolayita",
    "sourceBoundaryName": "Wolayita",
    "areaKm2": 4476,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.36979,
        "lat": 6.62012,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 37.52369,
        "lat": 6.62012,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r1c3",
        "lon": 37.67759,
        "lat": 6.62012,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r1c4",
        "lon": 37.83149,
        "lat": 6.62012,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c5",
        "lon": 37.98539,
        "lat": 6.62012,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c1",
        "lon": 37.36979,
        "lat": 6.73518,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r2c2",
        "lon": 37.52369,
        "lat": 6.73518,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c3",
        "lon": 37.67759,
        "lat": 6.73518,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c4",
        "lon": 37.83149,
        "lat": 6.73518,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r2c5",
        "lon": 37.98539,
        "lat": 6.73518,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c1",
        "lon": 37.36979,
        "lat": 6.85023,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 37.52369,
        "lat": 6.85023,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "center",
        "lon": 37.67759,
        "lat": 6.85023,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c4",
        "lon": 37.83149,
        "lat": 6.85023,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 37.98539,
        "lat": 6.85023,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r4c1",
        "lon": 37.36979,
        "lat": 6.96528,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c2",
        "lon": 37.52369,
        "lat": 6.96528,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c3",
        "lon": 37.67759,
        "lat": 6.96528,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r4c4",
        "lon": 37.83149,
        "lat": 6.96528,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 37.98539,
        "lat": 6.96528,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c1",
        "lon": 37.36979,
        "lat": 7.08034,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c2",
        "lon": 37.52369,
        "lat": 7.08034,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c3",
        "lon": 37.67759,
        "lat": 7.08034,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c4",
        "lon": 37.83149,
        "lat": 7.08034,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r5c5",
        "lon": 37.98539,
        "lat": 7.08034,
        "classValue": 30,
        "classLabel": "Grassland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 1,
        "share": 0.04
      },
      "20": {
        "label": "Shrubland",
        "count": 11,
        "share": 0.44
      },
      "30": {
        "label": "Grassland",
        "count": 5,
        "share": 0.2
      },
      "40": {
        "label": "Cropland",
        "count": 8,
        "share": 0.32
      }
    },
    "croplandShare": 0.32,
    "builtUpShare": 0,
    "treeCoverShare": 0.04,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.64,
    "landUseSafeguardScore": 68
  },
  "SNNPR__Yem Special": {
    "id": "SNNPR__Yem Special",
    "region": "SNNPR",
    "zone": "Yem Special",
    "sourceBoundaryName": "Yem",
    "areaKm2": 754,
    "sampleGridSize": 5,
    "samples": [
      {
        "key": "r1c1",
        "lon": 37.4236,
        "lat": 7.63792,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c2",
        "lon": 37.46085,
        "lat": 7.63792,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r1c3",
        "lon": 37.4981,
        "lat": 7.63792,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c4",
        "lon": 37.53535,
        "lat": 7.63792,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r1c5",
        "lon": 37.5726,
        "lat": 7.63792,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c1",
        "lon": 37.4236,
        "lat": 7.71488,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c2",
        "lon": 37.46085,
        "lat": 7.71488,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c3",
        "lon": 37.4981,
        "lat": 7.71488,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r2c4",
        "lon": 37.53535,
        "lat": 7.71488,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r2c5",
        "lon": 37.5726,
        "lat": 7.71488,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c1",
        "lon": 37.4236,
        "lat": 7.79184,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c2",
        "lon": 37.46085,
        "lat": 7.79184,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "center",
        "lon": 37.4981,
        "lat": 7.79184,
        "classValue": 30,
        "classLabel": "Grassland"
      },
      {
        "key": "r3c4",
        "lon": 37.53535,
        "lat": 7.79184,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r3c5",
        "lon": 37.5726,
        "lat": 7.79184,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r4c1",
        "lon": 37.4236,
        "lat": 7.8688,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c2",
        "lon": 37.46085,
        "lat": 7.8688,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c3",
        "lon": 37.4981,
        "lat": 7.8688,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c4",
        "lon": 37.53535,
        "lat": 7.8688,
        "classValue": 40,
        "classLabel": "Cropland"
      },
      {
        "key": "r4c5",
        "lon": 37.5726,
        "lat": 7.8688,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c1",
        "lon": 37.4236,
        "lat": 7.94576,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c2",
        "lon": 37.46085,
        "lat": 7.94576,
        "classValue": 20,
        "classLabel": "Shrubland"
      },
      {
        "key": "r5c3",
        "lon": 37.4981,
        "lat": 7.94576,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c4",
        "lon": 37.53535,
        "lat": 7.94576,
        "classValue": 10,
        "classLabel": "Tree cover"
      },
      {
        "key": "r5c5",
        "lon": 37.5726,
        "lat": 7.94576,
        "classValue": 30,
        "classLabel": "Grassland"
      }
    ],
    "classShares": {
      "10": {
        "label": "Tree cover",
        "count": 9,
        "share": 0.36
      },
      "20": {
        "label": "Shrubland",
        "count": 10,
        "share": 0.4
      },
      "30": {
        "label": "Grassland",
        "count": 2,
        "share": 0.08
      },
      "40": {
        "label": "Cropland",
        "count": 4,
        "share": 0.16
      }
    },
    "croplandShare": 0.16,
    "builtUpShare": 0,
    "treeCoverShare": 0.36,
    "waterWetlandShare": 0,
    "openVegetationShare": 0.48,
    "landUseSafeguardScore": 71
  }
};

export function landCoverForAdm2(id?: string) {
  return id ? LANDCOVER_ADM2[id] : undefined;
}
