import { useLanguage } from "../context/LanguageContext";
import StatCard from "../components/StatCard";
import DealsTable from "../components/DealsTable";
import { stats, recentDeals } from "../data/mockData";

function Dashboard() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("dashboard.title")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t("dashboard.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.key}
            icon={stat.icon}
            label={t(`dashboard.stats.${stat.key}`)}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
          />
        ))}
      </div>

      <DealsTable deals={recentDeals} />
    </div>
  );
}

export default Dashboard;