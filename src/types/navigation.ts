import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Domain } from "./api";

export type RootStackParamList = {
  Home: undefined;
  Domain: { domain: Domain };
  Result: { data: any };
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;
export type DomainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Domain"
>;
export type ResultScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Result"
>;