import { UniqueProductIdentifiers } from "../unique-product-identifiers/unique-product-identifiers.dtos";

export interface ItemDto {
  id: string;
  uniqueProductIdentifiers: UniqueProductIdentifiers[];
}
