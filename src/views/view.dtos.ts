export enum NodeType {
  GRID_CONTAINER = "GridContainer",
  GRID_ITEM = "GridItem",
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

export interface NodeCreateDto {
  type: NodeType;
}

export interface GridContainerCreateDto extends NodeCreateDto {
  cols: ResponsiveConfigDto;
  initNumberOfChildren?: number;
}

export interface SectionGridContainerCreateDto extends GridContainerCreateDto {
  sectionId: string;
}

export interface DataFieldRefCreateDto extends NodeCreateDto {
  fieldId: string;
}

export interface GridItemCreateDto extends NodeCreateDto {
  colSpan: ResponsiveConfigDto;
  colStart?: ResponsiveConfigDto;
  rowSpan?: ResponsiveConfigDto;
  rowStart?: ResponsiveConfigDto;
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

export interface GridContainerUpdateDto {
  cols: ResponsiveConfigDto;
}

export interface GridItemUpdateDto {
  colSpan: ResponsiveConfigDto;
  colStart?: ResponsiveConfigDto;
  rowSpan?: ResponsiveConfigDto;
  rowStart?: ResponsiveConfigDto;
}

// --------------
export interface NodeDto {
  id: string;
  type: NodeType;
}

export interface GridItemDto extends NodeDto {
  colSpan: ResponsiveConfigDto;
  colStart?: ResponsiveConfigDto;
  rowSpan?: ResponsiveConfigDto;
  rowStart?: ResponsiveConfigDto;
  content?: NodeDto;
}

export interface GridContainerDto extends NodeDto {
  readonly children: GridItemDto[];
  readonly cols: ResponsiveConfigDto;
}

export interface SectionGridDto extends GridContainerDto {
  readonly sectionId: string;
}

export interface DataFieldRefDto extends NodeDto {
  readonly fieldId: string;
}

export function isGridContainerOrSubclass(
  node: NodeDto,
): node is GridContainerDto {
  return (
    node.type === NodeType.GRID_CONTAINER || node.type === NodeType.SECTION_GRID
  );
}

export function isSectionGrid(node: NodeDto): node is SectionGridDto {
  return node.type === NodeType.SECTION_GRID;
}

export function isGridItem(node: NodeDto): node is GridItemDto {
  return node.type === NodeType.GRID_ITEM;
}

export function isDataFieldRef(node: NodeDto): node is DataFieldRefDto {
  return node.type === NodeType.DATA_FIELD_REF;
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
