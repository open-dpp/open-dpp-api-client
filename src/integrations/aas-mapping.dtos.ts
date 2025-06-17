export interface AasFieldMappingDto {
  dataFieldId: string;
  sectionId: string;
  idShortParent: string;
  idShort: string;
}

export interface AasMappingDto {
  id: string;
  dataModelId: string;
  fieldMappings: AasFieldMappingDto[];
}
