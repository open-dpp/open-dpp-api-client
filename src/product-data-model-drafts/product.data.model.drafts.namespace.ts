import { AxiosInstance } from "axios";
import {
  DataFieldDraftCreateDto,
  DataFieldDraftUpdateDto,
  ProductDataModelDraftCreateDto,
  ProductDataModelDraftDto,
  ProductDataModelDraftGetAllDto,
  ProductDataModelDraftUpdateDto,
  PublicationCreateDto,
  SectionDraftCreateDto,
  SectionDraftUpdateDto,
} from "./product.data.model.draft.dtos";
import { ProductDataModelDto } from "../product-data-models/product.data.model.dtos";

export class ProductDataModelDraftsNamespace {
  private readonly draftsEndpoint;
  constructor(
    private readonly axiosInstance: AxiosInstance,
    private readonly organizationId?: string,
  ) {
    this.draftsEndpoint = `/organizations/${this.organizationId}/product-data-model-drafts`;
  }
  public async create(data: ProductDataModelDraftCreateDto) {
    return this.axiosInstance.post<ProductDataModelDraftDto>(
      this.draftsEndpoint,
      data,
    );
  }

  public async getAll() {
    return this.axiosInstance.get<ProductDataModelDraftGetAllDto[]>(
      this.draftsEndpoint,
    );
  }

  public async getById(draftId: string) {
    return this.axiosInstance.get<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}`,
    );
  }

  public async modify(draftId: string, data: ProductDataModelDraftUpdateDto) {
    return this.axiosInstance.patch<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}`,
      data,
    );
  }

  public async addSection(draftId: string, data: SectionDraftCreateDto) {
    return this.axiosInstance.post<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}/sections`,
      data,
    );
  }

  public async addDataField(
    draftId: string,
    sectionId: string,
    data: DataFieldDraftCreateDto,
  ) {
    return this.axiosInstance.post<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}/sections/${sectionId}/data-fields`,
      data,
    );
  }

  public async modifyDataField(
    draftId: string,
    sectionId: string,
    fieldId: string,
    data: DataFieldDraftUpdateDto,
  ) {
    return this.axiosInstance.patch<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}/sections/${sectionId}/data-fields/${fieldId}`,
      data,
    );
  }

  public async deleteDataField(
    draftId: string,
    sectionId: string,
    fieldId: string,
  ) {
    return this.axiosInstance.delete<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}/sections/${sectionId}/data-fields/${fieldId}`,
    );
  }

  public async deleteSection(draftId: string, sectionId: string) {
    return this.axiosInstance.delete<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}/sections/${sectionId}`,
    );
  }

  public async modifySection(
    draftId: string,
    sectionId: string,
    data: SectionDraftUpdateDto,
  ) {
    return this.axiosInstance.patch<ProductDataModelDraftDto>(
      `${this.draftsEndpoint}/${draftId}/sections/${sectionId}`,
      data,
    );
  }

  public async publish(draftId: string, data: PublicationCreateDto) {
    return this.axiosInstance.post<ProductDataModelDto>(
      `${this.draftsEndpoint}/${draftId}/publish`,
      data,
    );
  }
}
