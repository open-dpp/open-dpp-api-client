import { AxiosInstance } from "axios";
import { ItemDto } from "./item.dtos";
import { DataValueDto } from "../passport/data-value.dto";
import { ModelDto } from "../models/model.dtos";

export class ItemsNamespace {
  private readonly modelsEndpoint: string;
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.modelsEndpoint = `/organizations/${this.organizationId}/models`;
  }

  public async createItem(modelId: string) {
    return this.axiosInstance.post<ItemDto>(
      `${this.modelsEndpoint}/${modelId}/items`,
    );
  }

  public async getItems(modelId: string) {
    return this.axiosInstance.get<ItemDto[]>(
      `${this.modelsEndpoint}/${modelId}/items`,
    );
  }

  public async getItem(modelId: string, itemId: string) {
    return this.axiosInstance.get<ItemDto>(
      `${this.modelsEndpoint}/${modelId}/items/${itemId}`,
    );
  }
  public async addItemData(
    modelId: string,
    itemId: string,
    data: DataValueDto[],
  ) {
    return this.axiosInstance.post<ModelDto>(
      `${this.modelsEndpoint}/${modelId}/items/${itemId}/data-values`,
      data,
    );
  }

  public async updateItemData(
    modelId: string,
    itemId: string,
    data: DataValueDto[],
  ) {
    return this.axiosInstance.patch<ModelDto>(
      `${this.modelsEndpoint}/${modelId}/items/${itemId}/data-values`,
      data,
    );
  }
}
