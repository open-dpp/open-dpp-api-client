export interface DataFieldDto extends DataFieldCreateDto {
  id: string;
}

export interface SectionDto {
  id: string;
  dataFields: DataFieldDto[];
}

export interface ProductDataModelDto
  extends Omit<ProductDataModelCreateDto, "sections"> {
  id: string;
  sections: SectionDto[];
}

export interface ProductDataModelGetAllDto {
  id: string;
  name: string;
}

export interface DataFieldCreateDto {
  type: string;
  name: string;
  options: unknown;
}

export interface SectionCreateDto {
  dataFields: DataFieldCreateDto[];
}

export interface ProductDataModelCreateDto {
  name: string;
  version: string;
  sections: SectionCreateDto[];
}
