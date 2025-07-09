import { useQuery } from "@tanstack/react-query";
import { searchCustomers } from "@/services/customerService";
import type { Customer, SearchCustomerResponse } from "@/models/customer";
import { useDebounce } from "@/hooks/useDebounce";

type RawSearchResult = SearchCustomerResponse["data"];

interface ParsedResult {
  customers: Customer[];
  count: number;
}

export function useSearchCustomers(searchTerm: string) {
  const debouncedTerm = useDebounce(searchTerm, 400);

  const enabled = debouncedTerm.trim().length > 1;

  const query = useQuery<
    { result: (Customer & { matchedFields: string[] })[]; count: number }, // raw from queryFn
    Error,
    { customers: Customer[]; count: number } // selected + cleaned
  >({
    queryKey: ["searchCustomers", debouncedTerm],
    queryFn: () => searchCustomers(debouncedTerm),
    enabled,
    staleTime: 60_000,
    retry: 1,
    select: (data) => ({
      customers: Array.isArray(data.result) ? data.result : [],
      count: data.count ?? 0,
    }),
  });

  return {
    customers: query.data?.customers ?? [],
    count: query.data?.count ?? 0,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
  };
}
