import {
  DataFieldType,
  SectionType,
  VisibilityLevel,
} from "../product-data-models/product-data-model.dtos";
import {
  CreateNodeDto,
  CreateSectionGridDto,
  UpdateSectionGridDto,
  ViewDto,
} from "../views/view.dtos";

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
  parentId?: string;
  subSections: string[];
}

export interface PublicationDto {
  id: string;
  version: string;
}

export interface PublicationCreateDto {
  visibility: VisibilityLevel;
}

interface DataDto {
  id: string;
  name: string;
  version: string;
  publications: PublicationDto[];
  sections: SectionDraftDto[];
  createdByUserId: string;
  ownedByOrganizationId: string;
}

export interface ProductDataModelDraftDto {
  data: DataDto;
  view: ViewDto;
}

export interface ProductDataModelDraftGetAllDto {
  id: string;
  name: string;
}

export interface DataFieldDraftCreateDto {
  type: DataFieldType;
  name: string;
  options?: Record<string, unknown>;
  view: CreateNodeDto;
}

export interface SectionDraftCreateDto {
  name: string;
  type: SectionType;
  parentSectionId?: string;
  view: CreateSectionGridDto;
}

export interface ProductDataModelDraftCreateDto {
  name: string;
}

export interface DataFieldDraftUpdateDto {
  name: string;
  options?: Record<string, unknown>;
  view: CreateNodeDto;
}

export interface SectionDraftUpdateDto {
  name: string;
  view: UpdateSectionGridDto;
}

export interface ProductDataModelDraftUpdateDto {
  name: string;
}
