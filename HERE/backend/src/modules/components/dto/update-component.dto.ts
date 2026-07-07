import { ComponentField } from 'src/common/component-field.interface';

export class UpdateComponentDto {
  name?: string;
  tag?: string;
  html?: any;
  modalHtml?: any;
  type?: 'static' | 'dynamic';
  schema?: ComponentField[];
  collectionId?: string | null;
}
