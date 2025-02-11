export declare const organizations: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    name: string;
}[];
export declare const model: {
    uniqueProductIdentifiers: {
        uuid: `${string}-${string}-${string}-${string}-${string}`;
        view: string;
        referenceId: `${string}-${string}-${string}-${string}-${string}`;
    }[];
    id: `${string}-${string}-${string}-${string}-${string}`;
    dataValues: never[];
    name: string;
    description: string;
    owner: `${string}-${string}-${string}-${string}-${string}`;
};
export declare const productDataModel: {
    id: `${string}-${string}-${string}-${string}-${string}`;
};
export declare const server: import("msw/node").SetupServerApi;
