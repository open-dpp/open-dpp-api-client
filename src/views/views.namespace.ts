import { AxiosInstance } from "axios";
import { AddNodeDto, ViewCreateDto, ViewDto } from "./view.dtos";

export class ViewsNamespace {
  private readonly viewsEndpoint;

  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.viewsEndpoint = `/organizations/${this.organizationId}/views`;
  }

  public async create(data: ViewCreateDto) {
    return this.axiosInstance.post<ViewDto>(this.viewsEndpoint, data);
  }

  public async addNode(viewId: string, data: AddNodeDto) {
    return this.axiosInstance.post<ViewDto>(
      `${this.viewsEndpoint}/${viewId}/nodes`,
      data,
    );
  }

  public async getByDataModelId(dataModelId: string) {
    return this.axiosInstance.get<ViewDto>(
      `${this.viewsEndpoint}?dataModelId=${dataModelId}`,
    );
  }
}
