import { AxiosInstance } from "axios";
import { QRCodeViewDto } from "./unique-product-identifiers.dtos";

export class UniqueProductIdentifiersNamespace {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  public async getView(uuid: string) {
    return this.axiosInstance.get<QRCodeViewDto>(
      `/unique-product-identifiers/${uuid}/view`,
    );
  }
}
