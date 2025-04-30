import { AxiosInstance } from "axios";
import { DppEventDto } from "./dpp-event.dtos";

export class OrganizationsNamespace {
  constructor(private readonly axiosInstance: AxiosInstance) {}

  public async getAll() {
    return this.axiosInstance.get<DppEventDto[]>(`/dpp-events`);
  }

  public async getById(id: string) {
    return this.axiosInstance.get<DppEventDto>(`/dpp-events/${id}`);
  }
}
