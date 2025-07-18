import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Search, ChevronRight, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@/hooks/useMediaQuery";

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  onAddCustomer?: () => void;
  onFilterClick?: () => void;
}

export default function CustomerHeader({
  search,
  onSearchChange,
  onAddCustomer,
  onFilterClick,
}: Props) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const navigate = useNavigate();

  const closeSearch = () => setMobileSearchOpen(false);
  const back = () => navigate(-1);

  return (
    <header
      dir="rtl"
      className="relative w-full bg-header backdrop-blur-heavy pt-[20px] pb-[20px] px-header-px-mobile md:px-header-px"
    >
      <div className="max-w-container mx-auto flex flex-col gap-4">
        {!mobileSearchOpen && (
          <div className="flex items-center justify-between">
            {isMobile ? (
              <>
                <button onClick={back} className="text-white">
                  <ChevronRight size={24} />
                </button>

                <h1 className="text-white text-base font-bold text-right flex-1">
                  {t("customers.title")}
                </h1>

                <div className="flex gap-2">
                  <button
                    onClick={() => setMobileSearchOpen(true)}
                    className="bg-[#00000033] rounded-full w-10 h-10 flex items-center justify-center text-white"
                  >
                    <Search size={18} />
                  </button>
                  <button
                    onClick={onAddCustomer}
                    className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-[#031627]"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-4">
                  <div className="w-[50px] h-[50px] rounded-full bg-white/10" />
                  <h1 className="text-white text-[30px] font-bold">
                    {t("customers.title")}
                  </h1>
                </div>
                <img src="/logo.png" alt="logo" className="w-[47px] h-[45px]" />
              </div>
            )}
          </div>
        )}

        {mobileSearchOpen && isMobile && (
          <div className="flex items-center gap-2 w-full">
            <button onClick={closeSearch} className="text-white">
              <ChevronRight size={24} />
            </button>

            <div className="relative flex-1">
              <Search
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                size={16}
              />
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t("customers.searchPlaceholder")}
                className="w-full bg-[#00000033] text-white rounded-full py-2 pr-10 pl-8 placeholder:text-white text-sm"
                dir="rtl"
              />
              <X
                onClick={() => onSearchChange("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                size={16}
              />
            </div>

            <button
              onClick={onFilterClick}
              className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center"
            >
              <Filter size={20} fill="white" />
            </button>
          </div>
        )}

        {!isMobile && (
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full h-[48px] max-w-[80%]">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={t("customers.searchPlaceholder")}
                dir="rtl"
                className="w-full h-full bg-[#00000033] text-white text-right rounded-full pr-4 pl-10 placeholder-white text-sm"
              />
            </div>

            <div className="flex items-center gap-3 max-w-[20%]">
              <button
                onClick={onFilterClick}
                className="w-[50px] h-[50px] bg-white/10 text-white rounded-full flex items-center justify-center hover:brightness-110"
              >
                <Filter size={20} fill="white" />
              </button>
              <button
                onClick={onAddCustomer}
                className="flex flex-row-reverse items-center gap-2 bg-white text-[#031627] font-bold px-5 h-[50px] rounded-button text-[18px]"
              >
                <Plus size={18} />
                {t("customers.new")}
              </button>
            </div>
          </div>
        )}
      </div>
      {!isMobile && (
        <div
          className="absolute bottom-0 right-0 aspect-square pointer-events-none z-[-1]"
          style={{
            height: "60%",
            background: "linear-gradient(135deg, #193345 0%, #1c5e8c 100%)",
            filter: "blur(20px)",
          }}
        />
      )}
      {isMobile && (
        <div
          className="absolute bottom-0 right-0 aspect-square pointer-events-none z-[-1]"
          style={{
            height: "100%",
            background: "linear-gradient(135deg, #193345 0%, #1c5e8c 100%)",
            filter: "blur(20px)",
          }}
        />
      )}
    </header>
  );
}
