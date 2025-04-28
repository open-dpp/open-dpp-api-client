export enum NodeType {
  SECTION_GRID = "SectionGrid",
  DATA_FIELD_REF = "DataFieldRef",
}

export interface ResponsiveConfigDto {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface NodeDto {
  id: string;
  type: NodeType;
  colSpan: ResponsiveConfigDto;
  colStart: ResponsiveConfigDto;
  rowSpan?: ResponsiveConfigDto;
  rowStart?: ResponsiveConfigDto;
  parentId?: string;
  children: string[];
}

export interface SectionGridDto extends NodeDto {
  cols: ResponsiveConfigDto;
  sectionId: string;
}

export interface DataFieldRefDto extends NodeDto {
  fieldId: string;
}
export enum TargetGroup {
  ALL = "All",
}

export interface ViewDto {
  id: string;
  targetGroup: TargetGroup;
  version: string;
  nodes: NodeDto[];
  dataModelId: string;
}

export function isSectionGrid(node: NodeDto): node is SectionGridDto {
  return node.type === NodeType.SECTION_GRID;
}

export function isDataFieldRef(node: NodeDto): node is DataFieldRefDto {
  return node.type === NodeType.DATA_FIELD_REF;
}

// Create DTOs --------------

export interface CreateNodeDto {
  colSpan: ResponsiveConfigDto;
  colStart: ResponsiveConfigDto;
  rowSpan?: ResponsiveConfigDto;
  rowStart?: ResponsiveConfigDto;
}

export interface CreateSectionGridDto extends CreateNodeDto {
  cols: ResponsiveConfigDto;
}

// Update DTOs--------------

export interface UpdateSectionGridDto extends CreateNodeDto {
  cols: ResponsiveConfigDto;
}
