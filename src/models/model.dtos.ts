import { UniqueProductIdentifiers } from "../unique-product-identifiers/unique-product-identifiers.dtos";
import { DataValueDto } from "../passport/data-value.dto";

export interface ModelDto {
  id: string;
  name: string;
  description?: string;
  uniqueProductIdentifiers: UniqueProductIdentifiers[];
  productDataModelId: string;
  dataValues: DataValueDto[];
  owner: string;
}

export interface ModelCreateDto {
  name: string;
}
