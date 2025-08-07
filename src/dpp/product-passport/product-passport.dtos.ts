import { SectionDto } from "../data-modelling/section.dto";

export interface DataSectionDto extends SectionDto {
  dataValues: Record<string, unknown>[];
}

export interface ProductPassportDto {
  id: string;
  name: string;
  description: string;
  dataSections: DataSectionDto[];
}
