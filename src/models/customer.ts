export interface Customer {
  id: string;
  custId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  country: string;
  city: string;
  street: string;
  building: string;
  fullAddress: string;
  email: string;
  mobile: string;
  fixed: string;
  note: string;
  updatedAt: string | null;
  createdAt: string;
  resellerId: string;
  _uid: string;
}

export interface CustomerRequest {
  page: number;
  limit: number;
  sort: keyof Customer;
  order: "asc" | "desc";
}

export interface CustomersResponse {
  data: Customer[];
}

export interface SearchCustomerResponse {
  data: (Customer & {
    matchedFields: string[];
  })[];
}
