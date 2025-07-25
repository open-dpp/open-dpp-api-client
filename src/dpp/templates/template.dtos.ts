import { SectionDto } from "../data-modelling/section.dto";

export interface TemplateGetAllDto {
  id: string;
  name: string;
  version: string;
}

export interface TemplateDto {
  id: string;
  name: string;
  version: string;
  sections: SectionDto[];
  createdByUserId: string;
  ownedByOrganizationId: string;
}
