import { useLanguage } from "../context/LanguageContext";

const statusStyles = {
  active: "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  inactive: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
  pending: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
};

function CustomerTable({ customers }) {
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
    <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 overflow-hidden overflow-x-auto">
      <table className="w-full text-sm min-w-[600px]">
        <thead>
          <tr className="border-b border-gray-100 dark:border-gray-800">
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("customers.name")}
            </th>
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("customers.email")}
            </th>
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("customers.company")}
            </th>
            <th className={`px-5 py-3 font-medium text-gray-500 dark:text-gray-400 ${isRTL ? "text-right" : "text-left"}`}>
              {t("customers.status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-50 dark:border-gray-800/50 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
            >
              <td className="px-5 py-3 text-gray-900 dark:text-white font-medium whitespace-nowrap">
                {c.name}
              </td>
              <td className="px-5 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {c.email}
              </td>
              <td className="px-5 py-3 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {c.company}
              </td>
              <td className="px-5 py-3">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyles[c.status]}`}>
                  {statusLabel[c.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;