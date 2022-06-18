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
  cloud_base_ft_agl?: Maybe<Scalars['Float']>;
  cloud_top_ft_agl?: Maybe<Scalars['Float']>;
  sky_cover: Scalars['String'];
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
  cloud_base_ft_agl?: Maybe<Scalars['Float']>;
  cloud_top_ft_agl?: Maybe<Scalars['Float']>;
  sky_cover: Scalars['String'];
};

export type PirepIcing = {
  __typename?: 'PirepIcing';
  icing_base_ft_msl?: Maybe<Scalars['Float']>;
  icing_intensity?: Maybe<Scalars['String']>;
  icing_top_ft_msl?: Maybe<Scalars['Float']>;
  icing_type?: Maybe<Scalars['String']>;
};

export type PirepTurbulence = {
  __typename?: 'PirepTurbulence';
  turbulence_base_ft_msl?: Maybe<Scalars['Float']>;
  turbulence_freq?: Maybe<Scalars['String']>;
  turbulence_intensity?: Maybe<Scalars['String']>;
  turbulence_top_ft_msl?: Maybe<Scalars['Float']>;
  turbulence_type?: Maybe<Scalars['String']>;
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
  cloud_base_ft_agl?: Maybe<Scalars['Float']>;
  cloud_type: Scalars['String'];
  sky_cover: Scalars['String'];
};

export type TafForecast = {
  __typename?: 'TafForecast';
  altim_in_hg?: Maybe<Scalars['String']>;
  change_indicator?: Maybe<Scalars['String']>;
  clouds?: Maybe<Array<TafCloud>>;
  fcst_time_from: Scalars['String'];
  fcst_time_to: Scalars['String'];
  icing?: Maybe<TafIcing>;
  not_decoded?: Maybe<Scalars['String']>;
  probability?: Maybe<Scalars['String']>;
  surfaceTemp?: Maybe<Array<TafSurfaceTemperature>>;
  time_becoming?: Maybe<Scalars['String']>;
  turbulence?: Maybe<TafTurbulence>;
  vert_vis_ft?: Maybe<Scalars['String']>;
  visibility_statute_mi?: Maybe<Scalars['String']>;
  wind?: Maybe<TafWind>;
  wx_number?: Maybe<Scalars['String']>;
};

export type TafIcing = {
  __typename?: 'TafIcing';
  icing_intensity: Scalars['String'];
  icing_max_alt_ft_agl?: Maybe<Scalars['Float']>;
  icing_min_alt_ft_agl?: Maybe<Scalars['Float']>;
};

export type TafSurfaceTemperature = {
  __typename?: 'TafSurfaceTemperature';
  max_or_min_temp_c?: Maybe<Scalars['Float']>;
  sfc_temp_c?: Maybe<Scalars['Float']>;
  valid_time?: Maybe<Scalars['String']>;
};

export type TafTurbulence = {
  __typename?: 'TafTurbulence';
  turbulence_intensity: Scalars['String'];
  turbulence_max_alt_ft_agl?: Maybe<Scalars['Float']>;
  turbulence_min_alt_ft_agl?: Maybe<Scalars['Float']>;
};

export type TafWind = {
  __typename?: 'TafWind';
  wind_dir_degrees?: Maybe<Scalars['Float']>;
  wind_gust_kt?: Maybe<Scalars['Float']>;
  wind_shear_dir_degrees?: Maybe<Scalars['Float']>;
  wind_shear_hgt_ft_agl?: Maybe<Scalars['Float']>;
  wind_shear_speed_kt?: Maybe<Scalars['Float']>;
  wind_speed_kt?: Maybe<Scalars['Float']>;
};

export type GetMetarQueryVariables = Exact<{
  icao: Scalars['String'];
}>;


export type GetMetarQuery = { __typename?: 'Query', metar?: { __typename?: 'Metar', rawText: string, remark?: string | null | undefined, latitude?: number | null | undefined } | null | undefined };

export type GetTafQueryVariables = Exact<{
  icao: Scalars['String'];
}>;


export type GetTafQuery = { __typename?: 'Query', taf?: { __typename?: 'Taf', rawText: string } | null | undefined };


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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getMetar(variables: GetMetarQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetMetarQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetMetarQuery>(GetMetarDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getMetar');
    },
    getTaf(variables: GetTafQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetTafQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetTafQuery>(GetTafDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTaf');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;