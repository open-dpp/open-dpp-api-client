interface UniqueProductIdentifiers {
  uuid: string;
  view: string;
  referenceId: string;
}

export interface DataValuePatchDto {
  id: string;
  value: unknown;
}

export interface DataValueDto {
  id: string;
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
