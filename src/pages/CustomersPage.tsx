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
    isError: isListError,
  } = useCustomers({
    page,
    limit,
    sort: sortField,
    order: sortDirection,
  });

  const {
    customers: searchedCustomers,
    isLoading: isSearchLoading,
    isError: isSearchError,
  } = useSearchCustomers(search);

  const customers = isSearching ? searchedCustomers : regularCustomers;
  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const isError = isSearching ? isSearchError : isListError;

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

      <div className="flex-grow overflow-hidden">
        {isError ? (
          <p className="text-red-500 p-4">{t("customers.error")}</p>
        ) : isLoading ? (
          <p className="text-white p-4">{t("customers.loading")}</p>
        ) : (
          <CustomerTable
            customers={customers}
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            currentPage={page}
            onPageChange={setPage}
            pageSize={limit}
          />
        )}
      </div>
    </div>
  );
}
