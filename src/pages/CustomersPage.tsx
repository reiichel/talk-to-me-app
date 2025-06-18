import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CustomerTable from "@/components/CustomerTable";
import CustomerHeader from "@/components/CustomerHeader";
import { getCustomers } from "@/services/customerService";
import type { Customer } from "@/models/customer";

export default function CustomersPage() {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // החלפת 1000 לגודל עמוד אמיתי
  const [sortField, setSortField] = useState<keyof Customer>("lastName");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const data = await getCustomers({
          page,
          limit,
          sort: sortField,
          order: sortDirection,
        });
        setCustomers(data);
      } catch (err) {
        console.error("שגיאה בטעינת לקוחות:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [page, limit, sortField, sortDirection]);

  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="h-full bg-[#001c2f] flex flex-col">
      <CustomerHeader
        search={search}
        onSearchChange={setSearch}
        onAddCustomer={() => console.log("Add customer")}
      />

      <div className="flex-grow overflow-hidden">
        <CustomerTable
          customers={customers}
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
