import * as FileSystem from "expo-file-system";
import { Domain } from "../types/api";

const API_URL = ""; // Replace with your actual API URL

export const getDomains = async (): Promise<Domain[]> => {
  // In a real app, you might fetch this from an API
  const domains = require("../../assets/domains.json");
  return domains;
};

export const processImage = async (
  imageUri: string,
  domain: Domain
): Promise<any> => {
  const endpoint = `${API_URL}/process/${domain.endpoint}`;

  try {
    const response = await FileSystem.uploadAsync(endpoint, imageUri, {
      fieldName: "file",
      httpMethod: "POST",
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    });

    return JSON.parse(response.body);
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
