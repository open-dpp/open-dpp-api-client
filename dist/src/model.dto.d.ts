interface UniqueProductIdentifiers {
    uuid: string;
    view: string;
    referenceId: string;
}
interface DataValue {
    id: string;
    value: unknown;
    dataSectionId: string;
    dataFieldId: string;
}
export interface ModelDto {
    id: string;
    name: string;
    description: string;
    uniqueProductIdentifiers: UniqueProductIdentifiers[];
    productDataModelId: string;
    dataValues: DataValue[];
    owner: string;
}
export {};
