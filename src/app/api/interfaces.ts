export interface UsersResponse {
  id?: number;
  name: string;
  username: string;
  email: string;
  address?: Address | null;
  phone: string;
  website?: string | null;
  company?: Company | null;
}

export interface IAddeditUser {
  name: string | null | undefined;
  username: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
