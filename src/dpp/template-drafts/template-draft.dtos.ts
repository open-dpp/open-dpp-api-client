import { SectionDto, SectionType } from "../data-modelling/section.dto";
import { DataFieldType } from "../data-modelling/data-field.dto";
import { LayoutDto, SectionLayout } from "../data-modelling/layout.dto";
import { GranularityLevel } from "../data-modelling/granularity-level";
import { Sector } from "../../marketplace/passport-templates/passport-templates.dtos";

export interface PublicationDto {
  id: string;
  version: string;
}

export enum VisibilityLevel {
  PRIVATE = "Private",
  PUBLIC = "Public",
}

export interface PublicationCreateDto {
  visibility: VisibilityLevel;
  sectors?: Sector[];
}

export interface TemplateDraftDto {
  id: string;
  name: string;
  version: string;
  publications: PublicationDto[];
  sections: SectionDto[];
  createdByUserId: string;
  ownedByOrganizationId: string;
}

export interface TemplateDraftGetAllDto {
  id: string;
  name: string;
}

// Create dtos

export interface DataFieldDraftCreateDto {
  type: DataFieldType;
  name: string;
  options?: Record<string, unknown>;
  layout: LayoutDto;
  granularityLevel: GranularityLevel;
}

export interface SectionDraftCreateDto {
  name: string;
  type: SectionType;
  parentSectionId?: string;
  layout: SectionLayout;
  granularityLevel?: GranularityLevel;
}

export interface TemplateDraftCreateDto {
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

export interface TemplateDraftUpdateDto {
  name: string;
}
