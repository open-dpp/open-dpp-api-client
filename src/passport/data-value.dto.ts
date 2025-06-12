import { UniqueProductIdentifiers } from "../unique-product-identifiers/unique-product-identifiers.dtos";

export interface DataValueDto {
  row: number;
  value: unknown;
  dataSectionId: string;
  dataFieldId: string;
}

export interface PassportDto {
  id: string;
  uniqueProductIdentifiers: UniqueProductIdentifiers[];
  productDataModelId?: string;
  dataValues: DataValueDto[];
}
