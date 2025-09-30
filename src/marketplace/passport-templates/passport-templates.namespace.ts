import { AxiosInstance } from "axios";
import {
  PassportTemplateDto,
  PassportTemplateGetAllDto,
} from "./passport-templates.dtos";

export class PassportTemplatesNamespace {
  private readonly templatesEndpoint: string = "/templates/passports";
  constructor(public readonly axiosInstance: AxiosInstance) {}

  public async getAll() {
    return this.axiosInstance.get<PassportTemplateGetAllDto[]>(
      this.templatesEndpoint,
    );
  }

  public async getById(id: string) {
    return this.axiosInstance.get<PassportTemplateDto>(
      `${this.templatesEndpoint}/${id}`,
    );
  }
}
