// ✅ CustomerTable.tsx – RTL פיקסל פרפקט
import { ArrowDownWideNarrow, ArrowUpWideNarrow, Info, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Customer } from "@/models/customer";

interface Props {
  customers: Customer[];
  sortField?: keyof Customer;
  sortDirection?: "asc" | "desc";
  onSort?: (field: keyof Customer) => void;
}

export default function CustomerTable({
  customers,
  sortField,
  sortDirection,
  onSort,
}: Props) {
  const { t } = useTranslation();

  const headers: { key: keyof Customer; label: string }[] = [
    { key: "firstName", label: t("customers.firstName") },
    { key: "lastName", label: t("customers.lastName") },
    { key: "mobile", label: t("customers.mobile") },
    { key: "city", label: t("customers.city") },
    { key: "country", label: t("customers.country") },
    { key: "email", label: t("customers.email") },
  ];

  const getHeaderClasses = (key: keyof Customer) =>
    `px-4 py-3 text-sm text-right cursor-pointer select-none transition-all whitespace-nowrap ${
      sortField === key
        ? "bg-[#0797FF] text-white rounded-full font-semibold"
        : "text-white hover:text-blue-300"
    }`;

  const renderSortIcon = (key: keyof Customer) =>
    sortField === key &&
    (sortDirection === "asc" ? (
      <ArrowUpWideNarrow size={16} className="inline ml-1" />
    ) : (
      <ArrowDownWideNarrow size={16} className="inline ml-1" />
    ));

  return (
    <div dir="rtl" className="overflow-x-auto w-full shadow-inner bg-[#0F2C3F]">
      <table className="w-full text-sm text-right text-white min-w-[900px]">
        <thead>
          <tr>
            {headers.map(({ key, label }) => (
              <th
                key={key}
                onClick={() => onSort?.(key)}
                className={getHeaderClasses(key)}
              >
                <div className="flex items-center justify-center gap-1">
                  {label}
                  {renderSortIcon(key)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="border-t border-[#1D3B5A] hover:bg-[#072243] transition"
            >
              <td className="px-4 py-3">{c.firstName}</td>
              <td className="px-4 py-3">{c.lastName}</td>
              <td className="px-4 py-3">{c.mobile}</td>
              <td className="px-4 py-3">{c.city}</td>
              <td className="px-4 py-3">{c.country}</td>
              <td className="px-4 py-3">{c.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
