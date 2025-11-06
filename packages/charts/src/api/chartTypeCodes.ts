export enum ApproachChartTypeCode {
  /** @precision true */
  ILSApproachChart = "01",
  /** @precision true */
  PARApproachChart = "02",
  /** @precision false */
  VORApproachChart = "03",
  /** @precision false */
  TACANApproachChart = "04",
  /** @precision false */
  NonPrecisionHelicopterApproachChart = "05",
  /** @precision false */
  NDBApproachChart = "06",
  /** @precision false */
  DFApproachChart = "07",
  /** @precision false */
  ASRApproachChart = "08",
  /** @precision false */
  VORDMERNAVApproachChart = "09",
  /** @precision true */
  ILSSACatI = "11",
  /** @precision true */
  PrecisionHelicopterApproachChart = "15",
  /** @precision true */
  ILSCatIIApproachChart = "1A",
  /** @precision true */
  ILSCatIIAndIIIAApproachChart = "1B",
  /** @precision true */
  ILSCatIIAndIIIAAndBApproachChart = "1C",
  /** @precision false */
  LOCApproachChart = "1D",
  /** @precision false */
  LOCBackCrsApproachChart = "1E",
  /** @precision false */
  LDAApproachChart = "1F",
  /** @precision false */
  SDFApproachChart = "1G",
  /** @precision true */
  MLSApproachChart = "1H",
  /** @precision false */
  VisualApproachChartExcludesCvfps = "1J",
  /** @precision false */
  VicinityChart = "1K",
  /** @precision false */
  RNAVApproachChartExcludesVORDMERNAV = "1L",
  /** @precision false */
  SoleUseGpsNonPrecisionApproachChartExcludes = "1M",
  /** @precision false */
  SoleUseFmsApproachChart = "1N",
  /** @precision true */
  ILSSACatII = "1P",
  /** @precision true */
  ILSApproachOrGpsChart = "21",
  /** @precision true */
  PARApproachOrGpsChart = "22",
  /** @precision false */
  VORApproachOrGpsChart = "23",
  /** @precision false */
  TACANApproachOrGpsChart = "24",
  /** @precision false */
  HelicopterApproachOrGpsChart = "25",
  /** @precision false */
  NDBApproachOrGpsChart = "26",
  /** @precision false */
  DFApproachOrGpsChart = "27",
  /** @precision false */
  ASRApproachOrGpsChart = "28",
  /** @precision false */
  VORDMERNAVApproachOrGpsChart = "29",
  /** @precision true */
  ILSCatIIApproachOrGpsChart = "2A",
  /** @precision true */
  ILSCatIIAndIIIAApproachOrGpsChart = "2B",
  /** @precision true */
  ILSCatIiAndIiiAAndBApproachOrGpsChart = "2C",
  /** @precision false */
  LOCApproachOrGpsChart = "2D",
  /** @precision false */
  LOCBackCrsApproachOrGpsChart = "2E",
  /** @precision false */
  LDAApproachOrGpsChart = "2F",
  /** @precision false */
  SDFApproachOrGpsChart = "2G",
  /** @precision true */
  MLSApproachOrGpsChart = "2H",
  /** @precision false */
  VisualApproachOrGpsChart = "2J",
  /** @precision false */
  VicinityOrGpsChart = "2K",
  /** @precision false */
  SoleUseFmsApproachOrGpsChart = "2N",
  /** @precision false */
  VFRApproachGliderMicroLights = "6G",
  /** @precision false */
  VFRApproachGliderMicroLightsRelatedPages = "6H",
  /** @precision false */
  VFRApproachCharts = "6J",
  /** @precision false */
  VFRApproachChartsRelatedPages = '6K',
  /** @precision false */
  VFRApproachChartsHelicopter = "6M",
  /** @precision false */
  VFRApproachChartsHelicopterRelatedPages = "6N",
  /** @precision false */
  VFRSpecialEventApproach = "6R",
  /** @precision false */
  VFRTempApproach = "6U",
  /** @precision false */
  RNPProcedures = "RP",
  /** @precision true */
  GLSApproachCharts = "RS",
  /** @precision false */
  VFRArrivalsAndDepartures = "VF",
}

export enum AirspaceChartTypeCode {
  VFRAreaChart = "6A",
  VFRAreaChartRelatedPages = "6B",
  AreaChart = "A",
  ClassBTCAOrTMAChart = "B",
  EnrouteVisualChart = "C",
  CAOQuickReferenceChart = "FF",
}

export enum AirportChartTypeCode {
  VFRPrimaryAerodromeDiagram = "6P",
  VFRApronDiagramsAndTextPages = "6Q",
  VFRSpecialEventAerodromeDiagram = "6S",
  VFRTempAerodromeDiagram = "6V",
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
  VFRDeparture = "6D",
  SIDOrDPChart = "G",
  SIDOrDPOrGPSChart = "G2",
  RNAVOrBothGPSAndFMSAuthorizedDepartureChar = "GG",
  RNPSIDOrDepartureChart = "GP",
  EngineOutProcedures = "EO",
  SoleUseFMSDepartureChart = "GH",
  OpsdataEngineFailureProcedure = "OP",
}

export enum ArrivalChartTypeCode {
  VFRArrival = "6C",
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
  VFRChartRelatedText = "6L",
  VFRSpecialEventRelatedText = "6W",
  VFRTempChartRelatedText = "6S",
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
}

/** The type of chart, with higher granularity than a chart category. Can be used to facilitate more fine-grained filtering. */
export type ChartTypeCode =
  | ApproachChartTypeCode
  | AirspaceChartTypeCode
  | AirportChartTypeCode
  | DepartureChartTypeCode
  | ArrivalChartTypeCode
  | NoiseChartTypeCode
  | TextChartTypeCode
