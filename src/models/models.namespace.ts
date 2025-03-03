import { AxiosInstance } from "axios";
import {
  DataValueCreateDto,
  DataValuePatchDto,
  ModelCreateDto,
  ModelDto,
} from "./model.dtos";

export class ModelsNamespace {
  private readonly modelsEndpoint: string;
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.modelsEndpoint = `/organizations/${this.organizationId}/models`;
  }

  public async postModel(data: ModelCreateDto) {
    return this.axiosInstance.post<ModelDto>(this.modelsEndpoint, data);
  }

  public async addModelData(modelId: string, data: DataValueCreateDto[]) {
    return this.axiosInstance.post<ModelDto>(
      `${this.modelsEndpoint}/${modelId}/data-values`,
      data,
    );
  }

  public async updateModelData(modelId: string, data: DataValuePatchDto[]) {
    return this.axiosInstance.patch<ModelDto>(
      `${this.modelsEndpoint}/${modelId}/data-values`,
      data,
    );
  }

  public async assignProductDataModelToModel(
    productDataModelId: string,
    modelId: string,
  ) {
    return this.axiosInstance.post<ModelDto>(
      `${this.modelsEndpoint}/${modelId}/product-data-models/${productDataModelId}`,
    );
  }

  public async getModels() {
    return this.axiosInstance.get<ModelDto[]>(this.modelsEndpoint);
  }

  public async getModelById(id: string) {
    return this.axiosInstance.get<ModelDto>(`${this.modelsEndpoint}/${id}`);
  }
}
