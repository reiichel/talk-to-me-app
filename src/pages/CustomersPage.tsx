import { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomerTable from "@/components/CustomerTable";
import CustomerHeader from "@/components/CustomerHeader";
import { useCustomers } from "@/hooks/useCustomers";
import { useSearchCustomers } from "@/hooks/useSearchCustomers";
import type { Customer } from "@/models/customer";

export default function CustomersPage() {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [sortField, setSortField] = useState<keyof Customer>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const isSearching = search.trim().length > 1;

  const {
    customers: regularCustomers,
    isLoading: isListLoading,
    isFetching: isListFetching,
    isError: isListError,
    error: listError,
  } = useCustomers({
    page,
    limit,
    sort: sortField,
    order: sortDirection,
  });

  const {
    customers: searchedCustomers,
    isLoading: isSearchLoading,
    isFetching: isSearchFetching,
    isError: isSearchError,
    error: searchError,
  } = useSearchCustomers(search);

  const customers = isSearching ? searchedCustomers : regularCustomers;
  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const isFetching = isSearching ? isSearchFetching : isListFetching;
  const isError = isSearching ? isSearchError : isListError;
  const error = isSearching ? searchError : listError;

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="h-full bg-primary flex flex-col">
      <CustomerHeader
        search={search}
        onSearchChange={setSearch}
        onAddCustomer={() => console.log("Add customer")}
      />

      <div className="flex-grow overflow-hidden relative">
        {(
          <>
            <div className="relative min-h-[400px]">
              <CustomerTable
                customers={customers}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
                currentPage={page}
                onPageChange={setPage}
                pageSize={limit}
              />
              {isFetching && (
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center text-white text-sm z-10 pointer-events-none">
                  {t("customers.loading")}
                </div>
              )}
              {isError && (
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center text-white text-sm z-10 pointer-events-none">
                  {t("customers.error")}
                </div>
              )}
              {customers.length === 0 && !isFetching && (
                <div className="absolute inset-0 bg-black/5 flex items-center justify-center text-white text-sm z-10 pointer-events-none">
                  {t("customers.noResults")}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
