import { AxiosInstance } from "axios";
import { DataValuePatchDto, ModelCreateDto, ModelDto } from "./model.dtos";

export class ModelsNamespace {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  public async postModel(data: ModelCreateDto) {
    return this.axiosInstance.post<ModelDto>("/models", data);
  }

  public async updateModelData(modelId: string, data: DataValuePatchDto[]) {
    return this.axiosInstance.patch<ModelDto>(
      `/models/${modelId}/data-values`,
      data,
    );
  }

  public async assignProductDataModelToModel(
    productDataModelId: string,
    modelId: string,
  ) {
    return this.axiosInstance.post<ModelDto>(
      `/models/${modelId}/product-data-models/${productDataModelId}`,
    );
  }

  public async getModels() {
    return this.axiosInstance.get<ModelDto[]>("/models");
  }

  public async getModelById(id: string) {
    return this.axiosInstance.get<ModelDto>(`/models/${id}`);
  }
}
