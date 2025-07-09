import { useEffect, useState } from "react";
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Customer } from "@/models/customer";

interface Props {
  customers: Customer[];
  sortField?: keyof Customer;
  sortDirection?: "asc" | "desc";
  onSort?: (field: keyof Customer) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

export default function CustomerTable({
  customers: incomingCustomers,
  sortField,
  sortDirection,
  onSort,
  currentPage,
  onPageChange,
  pageSize,
}: Props) {
  const { t } = useTranslation();

  const [visibleCustomers, setVisibleCustomers] = useState<Customer[]>(incomingCustomers);

  useEffect(() => {
    setVisibleCustomers(incomingCustomers);
  }, [incomingCustomers]);

  const headers: { key: keyof Customer; label: string }[] = [
    { key: "firstName", label: t("customers.firstName") },
    { key: "lastName", label: t("customers.lastName") },
    { key: "mobile", label: t("customers.mobile") },
    { key: "city", label: t("customers.city") },
    { key: "country", label: t("customers.country") },
    { key: "email", label: t("customers.email") },
  ];

  const getColumnWidth = (key: keyof Customer): string => {
    switch (key) {
      case "firstName":
      case "lastName":
        return "160px";
      case "mobile":
      case "email":
        return "200px";
      case "city":
      case "country":
        return "120px";
      default:
        return "150px";
    }
  };

  const getHeaderClasses = (key: keyof Customer) => {
    const isSorted = sortField === key;
    return `
      px-4 py-3 text-sm text-right cursor-pointer select-none whitespace-nowrap transition-all rounded-card font-normal
      ${isSorted
        ? "bg-accent text-white"
        : "bg-surface text-white/80 hover:text-white"}
    `;
  };

  const renderSortIcon = (key: keyof Customer) =>
    sortField === key &&
    (sortDirection === "asc" ? (
      <ArrowUpWideNarrow size={16} />
    ) : (
      <ArrowDownWideNarrow size={16} />
    ));

  return (
    <div dir="rtl" className="overflow-x-auto bg-primary px-4 mt-6">
      <div className="max-w-container mx-auto">
        <div
          className="rounded-md relative overflow-y-auto max-h-[calc(100vh-20px)] md:max-h-[calc(100vh-200px)]"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          <table className="w-full min-w-[900px] text-sm text-white border-separate border-spacing-y-2 border-spacing-x-2">
            <thead className="sticky top-0 bg-primary z-10">
              <tr>
                {headers.map(({ key, label }) => (
                  <th
                    key={key}
                    onClick={() => onSort?.(key)}
                    className={getHeaderClasses(key)}
                    style={{ width: getColumnWidth(key) }}
                  >
                    <div className="flex items-center justify-end gap-1">
                      {label}
                      {renderSortIcon(key)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-[#1D3B5A] hover:bg-[#072243] transition"
                >
                  <td style={{ width: getColumnWidth("firstName") }} className="px-4 py-3">
                    {c.firstName}
                  </td>
                  <td style={{ width: getColumnWidth("lastName") }} className="px-4 py-3">
                    {c.lastName}
                  </td>
                  <td style={{ width: getColumnWidth("mobile") }} className="px-4 py-3">
                    {c.mobile}
                  </td>
                  <td style={{ width: getColumnWidth("city") }} className="px-4 py-3">
                    {c.city}
                  </td>
                  <td style={{ width: getColumnWidth("country") }} className="px-4 py-3">
                    {c.country}
                  </td>
                  <td style={{ width: getColumnWidth("email") }} className="px-4 py-3">
                    {c.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* פאג'ינג */}
        {/* <div className="mt-4 flex justify-center gap-2 text-white text-sm">
          {currentPage > 1 && (
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 bg-surface rounded hover:bg-[#1d3b5a]"
            >
              הקודם
            </button>
          )}
          <span className="px-2">עמוד {currentPage}</span>
          {visibleCustomers.length === pageSize && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 bg-surface rounded hover:bg-[#1d3b5a]"
            >
              הבא
            </button>
          )}
        </div> */}
      </div>
    </div>
  );
}
