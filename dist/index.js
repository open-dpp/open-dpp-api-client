"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDppApiClient = void 0;
const axios_1 = __importDefault(require("axios"));
class OpenDppApiClient {
    constructor(options = {}) {
        this.initOptions = options;
        this.axiosInstance = axios_1.default.create({
            baseURL: this.initOptions.baseURL ?? "https://api.cloud.open-dpp.de",
            headers: {
                Authorization: this.initOptions.apiKey
                    ? `Bearer ${this.initOptions.apiKey}`
                    : "",
                ...this.initOptions.headers,
            },
            ...this.initOptions,
        });
    }
    setApiKey(apiKey) {
        this.createNewAxiosInstance(apiKey);
    }
    createNewAxiosInstance(apiKey) {
        let auth = "";
        if (apiKey) {
            auth = `Bearer ${apiKey}`;
        }
        else if (this.initOptions.apiKey) {
            auth = `Bearer ${this.initOptions.apiKey}`;
        }
        this.axiosInstance = axios_1.default.create({
            baseURL: this.initOptions.baseURL ?? "https://api.cloud.open-dpp.de",
            headers: {
                Authorization: auth,
                ...this.initOptions.headers,
            },
            ...this.initOptions,
        });
    }
    async getOrganizations() {
        return this.axiosInstance.get(`/organizations`);
    }
    async getOrganizationById(id) {
        return this.axiosInstance.get(`/organizations/${id}`);
    }
    async postOrganization(data) {
        return this.axiosInstance.post("/organizations", data);
    }
    async postModel(data) {
        return this.axiosInstance.post("/models", data);
    }
    async assignProductDataModelToModel(productDataModelId, modelId) {
        return this.axiosInstance.post(`/models/${modelId}/product-data-models/${productDataModelId}`);
    }
    async updateModelData(modelId, data) {
        return this.axiosInstance.patch(`/models/${modelId}/data-values`, data);
    }
    async createProductDataModel(data) {
        return this.axiosInstance.post("/product-data-models", data);
    }
    async getProductDataModels() {
        return this.axiosInstance.get("/product-data-models");
    }
    async getProductDataModelById(id) {
        return this.axiosInstance.get(`/product-data-models/${id}`);
    }
    async getModels() {
        return this.axiosInstance.get("/models");
    }
    async getModelById(id) {
        return this.axiosInstance.get(`/models/${id}`);
    }
}
exports.OpenDppApiClient = OpenDppApiClient;
