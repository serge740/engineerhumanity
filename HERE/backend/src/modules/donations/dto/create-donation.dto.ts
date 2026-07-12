export class CreateDonationDto {
  firstName: string;
  lastName: string;
  email?: string;
  country: string;
  street: string;
  city: string;
  adminDivision?: string;
  phone?: string;
  currency: string;
  amount: number;
  frequency: 'once' | 'monthly';
  programArea: string;
  displayPublicly?: boolean;
  dedicateTo?: string | null;
}
