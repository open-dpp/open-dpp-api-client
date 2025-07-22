import { AxiosInstance } from "axios";
import { TemplateDto, TemplateGetAllDto } from "./template.dtos";

export class TemplatesNamespace {
  private readonly templatesEndpoint;

  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.templatesEndpoint = `/organizations/${this.organizationId}/templates`;
  }

  public async getAll() {
    return this.axiosInstance.get<TemplateGetAllDto[]>(this.templatesEndpoint);
  }

  public async getById(id: string) {
    return this.axiosInstance.get<TemplateDto>(
      `${this.templatesEndpoint}/${id}`,
    );
  }
}
