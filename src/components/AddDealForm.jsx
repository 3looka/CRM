import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function AddDealForm({ onSubmit, onCancel }) {
  const { t, isRTL } = useLanguage();
  const [form, setForm] = useState({
    client: "",
    amount: "",
    stage: "",
    status: "pending",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.client.trim() || !form.amount) return;
    onSubmit({ ...form, amount: Number(form.amount) });
  };

  const inputClass = `w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
    isRTL ? "text-right" : "text-left"
  }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("deals.client")}
        </label>
        <input
          type="text"
          required
          value={form.client}
          onChange={(e) => handleChange("client", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("deals.amount")}
        </label>
        <input
          type="number"
          required
          min="0"
          value={form.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("deals.stage")}
        </label>
        <input
          type="text"
          value={form.stage}
          onChange={(e) => handleChange("stage", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("deals.date")}
        </label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => handleChange("date", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("deals.status")}
        </label>
        <select
          value={form.status}
          onChange={(e) => handleChange("status", e.target.value)}
          className={inputClass}
        >
          <option value="won">{t("deals.statusWon")}</option>
          <option value="pending">{t("deals.statusPending")}</option>
          <option value="lost">{t("deals.statusLost")}</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-soft transition-colors"
        >
          {t("deals.save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          {t("deals.cancel")}
        </button>
      </div>
    </form>
  );
}

export default AddDealForm;