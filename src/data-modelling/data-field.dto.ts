import { LayoutDto } from "./layout.dto";

export enum DataFieldType {
  TEXT_FIELD = "TextField",
}

export interface DataFieldDto {
  id: string;
  name: string;
  type: DataFieldType;
  options?: Record<string, unknown>;
  layout: LayoutDto;
}
