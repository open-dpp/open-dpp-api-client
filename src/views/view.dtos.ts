export enum NodeType {
  GRID_CONTAINER = "GridContainer",
  GRID_ITEM = "GridItem",
  SECTION_GRID = "SectionGrid",
  DATA_FIELD_REF = "DataFieldRef",
}

export enum Breakpoints {
  xs = "xs",
  sm = "sm",
  md = "md",
  lg = "lg",
  xl = "xl",
}

export interface NodeCreateDto {
  type: NodeType;
}

export interface GridContainerCreateDto extends NodeCreateDto {
  cols: number;
}

export interface SectionGridContainerCreateDto extends GridContainerCreateDto {
  sectionId: string;
}

export interface SizeDto {
  colSpan: number;
  breakpoint: Breakpoints;
}

export interface DataFieldRefCreateDto extends NodeCreateDto {
  fieldId: string;
}

export interface GridItemCreateDto extends NodeCreateDto {
  sizes: SizeDto[];
  content?: NodeCreateDto;
}

export interface AddNodeDto {
  node: NodeCreateDto;
  parentId?: string;
}
export interface ViewCreateDto {
  name: string;
  dataModelId: string;
}

// --------------
export interface NodeDto {
  id: string;
}

export interface GritItemDto extends NodeDto {
  sizes: SizeDto;
  content: NodeDto;
}

export interface GridContainerDto extends NodeDto {
  readonly children: GritItemDto[];
}

export interface SectionGridDto extends GridContainerDto {
  readonly sectionId: string;
}

export interface DataFieldRefDto extends NodeDto {
  readonly fieldId: string;
}

export interface ViewDto {
  id: string;
  name: string;
  version: string;
  ownedByOrganizationId: string;
  createdByUserId: string;
  nodes: NodeDto[];
  dataModelId: string;
}
