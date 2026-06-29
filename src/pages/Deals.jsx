import { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import Modal from "../components/Modal";
import AddDealForm from "../components/AddDealForm";
import DealsTableFull from "../components/DealsTableFull";
import DealCards from "../components/DealCards";
import { initialDeals } from "../data/mockDeals";

function Deals() {
  const { t, isRTL } = useLanguage();
  const [deals, setDeals] = useState(initialDeals);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDeals = useMemo(() => {
    let result = deals.filter((d) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return d.client.toLowerCase().includes(q);
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "amount") return b.amount - a.amount;
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      return 0;
    });

    return result;
  }, [deals, search, sortBy]);

  const handleAddDeal = (formData) => {
    const newDeal = {
      id: Date.now(),
      ...formData,
    };
    setDeals((prev) => [newDeal, ...prev]);
    setIsModalOpen(false);
  };

  const inputClass = `px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("deals.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("deals.subtitle")}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-soft transition-colors whitespace-nowrap"
        >
          + {t("deals.addDeal")}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder={t("deals.searchPlaceholder")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          dir={isRTL ? "rtl" : "ltr"}
          className={`flex-1 min-w-[200px] ${inputClass} ${isRTL ? "text-right" : "text-left"}`}
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={inputClass}
        >
          <option value="date">{t("deals.sortDate")}</option>
          <option value="amount">{t("deals.sortAmount")}</option>
        </select>

        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-primary-600 text-white shadow-soft"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {t("deals.viewTable")}
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === "cards"
                ? "bg-primary-600 text-white shadow-soft"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {t("deals.viewCards")}
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <DealsTableFull deals={filteredDeals} />
      ) : (
        <DealCards deals={filteredDeals} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("deals.modalTitle")}
      >
        <AddDealForm
          onSubmit={handleAddDeal}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Deals;