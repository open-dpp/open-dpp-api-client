export enum Sector {
  BATTERY = "Battery",
  TEXTILE = "Textile",
}

export interface PassportTemplateCreateDto {
  version: string;
  name: string;
  description: string;
  sectors: Sector[];
  website?: string | null;
  contactEmail: string;
  organizationName: string;
  templateData: Record<string, unknown>;
}

export interface PassportTemplateDto extends PassportTemplateCreateDto {
  id: string;
  ownedByOrganizationId: string;
  createdByUserId: string;
  isOfficial: boolean;
  createdAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface PassportTemplateGetAllDto
  extends Omit<PassportTemplateCreateDto, "templateData"> {}
