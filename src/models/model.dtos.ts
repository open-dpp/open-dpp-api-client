import { UniqueProductIdentifiers } from "../unique-product-identifiers/unique-product-identifiers.dtos";

export interface DataValuePatchDto {
  id: string;
  value: unknown;
}

export interface DataValueCreateDto extends Omit<DataValueDto, "id" | "row"> {
  row: number;
}

export interface DataValueDto {
  id: string;
  row?: number;
  value: unknown;
  dataSectionId: string;
  dataFieldId: string;
}

export interface ModelDto {
  id: string;
  name: string;
  description: string;
  uniqueProductIdentifiers: UniqueProductIdentifiers[];
  productDataModelId: string;
  dataValues: DataValueDto[];
  owner: string;
}

export interface ModelCreateDto {
  name: string;
}
