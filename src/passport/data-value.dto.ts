export interface DataValueDto {
  row?: number;
  value: unknown;
  dataSectionId: string;
  dataFieldId: string;
}

export interface DataValueCreateDto extends Omit<DataValueDto, "row"> {
  row: number;
}
