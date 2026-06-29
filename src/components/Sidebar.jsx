import { useLanguage } from "../context/LanguageContext";

const navItems = [
  { key: "dashboard", icon: "📊" },
  { key: "customers", icon: "👥" },
  { key: "deals", icon: "💼" },
  { key: "tasks", icon: "✅" },
  { key: "reports", icon: "📈" },
  { key: "settings", icon: "⚙️" },
];

function Sidebar({ active, onNavigate }) {
  const { t, isRTL } = useLanguage();

  return (
    <aside className="w-64 h-screen bg-white dark:bg-[#18181b] border-r border-gray-100 dark:border-gray-800 flex flex-col shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-gray-800">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {t("app.name")}
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isRTL ? "text-right" : "text-left"
              } ${
                isActive
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{t(`nav.${item.key}`)}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;