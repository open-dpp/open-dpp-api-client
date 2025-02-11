import { AxiosRequestConfig } from "axios";
import { OrganizationDto } from "./organization.dto";
import { ModelDto } from "./model.dto";
import { ModelCreateDto } from "./model.create.dto";
import { OrganizationCreateDto } from "./organization.create.dto";
export interface ApiClientOptions extends AxiosRequestConfig {
    apiKey?: string;
}
export declare class OpenDppApiClient {
    private axiosInstance;
    private readonly initOptions;
    constructor(options?: ApiClientOptions);
    setApiKey(apiKey: string): void;
    private createNewAxiosInstance;
    getOrganizations(): Promise<import("axios").AxiosResponse<OrganizationDto[], any>>;
    getOrganizationById(id: string): Promise<import("axios").AxiosResponse<OrganizationDto, any>>;
    postOrganization(data: OrganizationCreateDto): Promise<import("axios").AxiosResponse<OrganizationDto, any>>;
    postModel(data: ModelCreateDto): Promise<import("axios").AxiosResponse<ModelDto, any>>;
    assignProductDataModelToModel(productDataModelId: string, modelId: string): Promise<{}>;
    getModels(): Promise<import("axios").AxiosResponse<ModelDto[], any>>;
    getModelById(id: string): Promise<import("axios").AxiosResponse<ModelDto, any>>;
}
