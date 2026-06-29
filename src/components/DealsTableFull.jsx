import { useLanguage } from "../context/LanguageContext";

const statusStyles = {
  won: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  pending: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  lost: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

function DealsTableFull({ deals }) {
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
    <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden overflow-x-auto">
      <table className="w-full text-sm min-w-[700px]">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("deals.client")}
            </th>
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("deals.stage")}
            </th>
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("deals.date")}
            </th>
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("deals.amount")}
            </th>
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("deals.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {deals.map((d) => (
            <tr
              key={d.id}
              className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <td className="px-5 py-3 text-gray-900 dark:text-white font-medium whitespace-nowrap">
                {d.client}
              </td>
              <td className="px-5 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {d.stage}
              </td>
              <td className="px-5 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {d.date}
              </td>
              <td className="px-5 py-3 text-gray-900 dark:text-white font-medium whitespace-nowrap">
                ${d.amount.toLocaleString()}
              </td>
              <td className="px-5 py-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[d.status]}`}>
                  {statusLabel[d.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DealsTableFull;