import { AxiosInstance } from "axios";
import {
  PassportTemplateCreateDto,
  PassportTemplateDto,
  PassportTemplateGetAllDto,
} from "./passport-templates.dtos";

export class PassportTemplatesNamespace {
  private readonly templatesEndpoint: string = "/templates/passports";
  constructor(
    public readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {}

  public async create(data: PassportTemplateCreateDto) {
    console.log(
      `/organizations/${this.organizationId}${this.templatesEndpoint}`,
    );
    return this.axiosInstance.post<PassportTemplateDto>(
      `/organizations/${this.organizationId}${this.templatesEndpoint}`,
      data,
    );
  }

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
