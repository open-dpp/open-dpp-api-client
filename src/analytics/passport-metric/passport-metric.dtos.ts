export enum MeasurementType {
  PAGE_VIEWS = "PageViews",
}

export enum TimePeriod {
  YEAR = "year",
  MONTH = "month",
  WEEK = "week",
  DAY = "day",
}

export interface PassportMeasurementDto {
  datetime: string;
  sum: number;
}

export interface PassportMetricQueryDto {
  startDate: Date;
  endDate: Date;
  templateId: string;
  modelId?: string;
  measurementType: string;
  measurementKey: string;
  period: string;
}
