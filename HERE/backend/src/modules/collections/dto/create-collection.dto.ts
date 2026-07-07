import { ComponentField } from 'src/common/component-field.interface';

export class CreateCollectionDto {
  name: string;
  slug?: string;
  fields?: ComponentField[];
}
