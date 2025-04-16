export interface RowViewDto {
  fields: { type: string; value: unknown; name: string }[];
}

export interface SectionViewDto {
  name: string;
  rows: RowViewDto[];
}

export interface QRCodeViewDto {
  name: string;
  sections: SectionViewDto[];
}

export interface UniqueProductIdentifiers {
  uuid: string;
  view: string;
  referenceId: string;
}
