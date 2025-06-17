import { LayoutDto } from "./layout.dto";
import { GranularityLevel } from "./granularity-level";

export enum DataFieldType {
  TEXT_FIELD = "TextField",
  PRODUCT_PASSPORT_LINK = "ProductPassportLink",
  NUMERIC_FIELD = "NumericField",
}

export interface DataFieldDto {
  id: string;
  name: string;
  type: DataFieldType;
  options?: Record<string, unknown>;
  layout: LayoutDto;
  granularityLevel: GranularityLevel;
}
