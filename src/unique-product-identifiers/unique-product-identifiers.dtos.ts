import { LayoutDto, SectionLayout } from "../data-modelling/layout.dto";
import { DataFieldType } from "../data-modelling/data-field.dto";

export interface RepeaterViewDto {
  name: string;
  rows: RowViewDto[];
}

export interface RowViewDto {
  layout: SectionLayout;
  children: (FieldViewDto | SectionViewDto)[];
}

export interface ViewDto {
  name: string;
  description: string;
  nodes: (RepeaterViewDto | SectionViewDto)[];
}

export interface SectionViewDto {
  name: string;
  layout: SectionLayout;
  children: FieldViewDto[];
}

export interface FieldViewDto {
  name: string;
  value: unknown;
  type: DataFieldType;
  layout: LayoutDto;
}

export interface UniqueProductIdentifiers {
  uuid: string;
  view: string;
  referenceId: string;
}
