import { AxiosInstance } from "axios";
import { ViewDto } from "../../dpp/unique-product-identifiers/unique-product-identifiers.dtos";

export class PassportTemplatesNamespace {
  constructor(public readonly axiosInstance: AxiosInstance) {}

  public async getAll() {
    return this.axiosInstance.get<ViewDto>(`/templates/passports`);
  }
}
