import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { OrganizationDto } from "./organization.dto";
import { ModelDto } from "./model.dto";
import { ModelCreateDto } from "./model.create.dto";
export interface ApiClientOptions extends AxiosRequestConfig {
    apiKey?: string;
}
export declare class OpenDppApiClient {
    private axiosInstance;
    constructor(options?: ApiClientOptions);
    getOrganizations(): Promise<AxiosResponse<OrganizationDto[], any>>;
    getOrganizationById(id: string): Promise<AxiosResponse<OrganizationDto, any>>;
    postOrganization(data: any): Promise<AxiosResponse<OrganizationDto, any>>;
    postModel(data: ModelCreateDto): Promise<AxiosResponse<ModelDto, any>>;
    getModelById(id: string): Promise<AxiosResponse<ModelDto, any>>;
}
