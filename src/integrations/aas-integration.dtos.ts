export enum AssetAdministrationShellType {
  Truck = "Truck",
  Semitrailer = "Semitrailer",
  Semitrailer_Truck = "Semitrailer_Truck",
}

export interface AasFieldAssignmentDto {
  dataFieldId: string;
  sectionId: string;
  idShortParent: string;
  idShort: string;
}

export interface AasConnectionDto {
  id: string;
  name: string;
  dataModelId: string;
  aasType: AssetAdministrationShellType;
  modelId: string | null;
  fieldAssignments: AasFieldAssignmentDto[];
}

export interface CreateAasConnectionDto {
  name: string;
  aasType: AssetAdministrationShellType;
  dataModelId: string;
  modelId: string | null;
  fieldAssignments: AasFieldAssignmentDto[];
}

export interface UpdateAasConnectionDto {
  name: string;
  modelId: string | null;
  fieldAssignments: AasFieldAssignmentDto[];
}
