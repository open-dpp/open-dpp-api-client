export interface DataFieldDto extends DataFieldCreateDto {
  id: string;
}

export enum SectionType {
  GROUP = "Group",
  REPEATABLE = "Repeatable",
}

export enum DataFieldType {
  TEXT_FIELD = "TextField",
}

export enum VisibilityLevel {
  PRIVATE = "Private",
  PUBLIC = "Public",
}

export interface SectionDto {
  id: string;
  name: string;
  type: SectionType;
  dataFields: DataFieldDto[];
}

export interface ProductDataModelDto
  extends Omit<ProductDataModelCreateDto, "sections"> {
  id: string;
  sections: SectionDto[];
  visibility: VisibilityLevel;
  createdByUserId?: string;
  ownedByOrganizationId?: string;
}

export interface ProductDataModelGetAllDto {
  id: string;
  name: string;
}

export interface DataFieldCreateDto {
  type: DataFieldType;
  name: string;
  options: Record<string, unknown>;
}

export interface SectionCreateDto {
  dataFields: DataFieldCreateDto[];
}

export interface ProductDataModelCreateDto {
  name: string;
  version: string;
  sections: SectionCreateDto[];
}
