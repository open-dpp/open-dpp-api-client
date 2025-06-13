import { PassportDto } from "../passport/data-value.dto";

export interface ModelDto extends PassportDto {
  name: string;
  description?: string;
  owner: string;
}

export interface ModelCreateDto {
  name: string;
}
