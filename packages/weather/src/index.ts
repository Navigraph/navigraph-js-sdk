import { GraphQLClient } from "graphql-request";
import { getSdk as getGQLSDK } from "./generated/graphql";

const client = new GraphQLClient("https://api.navigraph.com/weather");

export const getWeatherAPI = () => getGQLSDK(client);
