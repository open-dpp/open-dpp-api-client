import { VisibilityLevel } from "../product-data-models/product-data-model.dtos";
import { SectionDto, SectionType } from "../data-modelling/section.dto";
import { DataFieldType } from "../data-modelling/data-field.dto";
import { LayoutDto, SectionLayout } from "../data-modelling/layout.dto";

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
  sections: SectionDto[];
  createdByUserId: string;
  ownedByOrganizationId: string;
}

export interface ProductDataModelDraftGetAllDto {
  id: string;
  name: string;
}

// Create dtos

export interface DataFieldDraftCreateDto {
  type: DataFieldType;
  name: string;
  options?: Record<string, unknown>;
  layout: LayoutDto;
}

export interface SectionDraftCreateDto {
  name: string;
  type: SectionType;
  parentSectionId?: string;
  layout: SectionLayout;
}

export interface ProductDataModelDraftCreateDto {
  name: string;
}

// Update dtos

export interface DataFieldDraftUpdateDto {
  name: string;
  options?: Record<string, unknown>;
  layout: LayoutDto;
}

export interface SectionDraftUpdateDto {
  name: string;
  layout: SectionLayout;
}

export interface ProductDataModelDraftUpdateDto {
  name: string;
}
