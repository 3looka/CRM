import { useLanguage } from "../context/LanguageContext";

const statusStyles = {
  won: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  lost: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

function DealsTable({ deals }) {
  const { t, isRTL } = useLanguage();

  const statusLabel = {
    won: t("dashboard.statusWon"),
    pending: t("dashboard.statusPending"),
    lost: t("dashboard.statusLost"),
  };

  return (
    <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          {t("dashboard.recentDeals")}
        </h2>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <th
              className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("dashboard.client")}
            </th>
            <th
              className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("dashboard.amount")}
            </th>
            <th
              className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${
                isRTL ? "text-right" : "text-left"
              }`}
            >
              {t("dashboard.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr
              key={deal.id}
              className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <td className="px-5 py-3 text-gray-900 dark:text-white font-medium">
                {deal.client}
              </td>
              <td className="px-5 py-3 text-gray-600 dark:text-gray-300">
                {deal.amount}
              </td>
              <td className="px-5 py-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyles[deal.status]}`}
                >
                  {statusLabel[deal.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DealsTable;