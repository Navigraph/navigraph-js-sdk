import { GraphQLClient } from "graphql-request";
import { getSdk as getGQLSDK } from "./generated/graphql";

const client = new GraphQLClient("https://weather.api.navigraph.com/graphql");

export const getWeatherAPI = () => getGQLSDK(client);
