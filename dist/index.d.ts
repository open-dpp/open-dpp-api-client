import { AxiosRequestConfig } from "axios";
import { OrganizationDto } from "./organization.dto";
import { DataValuePatchDto, ModelDto } from "./model.dto";
import { ModelCreateDto } from "./model.create.dto";
import { OrganizationCreateDto } from "./organization.create.dto";
import { ProductDataModelDto, ProductDataModelGetAllDto } from "./product.data.model.dto";
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
    assignProductDataModelToModel(productDataModelId: string, modelId: string): Promise<import("axios").AxiosResponse<ModelDto, any>>;
    updateModelData(modelId: string, data: DataValuePatchDto[]): Promise<import("axios").AxiosResponse<ModelDto, any>>;
    createProductDataModel(data: ProductDataModelDto): Promise<import("axios").AxiosResponse<ProductDataModelDto, any>>;
    getProductDataModels(): Promise<import("axios").AxiosResponse<ProductDataModelGetAllDto, any>>;
    getProductDataModelById(id: string): Promise<import("axios").AxiosResponse<ProductDataModelDto, any>>;
    getModels(): Promise<import("axios").AxiosResponse<ModelDto[], any>>;
    getModelById(id: string): Promise<import("axios").AxiosResponse<ModelDto, any>>;
}
