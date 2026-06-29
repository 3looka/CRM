import { useLanguage } from "../context/LanguageContext";

function TopBar({ dark, setDark }) {
  const { t, lang, setLang, isRTL } = useLanguage();

  return (
    <header className="h-16 bg-white dark:bg-[#18181b] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-6 shrink-0">
      <div className="flex-1 max-w-md">
        <input
          type="text"
          placeholder={t("topbar.search")}
          dir={isRTL ? "rtl" : "ltr"}
          className={`w-full px-4 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 ${
            isRTL ? "text-right" : "text-left"
          }`}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 gap-1">
          <button
            onClick={() => setLang("ar")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              lang === "ar"
                ? "bg-primary-600 text-white shadow-soft"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            AR
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
              lang === "en"
                ? "bg-primary-600 text-white shadow-soft"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            EN
          </button>
        </div>

        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          title={dark ? "Light mode" : "Dark mode"}
        >
          {dark ? "☀️" : "🌙"}
        </button>

        <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-700 dark:text-primary-300 text-sm font-semibold cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}

export default TopBar;