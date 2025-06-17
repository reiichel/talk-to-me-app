import { useTranslation } from 'react-i18next';
import { Plus, Search, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import useMediaQuery from '@/hooks/useMediaQuery';

interface Props {
  search: string;
  onSearchChange: (val: string) => void;
  onAddCustomer?: () => void;
  onBack?: () => void;
}

export default function CustomerHeader({ search, onSearchChange, onAddCustomer, onBack }: Props) {
  const { t } = useTranslation();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <header className="bg-gradient-to-l from-[#032540] to-[#031627] px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-b-xl">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          {isMobile && (
            <button onClick={onBack} className="text-white">
              <ChevronRight size={24} />
            </button>
          )}
          <img src="/logo.png" alt="logo" className="h-6" />
          <h1 className="text-white text-lg font-bold md:text-xl">
            {t('customers.title')}
          </h1>
        </div>

        {isMobile && !mobileSearchOpen && (
          <div className="flex items-center gap-2">
            <button
              onClick={onAddCustomer}
              className="flex items-center gap-1 bg-white text-[#031627] text-sm font-semibold px-3 py-1.5 rounded-xl"
            >
              <Plus size={16} /> {t('customers.new')}
            </button>
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="bg-[#0F2C3F] text-white p-2 rounded-xl"
            >
              <Search size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Desktop or mobile expanded */}
      {(!isMobile || mobileSearchOpen) && (
        <div className="flex w-full gap-2 md:w-auto">
          {!isMobile && (
            <button
              onClick={onAddCustomer}
              className="flex items-center gap-1 bg-white text-[#031627] font-semibold px-4 py-2 rounded-xl"
            >
              <Plus size={18} /> {t('customers.new')}
            </button>
          )}
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-2.5 text-gray-500" size={18} />
            <input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={t('customers.searchPlaceholder')}
              className="w-full bg-[#0F2C3F] text-white rounded-xl py-2 pr-10 pl-4 focus:outline-none"
            />
          </div>
        </div>
      )}
    </header>
  );
}
