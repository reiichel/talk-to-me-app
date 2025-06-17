/**
 * הערה: כרגע הנתונים נשלפים מקובץ דמה (Fake Data)
 * כדי לחזור לשליפה אמיתית מהשרת, בטל את השימוש ב־CUSTOMERS_MOCK
 * והפעל מחדש את useQuery עם getCustomers.
 */

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomerTable from "@/components/CustomerTable";
import CustomerHeader from "@/components/CustomerHeader";
import { mockCustomers } from "@/mock/mockCustomers";
import type { Customer } from "@/models/customer";

export default function CustomersPage() {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [sortField, setSortField] = useState<keyof Customer>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredData = useMemo(() => {
    const lowerSearch = search.toLowerCase();
    return mockCustomers.filter(
      (c) =>
        c.firstName.toLowerCase().includes(lowerSearch) ||
        c.lastName.toLowerCase().includes(lowerSearch)
    ).sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
  }, [search, sortField, sortDirection]);

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-[#031627] p-4">
      <div className="max-w-7xl mx-auto">
        <CustomerHeader
          search={search}
          onSearchChange={setSearch}
          onAddCustomer={() => console.log("Add customer")}
        />

        <CustomerTable
          customers={filteredData.slice((page - 1) * limit, page * limit)}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          currentPage={page}
          onPageChange={setPage}
          pageSize={limit}
        />
      </div>
    </div>
  );
}
