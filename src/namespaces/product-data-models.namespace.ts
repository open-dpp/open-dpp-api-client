import { AxiosInstance } from "axios";
import { ModelCreateDto } from "../model.create.dto";
import { ModelDto } from "../model.dto";
import {
  ProductDataModelDto,
  ProductDataModelGetAllDto,
} from "../product.data.model.dto";

export class ProductDataModelsNamespace {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  public async postModel(data: ModelCreateDto) {
    return this.axiosInstance.post<ModelDto>("/models", data);
  }

  public async createProductDataModel(data: ProductDataModelDto) {
    return this.axiosInstance.post<ProductDataModelDto>(
      "/product-data-models",
      data,
    );
  }

  public async getProductDataModels() {
    return this.axiosInstance.get<ProductDataModelGetAllDto[]>(
      "/product-data-models",
    );
  }

  public async getProductDataModelById(id: string) {
    return this.axiosInstance.get<ProductDataModelDto>(
      `/product-data-models/${id}`,
    );
  }
}
