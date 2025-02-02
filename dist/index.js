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
        return this.axiosInstance.get(`/organizations`);
    }
    async getOrganizationById(id) {
        return this.axiosInstance.get(`/organizations/${id}`);
    }
    async postOrganization(data) {
        return this.axiosInstance.post('/organizations', data);
    }
    async postModel(data) {
        return this.axiosInstance.post('/models', data);
    }
    async getModelById(id) {
        return this.axiosInstance.get(`/models/${id}`);
    }
}
exports.OpenDppApiClient = OpenDppApiClient;
