"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDppApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
class OpenDppApiClient {
    constructor(options = {}) {
        this.axiosInstance = axios_1.default.create({
            baseURL: options.baseURL ?? 'https://api.cloud.open-dpp.de',
            headers: {
                'Authorization': options.apiKey ? `Bearer ${options.apiKey}` : '',
                ...options.headers,
            },
            ...options,
        });
    }
    async getOrganizations() {
        try {
            const response = await this.axiosInstance.get(`/organizations`);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async getOrganization(id) {
        try {
            const response = await this.axiosInstance.get(`/organizations/${id}`);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async postOrganization(data) {
        try {
            const response = await this.axiosInstance.post('/organizations', data);
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.OpenDppApiClient = OpenDppApiClient;
