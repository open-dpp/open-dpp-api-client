import { AxiosInstance } from "axios";

export class PassportTemplatesNamespace {
  constructor(
    public readonly axiosInstance: AxiosInstance,
    public readonly organizationId?: string,
  ) {}
}
