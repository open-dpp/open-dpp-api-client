export interface RowViewDto {
  fields: { type: string; value: unknown; name: string }[];
}

export interface SectionViewDto {
  name: string;
  rows: RowViewDto[];
}

export interface ViewDto {
  name: string;
  sections: SectionViewDto[];
}
