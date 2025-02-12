import { DataFieldCreateDto, ProductDataModelCreateDto } from "./product.data.model.create.dto";
export interface DataFieldDto extends DataFieldCreateDto {
    id: string;
}
export interface SectionDto {
    id: string;
    dataFields: DataFieldDto[];
}
export interface ProductDataModelDto extends Omit<ProductDataModelCreateDto, "sections"> {
    id: string;
    sections: SectionDto[];
}
export interface ProductDataModelGetAllDto {
    id: string;
    name: string;
}
