import { GraphQLClient } from "graphql-request";
import { getSdk as getGQLSDK } from "./generated/graphql";

const client = new GraphQLClient("https://weather.navigraph.com/graphql");

export const getWeatherClient = () => getGQLSDK(client);
