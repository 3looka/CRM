import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

function AddTaskForm({ onSubmit, onCancel }) {
  const { t, isRTL } = useLanguage();
  const [form, setForm] = useState({
    title: "",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "medium",
    status: "todo",
  });

  const handleChange = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit(form);
  };

  const inputClass = `w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${isRTL ? "text-right" : "text-left"}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4" dir={isRTL ? "rtl" : "ltr"}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("tasks.taskTitle")}
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("tasks.dueDate")}
        </label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => handleChange("dueDate", e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t("tasks.priority")}
        </label>
        <select
          value={form.priority}
          onChange={(e) => handleChange("priority", e.target.value)}
          className={inputClass}
        >
          <option value="high">{t("tasks.priorityHigh")}</option>
          <option value="medium">{t("tasks.priorityMedium")}</option>
          <option value="low">{t("tasks.priorityLow")}</option>
        </select>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-soft transition-colors"
        >
          {t("tasks.save")}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          {t("tasks.cancel")}
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;