import type { Customer } from "@/models/customer";
import { useTranslation } from "react-i18next";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";

interface Props {
  customers: Customer[];
  sortField?: keyof Customer;
  sortDirection?: 'asc' | 'desc';
  onSort?: (field: keyof Customer) => void;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
}

export default function CustomerTable({
  customers,
  sortField,
  sortDirection,
  onSort,
}: Props) {
  const { t } = useTranslation();

  const getHeaderClass = (field: keyof Customer) =>
    sortField === field
      ? "bg-[#0797FF] text-white rounded px-2 py-1"
      : "text-white px-2 py-1";

  const renderSortIcon = (field: keyof Customer) =>
    sortField === field ? (
      sortDirection === "asc" ? (
        <ArrowUpWideNarrow size={16} />
      ) : (
        <ArrowDownWideNarrow size={16} />
      )
    ) : null;

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-[600px] w-full text-xs sm:text-sm text-right text-white">
        <thead>
          <tr className="bg-[#0F2C3F]">
            <th
              className={getHeaderClass("firstName")}
              onClick={() => onSort?.("firstName")}
            >
              {t("customers.firstName")} {renderSortIcon("firstName")}
            </th>
            <th
              className={getHeaderClass("lastName")}
              onClick={() => onSort?.("lastName")}
            >
              {t("customers.lastName")} {renderSortIcon("lastName")}
            </th>
            <th
              className={getHeaderClass("mobile")}
              onClick={() => onSort?.("mobile")}
            >
              {t("customers.mobile")} {renderSortIcon("mobile")}
            </th>
            <th
              className={getHeaderClass("city")}
              onClick={() => onSort?.("city")}
            >
              {t("customers.city")} {renderSortIcon("city")}
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="border-b border-[#1D3B5A] hover:bg-[#072243]"
            >
              <td className="px-2 py-2">{c.firstName}</td>
              <td className="px-2 py-2">{c.lastName}</td>
              <td className="px-2 py-2">{c.mobile}</td>
              <td className="px-2 py-2">{c.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
