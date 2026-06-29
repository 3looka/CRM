import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";

const presetColors = [
  "#4f46e5",
  "#0ea5e9",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#8b5cf6",
  "#14b8a6",
];

function Settings() {
  const { t, isRTL } = useLanguage();
  const {
    primaryColor,
    setPrimaryColor,
    companyName,
    setCompanyName,
    logoUrl,
    setLogoUrl,
    resetTheme,
    previewColor,
    cancelPreview,
  } = useTheme();

  const fileInputRef = useRef(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const inputClass = `w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 ${
    isRTL ? "text-right" : "text-left"
  }`;

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t("nav.settings")}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {isRTL ? "تخصيص الهوية البصرية لنظامك" : "Customize your system's visual identity"}
        </p>
      </div>

      <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isRTL ? "اسم الشركة" : "Company Name"}
          </label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            dir={isRTL ? "rtl" : "ltr"}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isRTL ? "شعار الشركة" : "Company Logo"}
          </label>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
              {logoUrl ? (
                <img src={logoUrl} alt="logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl">🏢</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-xl transition-colors"
            >
              {isRTL ? "رفع شعار" : "Upload Logo"}
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              className="hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {isRTL ? "اللون الرئيسي" : "Primary Color"}
          </label>

          <div className="flex items-center gap-3 mb-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="w-12 h-10 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer bg-transparent"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300 font-mono">
              {primaryColor}
            </span>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">
            {isRTL ? "مرّر الماوس لمعاينة اللون، واضغط لتثبيته" : "Hover to preview, click to apply"}
          </p>

          <div className="flex flex-wrap gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                onClick={() => setPrimaryColor(color)}
                onMouseEnter={() => previewColor(color)}
                onMouseLeave={cancelPreview}
                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                  primaryColor === color
                    ? "border-gray-900 dark:border-white"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <button
            onClick={resetTheme}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            {isRTL ? "إعادة الضبط الافتراضي" : "Reset to default"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;