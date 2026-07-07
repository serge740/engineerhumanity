import { ComponentField } from "../../../common/component-field.interface";
export declare class CreateComponentDto {
    name: string;
    tag: string;
    html?: any;
    modalHtml?: any;
    type?: 'static' | 'dynamic';
    schema?: ComponentField[];
    collectionId?: string | null;
}
