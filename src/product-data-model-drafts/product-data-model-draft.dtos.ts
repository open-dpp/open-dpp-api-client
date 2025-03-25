import {
  DataFieldType,
  SectionType,
  VisibilityLevel,
} from "../product-data-models/product-data-model.dtos";

export interface DataFieldDraftDto {
  id: string;
  name: string;
  type: DataFieldType;
  options?: Record<string, unknown>;
}

export interface SectionDraftDto {
  id: string;
  name: string;
  type: SectionType;
  dataFields: DataFieldDraftDto[];
}

export interface PublicationDto {
  id: string;
  version: string;
}

export interface PublicationCreateDto {
  visibility: VisibilityLevel;
}

export interface ProductDataModelDraftDto {
  id: string;
  name: string;
  version: string;
  publications: PublicationDto[];
  sections: SectionDraftDto[];
  createdByUserId: string;
  ownedByOrganizationId: string;
}

export interface ProductDataModelDraftGetAllDto {
  id: string;
  name: string;
}

export interface DataFieldDraftCreateDto {
  type: DataFieldType;
  name: string;
  options?: Record<string, unknown>;
}

export interface SectionDraftCreateDto {
  name: string;
  type: SectionType;
}

export interface ProductDataModelDraftCreateDto {
  name: string;
}

export interface DataFieldDraftUpdateDto {
  name: string;
  options?: Record<string, unknown>;
}

export interface SectionDraftUpdateDto {
  name: string;
}

export interface ProductDataModelDraftUpdateDto {
  name: string;
}
