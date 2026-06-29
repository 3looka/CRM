import { createContext, useContext, useState, useEffect, useRef } from "react";

const ThemeContext = createContext(null);

const DEFAULT_PRIMARY = "#4f46e5";
const DEFAULT_COMPANY_NAME = "نظام CRM";

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function mix(hex, targetHex, weight) {
  const a = hexToRgb(hex);
  const b = hexToRgb(targetHex);
  const r = Math.round(a.r * (1 - weight) + b.r * weight);
  const g = Math.round(a.g * (1 - weight) + b.g * weight);
  const bch = Math.round(a.b * (1 - weight) + b.b * weight);
  return `rgb(${r}, ${g}, ${bch})`;
}

function applyPrimaryColor(hex) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary-50", mix(hex, "#ffffff", 0.92));
  root.style.setProperty("--color-primary-100", mix(hex, "#ffffff", 0.85));
  root.style.setProperty("--color-primary-200", mix(hex, "#ffffff", 0.7));
  root.style.setProperty("--color-primary-300", mix(hex, "#ffffff", 0.5));
  root.style.setProperty("--color-primary-400", mix(hex, "#ffffff", 0.25));
  root.style.setProperty("--color-primary-500", hex);
  root.style.setProperty("--color-primary-600", hex);
  root.style.setProperty("--color-primary-700", mix(hex, "#000000", 0.2));
  root.style.setProperty("--color-primary-800", mix(hex, "#000000", 0.35));
  root.style.setProperty("--color-primary-900", mix(hex, "#000000", 0.5));
}

export function ThemeProvider({ children }) {
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY);
  const [companyName, setCompanyName] = useState(DEFAULT_COMPANY_NAME);
  const [logoUrl, setLogoUrl] = useState(null);
  const previewTimeout = useRef(null);

  useEffect(() => {
    applyPrimaryColor(primaryColor);
  }, [primaryColor]);

  // تطبيق لون مؤقت للمعاينة (Hover) بدون تغيير القيمة المحفوظة فعليًا
  const previewColor = (hex) => {
    applyPrimaryColor(hex);
  };

  // إلغاء المعاينة والرجوع للون الفعلي المحفوظ
  const cancelPreview = () => {
    applyPrimaryColor(primaryColor);
  };

  const resetTheme = () => {
    setPrimaryColor(DEFAULT_PRIMARY);
    setCompanyName(DEFAULT_COMPANY_NAME);
    setLogoUrl(null);
  };

  return (
    <ThemeContext.Provider
      value={{
        primaryColor,
        setPrimaryColor,
        companyName,
        setCompanyName,
        logoUrl,
        setLogoUrl,
        resetTheme,
        previewColor,
        cancelPreview,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}