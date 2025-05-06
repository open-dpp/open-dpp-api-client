export interface ResponsiveConfigDto {
  xs?: number;
  sm: number;
  md?: number;
  lg?: number;
  xl?: number;
}

export interface LayoutDto {
  colSpan: ResponsiveConfigDto;
  colStart: ResponsiveConfigDto;
  rowSpan: ResponsiveConfigDto;
  rowStart: ResponsiveConfigDto;
}

export interface SectionLayout extends LayoutDto {
  cols: ResponsiveConfigDto;
}

export function isSectionLayout(
  layout: LayoutDto | SectionLayout,
): layout is SectionLayout {
  return (layout as SectionLayout).cols !== undefined;
}
