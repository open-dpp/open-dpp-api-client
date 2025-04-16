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

  public async addNode(data: AddNodeDto) {
    return this.axiosInstance.post<ViewDto>(this.viewsEndpoint, data);
  }
}
