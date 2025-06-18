import { useQuery } from "@tanstack/react-query";
import { searchCustomers } from "@/services/customerService";
import type { Customer } from "@/models/customer";
import { useDebounce } from "@/hooks/useDebounce";

export function useSearchCustomers(searchTerm: string) {
  const debouncedTerm = useDebounce(searchTerm, 400);

  const enabled = debouncedTerm.trim().length > 1;

  const query = useQuery<Customer[], Error>({
    queryKey: ["searchCustomers", debouncedTerm],
    queryFn: () => searchCustomers(debouncedTerm),
    enabled,
    staleTime: 60_000, // תוצאה נשמרת לדקה
    retry: 1,
    placeholderData: [],
  });

  return {
    customers: query.data ?? [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
