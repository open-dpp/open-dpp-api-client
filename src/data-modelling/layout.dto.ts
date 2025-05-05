export interface ResponsiveConfigDto {
  xs?: number;
  sm: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface LayoutDto {
  cols?: ResponsiveConfigDto;
  colSpan: ResponsiveConfigDto;
  colStart: ResponsiveConfigDto;
  rowSpan: ResponsiveConfigDto;
  rowStart: ResponsiveConfigDto;
}
