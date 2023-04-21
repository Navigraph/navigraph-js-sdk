export enum ApproachChartTypeCode {
  ILSApproachChart = "01",
  PARApproachChart = "02",
  VORApproachChart = "03",
  TACANApproachChart = "04",
  NonPrecisionHelicopterApproachChart = "05",
  NDBApproachChart = "06",
  DFApproachChart = "07",
  ASRApproachChart = "08",
  VORDMERNAVApproachChart = "09",
  ILSSACatI = "11",
  PrecisionHelicopterApproachChart = "15",
  ILSCatIIApproachChart = "1A",
  ILSCatIIAndIIIAApproachChart = "1B",
  ILSCatIIAndIIIAAndBApproachChart = "1C",
  LOCApproachChart = "1D",
  LOCBackCrsApproachChart = "1E",
  LDAApproachChart = "1F",
  SDFApproachChart = "1G",
  MLSApproachChart = "1H",
  VisualApproachChartExcludesCvfps = "1J",
  VicinityChart = "1K",
  RNAVApproachChartExcludesVORDMERNAV = "1L",
  SoleUseGpsNonPrecisionApproachChartExcludes = "1M",
  SoleUseFmsApproachChart = "1N",
  ILSSACatII = "1P",
  ILSApproachOrGpsChart = "21",
  PARApproachOrGpsChart = "22",
  VORApproachOrGpsChart = "23",
  TACANApproachOrGpsChart = "24",
  HelicopterApproachOrGpsChart = "25",
  NDBApproachOrGpsChart = "26",
  DFApproachOrGpsChart = "27",
  ASRApproachOrGpsChart = "28",
  VORDMERNAVApproachOrGpsChart = "29",
  ILSCatIIApproachOrGpsChart = "2A",
  ILSCatIIAndIIIAApproachOrGpsChart = "2B",
  ILSCatIiAndIiiAAndBApproachOrGpsChart = "2C",
  LOCApproachOrGpsChart = "2D",
  LOCBackCrsApproachOrGpsChart = "2E",
  LDAApproachOrGpsChart = "2F",
  SDFApproachOrGpsChart = "2G",
  MLSApproachOrGpsChart = "2H",
  VisualApproachOrGpsChart = "2J",
  VicinityOrGpsChart = "2K",
  SoleUseFmsApproachOrGpsChart = "2N",
  RNPProcedures = "RP",
  GLSApproachCharts = "RS",
  VFRArrivalsAndDepartures = "VF",
}

export enum AirspaceChartTypeCode {
  AreaChart = "A",
  ClassBTCAOrTMAChart = "B",
  EnrouteVisualChart = "C",
  CAOQuickReferenceChart = "FF",
}

export enum AirportChartTypeCode {
  AirportChart = "AP",
  AirportFamiliarizationChart = "AF",
  AirportQualificationChart = "AQ",
  AirportBriefingChart = "P",
  MiscAirportChart = "AA",
  MiscGraphicChart = "MG",
  NonAssignedTypeWillBeResearchedLater = "NA",
  ColdTemperatureTable = "P1",
  ParkingGatesSMGCSAndLowVisProcedureChart = "R",
  NoseInParkingAndDockingCharts = "S",
}

export enum DepartureChartTypeCode {
  SIDOrDPChart = "G",
  SIDOrDPOrGPSChart = "G2",
  RNAVOrBothGPSAndFMSAuthorizedDepartureChar = "GG",
  RNPSIDOrDepartureChart = "GP",
  EngineOutProcedures = "EO",
  SoleUseFMSDepartureChart = "GH",
  OpsdataEngineFailureProcedure = "OP",
}

export enum ArrivalChartTypeCode {
  STARChart = "J",
  STARChartOrGp = "J2",
  RNAVOrBothGPSAndFMSAuthorizedArrivalChart = "JG",
  SoleUseFMSArrivalChart = "JH",
  RNPSTAROrArrivalChart = "JP",
}

export enum NoiseChartTypeCode {
  NoiseAbatementChart = "N",
}

export enum TextChartTypeCode {
  MiscTextPages = "ST",
  TerminalTextPages = "TP",
  TailoredTextPages = "TT",
}

// All typecodes merged in one enum
export const ChartTypeCode = {
  ...AirportChartTypeCode,
  ...AirspaceChartTypeCode,
  ...ApproachChartTypeCode,
  ...DepartureChartTypeCode,
  ...ArrivalChartTypeCode,
  ...NoiseChartTypeCode,
  ...TextChartTypeCode,
};

/** The type of chart, with higher granularity than a chart category. Can be used to facilitate more fine-grained filtering. */
export type ChartTypeCode =
  | ApproachChartTypeCode
  | AirspaceChartTypeCode
  | AirportChartTypeCode
  | DepartureChartTypeCode
  | ArrivalChartTypeCode
  | NoiseChartTypeCode
  | TextChartTypeCode;
