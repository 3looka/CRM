import { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import Modal from "../components/Modal";
import AddCustomerForm from "../components/AddCustomerForm";
import CustomerTable from "../components/CustomerTable";
import CustomerCards from "../components/CustomerCards";
import { initialCustomers } from "../data/mockCustomers";

function Customers() {
  const { t, isRTL } = useLanguage();
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCustomers = useMemo(() => {
    let result = customers.filter((c) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
      );
    });

    result = [...result].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "company") return a.company.localeCompare(b.company);
      return 0;
    });

    return result;
  }, [customers, search, sortBy]);

  const handleAddCustomer = (formData) => {
    const newCustomer = {
      id: Date.now(),
      ...formData,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setIsModalOpen(false);
  };

  const inputClass = `px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("customers.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("customers.subtitle")}
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-soft transition-colors whitespace-nowrap"
        >
          + {t("customers.addCustomer")}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder={t("customers.searchPlaceholder")}
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
          <option value="name">{t("customers.sortName")}</option>
          <option value="company">{t("customers.sortCompany")}</option>
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
            {t("customers.viewTable")}
          </button>
          <button
            onClick={() => setViewMode("cards")}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              viewMode === "cards"
                ? "bg-primary-600 text-white shadow-soft"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            {t("customers.viewCards")}
          </button>
        </div>
      </div>

      {viewMode === "table" ? (
        <CustomerTable customers={filteredCustomers} />
      ) : (
        <CustomerCards customers={filteredCustomers} />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("customers.modalTitle")}
      >
        <AddCustomerForm
          onSubmit={handleAddCustomer}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Customers;