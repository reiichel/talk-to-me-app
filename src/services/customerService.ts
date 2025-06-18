import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { CUSTOMERS_URL } from "@/config/endpoints";
import type { Customer, CustomerRequest, CustomersResponse, SearchCustomerResponse } from "@/models/customer";

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export async function getCustomers(req: CustomerRequest): Promise<Customer[]> {
  const query = new URLSearchParams({
    page: req.page.toString(),
    limit: req.limit.toString(),
    sort: req.sort,
    order: req.order,
  });

  const res = await fetchWithAuth(`${CUSTOMERS_URL}?${query}`);
  const json: Customer[] = await res.json();
  return json;
}


export async function searchCustomers(searchTerm: string): Promise<SearchCustomerResponse["data"]> {
  const query = new URLSearchParams({ searchTerm });
  const res = await fetchWithAuth(`${BASE_URL}/api/edge-function/search_customers?${query}`);
  const json: SearchCustomerResponse = await res.json();

  return json.data;
}
