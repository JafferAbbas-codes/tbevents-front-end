export interface Venue {
  id?: number;
  name?: string;
  desc?: string;

  country?: string;
  city?: string;
  area?: string;
  address?: string;
  lat?: number;
  long?: number;
  location?: any;

  min_cap?: number;
  max_cap?: number;
  min_rent?: number;
  max_rent?: number;

  coverImage?: string;
  hallImages?: Array<string>;
  imageOrigins?: Array<string>;

  website?: string;
  contact?: string;
  avg_rating?: number;
}

export interface User {
  firstName: string;
  LastName: string;
  email: string;
  password?: string;
  token?: string;
}
export interface Booking {
  id?: number;
  venue?: Venue;

  phoneNumber?: string;
  address?: string;
  creator?: User;

  budget?: number;

  capacity?: number;
  date?: Date;
}
