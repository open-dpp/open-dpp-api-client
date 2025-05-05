import { LayoutDto } from "./layout.dto";
import { DataFieldDto } from "./data-field.dto";

export enum SectionType {
  GROUP = "Group",
  REPEATABLE = "Repeatable",
}

export interface SectionDto {
  id: string;
  name: string;
  type: SectionType;
  parentId?: string;
  subSections: string[];
  layout: LayoutDto;
  dataFields: DataFieldDto[];
}
