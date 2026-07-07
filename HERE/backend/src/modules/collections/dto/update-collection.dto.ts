import { ComponentField } from 'src/common/component-field.interface';

export class UpdateCollectionDto {
  name?: string;
  fields?: ComponentField[];
}
