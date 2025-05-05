import { SectionDto } from "../data-modelling/section.dto";

export enum VisibilityLevel {
  PRIVATE = "Private",
  PUBLIC = "Public",
}

export interface ProductDataModelGetAllDto {
  id: string;
  name: string;
  version: string;
}

export interface ProductDataModelDto {
  id: string;
  name: string;
  version: string;
  sections: SectionDto[];
  visibility: VisibilityLevel;
  createdByUserId: string;
  ownedByOrganizationId: string;
}
