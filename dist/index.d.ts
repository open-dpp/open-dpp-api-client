import { AxiosRequestConfig } from 'axios';
import { OrganizationDto } from "./OrganizationDto";
export interface ApiClientOptions extends AxiosRequestConfig {
    apiKey?: string;
}
export declare class OpenDppApiClient {
    private axiosInstance;
    constructor(options?: ApiClientOptions);
    getOrganizations(): Promise<OrganizationDto[]>;
    getOrganization(id: string): Promise<OrganizationDto>;
    postOrganization(data: any): Promise<OrganizationDto>;
}
