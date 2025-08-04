import { SectionType } from "../data-modelling/section.dto";
import { GranularityLevel } from "../data-modelling/granularity-level";
import { DataFieldDto } from "../data-modelling/data-field.dto";

export interface DataSectionDto {
  id: string;
  name: string;
  type: SectionType;
  parentId?: string;
  subSections: string[];
  granularityLevel: GranularityLevel;
  dataFields: Omit<DataFieldDto, "layout">[];
  dataValues: Record<string, unknown>[];
}

export interface ProductPassportDto {
  id: string;
  name: string;
  description: string;
  dataSections: DataSectionDto[];
}
