export interface DataFieldCreateDto {
    type: string;
    name: string;
    options: unknown;
}
export interface SectionCreateDto {
    dataFields: DataFieldCreateDto[];
}
export interface ProductDataModelCreateDto {
    name: string;
    version: string;
    sections: SectionCreateDto[];
}
