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
  children: (FieldViewDto | SectionViewDto)[];
}

export interface FieldViewDto {
  name: string;
  value: unknown;
  type: DataFieldType;
  layout: LayoutDto;
}

export interface UniqueProductIdentifiers {
  uuid: string;
  referenceId: string;
}

export function isRepeaterView(
  view: RepeaterViewDto | SectionViewDto,
): view is RepeaterViewDto {
  return (view as RepeaterViewDto).rows !== undefined;
}

export function isSectionView(
  view: RepeaterViewDto | SectionViewDto | FieldViewDto,
): view is SectionViewDto {
  return (view as SectionViewDto).children !== undefined;
}

export function isDataFieldView(
  field: FieldViewDto | SectionViewDto,
): field is FieldViewDto {
  return (field as FieldViewDto).value !== undefined;
}
