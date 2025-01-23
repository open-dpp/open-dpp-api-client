import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { OrganizationDto } from "./OrganizationDto";

export interface ApiClientOptions extends AxiosRequestConfig {
    apiKey?: string;
}

export class OpenDppApiClient {
    private axiosInstance: AxiosInstance;

    constructor(options: ApiClientOptions = {}) {
        this.axiosInstance = axios.create({
            baseURL: options.baseURL ?? 'https://api.cloud.open-dpp.de',
            headers: {
                'Authorization': options.apiKey ? `Bearer ${options.apiKey}` : '',
                ...options.headers,
            },
            ...options,
        });
    }

    public async getOrganizations(): Promise<OrganizationDto[]> {
        try {
            const response: AxiosResponse = await this.axiosInstance.get(`/organizations`);
            return response.data as OrganizationDto[];
        } catch (error) {
            throw error;
        }
    }

    public async getOrganization(id: string): Promise<OrganizationDto> {
        try {
            const response: AxiosResponse = await this.axiosInstance.get(`/organizations/${id}`);
            return response.data as OrganizationDto;
        } catch (error) {
            throw error;
        }
    }

    public async postOrganization(data: any): Promise<OrganizationDto> {
        try {
            const response: AxiosResponse = await this.axiosInstance.post('/organizations', data);
            return response.data as OrganizationDto;
        } catch (error) {
            throw error;
        }
    }
}