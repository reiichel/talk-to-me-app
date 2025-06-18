import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  currentPage: number;
  onPageChange: (val: number) => void;
  onAddCustomer?: () => void;
}

export default function CustomerFilters({
  search,
  onSearchChange,
  onAddCustomer,
}: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
      <div className="flex items-center gap-2 w-full md:w-auto">
        <button
          className="flex items-center justify-center gap-2 bg-white text-[#031627] font-semibold px-4 py-2 rounded-xl w-full sm:w-auto"
          onClick={onAddCustomer}
        >
          <span>+</span> {t("customers.new")}
        </button>

        <div className="relative w-full md:w-72">
          <Search
            className="absolute right-3 top-2.5 text-gray-500"
            size={18}
          />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t("customers.searchPlaceholder")}
            className="w-full bg-surface text-white rounded-xl py-2 pr-10 pl-4 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
