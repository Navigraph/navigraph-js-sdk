import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  GeoJSONPointScalar: any;
  GeoJSONPolygonScalar: any;
};

export type Metar = {
  __typename?: 'Metar';
  altimInHg?: Maybe<Scalars['Float']>;
  auto?: Maybe<Scalars['Boolean']>;
  clouds?: Maybe<Array<MetarCloud>>;
  dewpointC?: Maybe<Scalars['Float']>;
  elevationM?: Maybe<Scalars['Float']>;
  flightCategory?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['GeoJSONPointScalar']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  metarType?: Maybe<Scalars['String']>;
  observationTime: Scalars['DateTime'];
  rawText: Scalars['String'];
  remark?: Maybe<Scalars['String']>;
  seaLevelPressureMb?: Maybe<Scalars['Float']>;
  stationId: Scalars['String'];
  tempC?: Maybe<Scalars['Float']>;
  visibilityStatuteMi?: Maybe<Scalars['Float']>;
  windDirDegrees?: Maybe<Scalars['Float']>;
  windGustKt?: Maybe<Scalars['Float']>;
  windSpeedKt?: Maybe<Scalars['Float']>;
  wxString?: Maybe<Scalars['String']>;
};

export type MetarCloud = {
  __typename?: 'MetarCloud';
  cloudBaseFtAgl?: Maybe<Scalars['Float']>;
  cloudTopFtAgl?: Maybe<Scalars['Float']>;
  skyCover: Scalars['String'];
};

export type Pirep = {
  __typename?: 'Pirep';
  aboveGroundLevelIndicated?: Maybe<Scalars['Boolean']>;
  aircraftRef: Scalars['String'];
  altitudeFtMsl?: Maybe<Scalars['Float']>;
  badLocation?: Maybe<Scalars['Boolean']>;
  clouds?: Maybe<Array<PirepCloud>>;
  fltLvlRange?: Maybe<Scalars['Boolean']>;
  geom?: Maybe<Scalars['GeoJSONPointScalar']>;
  icing?: Maybe<PirepIcing>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  midPointAssumed?: Maybe<Scalars['Boolean']>;
  noFltLvl?: Maybe<Scalars['Boolean']>;
  noTimeStamp?: Maybe<Scalars['Boolean']>;
  observationTime: Scalars['DateTime'];
  rawText?: Maybe<Scalars['String']>;
  receiptTime?: Maybe<Scalars['DateTime']>;
  reportType?: Maybe<Scalars['String']>;
  tempC?: Maybe<Scalars['Float']>;
  turbulence?: Maybe<PirepTurbulence>;
  vertGustKt?: Maybe<Scalars['Float']>;
  visibilityStatuteMi?: Maybe<Scalars['Float']>;
  windDirDegrees?: Maybe<Scalars['Float']>;
  windSpeedKt?: Maybe<Scalars['Float']>;
  wxString?: Maybe<Scalars['String']>;
};

export type PirepCloud = {
  __typename?: 'PirepCloud';
  cloudBaseFtAgl?: Maybe<Scalars['Float']>;
  cloudTopFtAgl?: Maybe<Scalars['Float']>;
  skyCover: Scalars['String'];
};

export type PirepIcing = {
  __typename?: 'PirepIcing';
  icingBaseFtMsl?: Maybe<Scalars['Float']>;
  icingIntensity?: Maybe<Scalars['String']>;
  icingTopFtMsl?: Maybe<Scalars['Float']>;
  icingType?: Maybe<Scalars['String']>;
};

export type PirepTurbulence = {
  __typename?: 'PirepTurbulence';
  turbulenceBaseFtMsl?: Maybe<Scalars['Float']>;
  turbulenceFreq?: Maybe<Scalars['String']>;
  turbulenceIntensity?: Maybe<Scalars['String']>;
  turbulenceTopFtMsl?: Maybe<Scalars['Float']>;
  turbulenceType?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  metar?: Maybe<Metar>;
  metars?: Maybe<Array<Metar>>;
  metarsAround?: Maybe<Array<Metar>>;
  metarsBetween?: Maybe<Array<Metar>>;
  pirepsAround?: Maybe<Array<Pirep>>;
  pirepsBetween?: Maybe<Array<Pirep>>;
  sigmetsAround?: Maybe<Array<Sigmet>>;
  sigmetsBetween?: Maybe<Array<Sigmet>>;
  taf?: Maybe<Taf>;
  tafsAround?: Maybe<Array<Taf>>;
  tafsBetween?: Maybe<Array<Taf>>;
};


export type QueryMetarArgs = {
  icao: Scalars['String'];
};


export type QueryMetarsArgs = {
  icao: Scalars['String'];
};


export type QueryMetarsAroundArgs = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};


export type QueryMetarsBetweenArgs = {
  depLat: Scalars['Float'];
  depLng: Scalars['Float'];
  desLat: Scalars['Float'];
  desLng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};


export type QueryPirepsAroundArgs = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};


export type QueryPirepsBetweenArgs = {
  depLat: Scalars['Float'];
  depLng: Scalars['Float'];
  desLat: Scalars['Float'];
  desLng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};


export type QuerySigmetsAroundArgs = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};


export type QuerySigmetsBetweenArgs = {
  depLat: Scalars['Float'];
  depLng: Scalars['Float'];
  desLat: Scalars['Float'];
  desLng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};


export type QueryTafArgs = {
  icao: Scalars['String'];
};


export type QueryTafsAroundArgs = {
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};


export type QueryTafsBetweenArgs = {
  depLat: Scalars['Float'];
  depLng: Scalars['Float'];
  desLat: Scalars['Float'];
  desLng: Scalars['Float'];
  radiusNm: Scalars['Float'];
};

export type Sigmet = {
  __typename?: 'Sigmet';
  airsigmetType?: Maybe<Scalars['String']>;
  change?: Maybe<Scalars['String']>;
  firId?: Maybe<Scalars['String']>;
  firName?: Maybe<Scalars['String']>;
  geom?: Maybe<Scalars['GeoJSONPolygonScalar']>;
  hazard?: Maybe<Scalars['String']>;
  icao?: Maybe<Scalars['String']>;
  maxFtMsl?: Maybe<Scalars['Float']>;
  minFtMsl?: Maybe<Scalars['Float']>;
  movementDir?: Maybe<Scalars['String']>;
  movementSpeedKt?: Maybe<Scalars['Float']>;
  rawText: Scalars['String'];
  seriesId?: Maybe<Scalars['String']>;
  severity?: Maybe<Scalars['String']>;
  validTimeFrom?: Maybe<Scalars['DateTime']>;
  validTimeTo?: Maybe<Scalars['DateTime']>;
};

export type Taf = {
  __typename?: 'Taf';
  bulletinTime?: Maybe<Scalars['DateTime']>;
  elevationM?: Maybe<Scalars['Float']>;
  forecasts: Array<TafForecast>;
  geom?: Maybe<Scalars['GeoJSONPointScalar']>;
  issueTime: Scalars['DateTime'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  rawText: Scalars['String'];
  remarks?: Maybe<Scalars['String']>;
  stationId: Scalars['String'];
  validTimeFrom?: Maybe<Scalars['DateTime']>;
  validTimeTo?: Maybe<Scalars['DateTime']>;
};

export type TafCloud = {
  __typename?: 'TafCloud';
  cloudBaseFtAgl?: Maybe<Scalars['Float']>;
  cloudType: Scalars['String'];
  skyCover: Scalars['String'];
};

export type TafForecast = {
  __typename?: 'TafForecast';
  altimInHg?: Maybe<Scalars['Float']>;
  changeIndicator?: Maybe<Scalars['String']>;
  clouds?: Maybe<Array<TafCloud>>;
  fcstTimeFrom: Scalars['String'];
  fcstTimeTo: Scalars['String'];
  icing?: Maybe<TafIcing>;
  notDecoded?: Maybe<Scalars['String']>;
  probability?: Maybe<Scalars['String']>;
  surfaceTemp?: Maybe<Array<TafSurfaceTemperature>>;
  timeBecoming?: Maybe<Scalars['String']>;
  turbulence?: Maybe<TafTurbulence>;
  vertVisFt?: Maybe<Scalars['Float']>;
  visibilityStatuteMi?: Maybe<Scalars['Float']>;
  wind?: Maybe<TafWind>;
  wxNumber?: Maybe<Scalars['String']>;
};

export type TafIcing = {
  __typename?: 'TafIcing';
  icingIntensity: Scalars['String'];
  icingMaxAltFtAgl?: Maybe<Scalars['Float']>;
  icingMinAltFtAgl?: Maybe<Scalars['Float']>;
};

export type TafSurfaceTemperature = {
  __typename?: 'TafSurfaceTemperature';
  maxOrMinTempC?: Maybe<Scalars['Float']>;
  sfcTempC?: Maybe<Scalars['Float']>;
  validTime?: Maybe<Scalars['String']>;
};

export type TafTurbulence = {
  __typename?: 'TafTurbulence';
  turbulenceIntensity: Scalars['String'];
  turbulenceMaxAltFtAgl?: Maybe<Scalars['Float']>;
  turbulenceMinAltFtAgl?: Maybe<Scalars['Float']>;
};

export type TafWind = {
  __typename?: 'TafWind';
  windDirDegrees?: Maybe<Scalars['Float']>;
  windGustKt?: Maybe<Scalars['Float']>;
  windShearDirDegrees?: Maybe<Scalars['Float']>;
  windShearHgtFtAgl?: Maybe<Scalars['Float']>;
  windShearSpeedKt?: Maybe<Scalars['Float']>;
  windSpeedKt?: Maybe<Scalars['Float']>;
};

export type GetMetarQueryVariables = Exact<{
  icao: Scalars['String'];
}>;


export type GetMetarQuery = { __typename?: 'Query', metar?: { __typename?: 'Metar', rawText: string, remark?: string | null, latitude?: number | null } | null };

export type GetTafQueryVariables = Exact<{
  icao: Scalars['String'];
}>;


export type GetTafQuery = { __typename?: 'Query', taf?: { __typename?: 'Taf', rawText: string } | null };


export const GetMetarDocument = gql`
    query getMetar($icao: String!) {
  metar(icao: $icao) {
    rawText
    remark
    latitude
  }
}
    `;
export const GetTafDocument = gql`
    query getTaf($icao: String!) {
  taf(icao: $icao) {
    rawText
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getMetar(variables: GetMetarQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMetarQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMetarQuery>(GetMetarDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMetar', 'query');
    },
    getTaf(variables: GetTafQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTafQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTafQuery>(GetTafDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTaf', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;