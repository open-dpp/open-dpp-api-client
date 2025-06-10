import { UniqueProductIdentifiers } from "../unique-product-identifiers/unique-product-identifiers.dtos";
import { DataValueDto } from "../passport/data-value.dto";

export interface ItemDto {
  id: string;
  uniqueProductIdentifiers: UniqueProductIdentifiers[];
  productDataModelId?: string;
  dataValues: DataValueDto[];
}
