import { SectionDto } from "../data-modelling/section.dto";
import { Sector } from "../../marketplace/passport-templates/passport-templates.dtos";

export interface TemplateGetAllDto {
  id: string;
  name: string;
  version: string;
  description: string;
  sectors: Sector[];
}

export interface TemplateDto {
  id: string;
  name: string;
  version: string;
  sections: SectionDto[];
  createdByUserId: string;
  ownedByOrganizationId: string;
}
