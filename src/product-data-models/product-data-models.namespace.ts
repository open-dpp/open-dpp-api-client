import { AxiosInstance } from "axios";
import {
  ProductDataModelDto,
  ProductDataModelGetAllDto,
} from "./product-data-model.dtos";

export class ProductDataModelsNamespace {
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {}

  public async getAll() {
    return this.axiosInstance.get<ProductDataModelGetAllDto[]>(
      `/product-data-models?organization=${this.organizationId}`,
    );
  }

  public async getProductDataModelById(id: string) {
    return this.axiosInstance.get<ProductDataModelDto>(
      `/product-data-models/${id}`,
    );
  }
}
