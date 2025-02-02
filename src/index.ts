import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import {OrganizationDto} from "./organization.dto";
import {ModelDto} from "./model.dto";
import {ModelCreateDto} from "./model.create.dto";
import {OrganizationCreateDto} from "./organization.create.dto";

export interface ApiClientOptions extends AxiosRequestConfig {
    apiKey?: string;
}

export class OpenDppApiClient {
    private axiosInstance: AxiosInstance;
    private readonly initOptions: ApiClientOptions;

    constructor(options: ApiClientOptions = {}) {
        this.initOptions = options;
        this.axiosInstance = axios.create({
            baseURL: this.initOptions.baseURL ?? 'https://api.cloud.open-dpp.de',
            headers: {
                'Authorization': this.initOptions.apiKey ? `Bearer ${this.initOptions.apiKey}` : '',
                ...this.initOptions.headers,
            },
            ...this.initOptions,
        });
    }

    public setApiKey(apiKey: string) {
        this.createNewAxiosInstance(apiKey);
    }

    private createNewAxiosInstance(apiKey?: string) {
        let auth = '';
        if (apiKey) {
            auth = `Bearer ${apiKey}`;
        } else if (this.initOptions.apiKey) {
            auth = `Bearer ${this.initOptions.apiKey}`;
        }
        this.axiosInstance = axios.create({
            baseURL: this.initOptions.baseURL ?? 'https://api.cloud.open-dpp.de',
            headers: {
                'Authorization': auth,
                ...this.initOptions.headers,
            },
            ...this.initOptions,
        });
    }

    public async getOrganizations() {
        return this.axiosInstance.get<OrganizationDto[]>(`/organizations`);
    }

    public async getOrganizationById(id: string) {
        return this.axiosInstance.get<OrganizationDto>(`/organizations/${id}`);
    }

    public async postOrganization(data: OrganizationCreateDto) {
        return this.axiosInstance.post<OrganizationDto>('/organizations', data);
    }

    public async postModel(data: ModelCreateDto) {
        return this.axiosInstance.post<ModelDto>('/models', data);
    }

    public async getModels() {
        return this.axiosInstance.get<ModelDto[]>('/models');
    }

    public async getModelById(id: string) {
        return this.axiosInstance.get<ModelDto>(`/models/${id}`);
    }
}