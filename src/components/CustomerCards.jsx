import { useLanguage } from "../context/LanguageContext";

const statusStyles = {
  active: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  pending: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
};

function CustomerCards({ customers }) {
  const { t, isRTL } = useLanguage();

  const statusLabel = {
    active: t("customers.statusActive"),
    inactive: t("customers.statusInactive"),
    pending: t("customers.statusPending"),
  };

  if (customers.length === 0) {
    return (
      <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
        {t("customers.noResults")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.map((c) => (
        <div
          key={c.id}
          className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-5"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 text-sm font-semibold">
              {c.name.charAt(0)}
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[c.status]}`}>
              {statusLabel[c.status]}
            </span>
          </div>

          <h3 className={`text-sm font-semibold text-gray-900 dark:text-white mb-1 ${isRTL ? "text-right" : "text-left"}`}>
            {c.name}
          </h3>
          <p className={`text-xs text-gray-500 dark:text-gray-400 mb-3 ${isRTL ? "text-right" : "text-left"}`}>
            {c.company}
          </p>

          <div className={`space-y-1 text-xs text-gray-600 dark:text-gray-300 ${isRTL ? "text-right" : "text-left"}`}>
            <div className="truncate">{c.email}</div>
            <div>{c.phone}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CustomerCards;