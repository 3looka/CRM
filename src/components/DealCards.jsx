import { useLanguage } from "../context/LanguageContext";

const statusStyles = {
  won: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  lost: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

function DealCards({ deals }) {
  const { t, isRTL } = useLanguage();

  const statusLabel = {
    won: t("deals.statusWon"),
    pending: t("deals.statusPending"),
    lost: t("deals.statusLost"),
  };

  if (deals.length === 0) {
    return (
      <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
        {t("deals.noResults")}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {deals.map((d) => (
        <div
          key={d.id}
          className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-5"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500">
              {d.date}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[d.status]}`}>
              {statusLabel[d.status]}
            </span>
          </div>

          <h3 className={`text-sm font-semibold text-gray-900 dark:text-white mb-1 ${isRTL ? "text-right" : "text-left"}`}>
            {d.client}
          </h3>
          <p className={`text-xs text-gray-500 dark:text-gray-400 mb-3 ${isRTL ? "text-right" : "text-left"}`}>
            {d.stage}
          </p>

          <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
            ${d.amount.toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DealCards;