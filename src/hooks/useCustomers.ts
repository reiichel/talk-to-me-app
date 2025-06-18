import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "@/services/customerService";
import type { Customer, CustomerRequest } from "@/models/customer";
import {
  CUSTOMERS_QUERY_STALE_TIME,
  CUSTOMERS_QUERY_GC_TIME,
} from "@/config/constants";

interface UseCustomersProps {
  page: number;
  limit: number;
  sort: keyof Customer;
  order: "asc" | "desc";
}

export function useCustomers({ page, limit, sort, order }: UseCustomersProps) {
  const query = useQuery<Customer[], Error>({
    queryKey: ["customers", page, limit, sort, order],
    queryFn: async () => {
      const params: CustomerRequest = { page, limit, sort, order };
      return await getCustomers(params);
    },
    staleTime: CUSTOMERS_QUERY_STALE_TIME,
    gcTime: CUSTOMERS_QUERY_GC_TIME,
    retry: 1,
    placeholderData: [],
  });

  return {
    customers: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
