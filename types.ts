export interface Domain {
  id: string;
  name: string;
  description: string;
  endpoint: string;
}

export interface ProcessingResult {
  summary: string;
  structured: any;
  artifacts: any;
}
