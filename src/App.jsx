import { useState } from "react";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Deals from "./pages/Deals";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";

function AppContent() {
  const [dark, setDark] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    if (activePage === "dashboard") return <Dashboard />;
    if (activePage === "customers") return <Customers />;
    if (activePage === "deals") return <Deals />;
    if (activePage === "tasks") return <Tasks />;
    if (activePage === "settings") return <Settings />;
    return (
      <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-8">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          {activePage}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          هنبني هذه الصفحة في الخطوة الجاية.
        </p>
      </div>
    );
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="flex h-screen bg-[#fafafa] dark:bg-[#0f0f10]">
        <Sidebar active={activePage} onNavigate={setActivePage} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar dark={dark} setDark={setDark} />
          <main className="flex-1 overflow-y-auto p-6">
            {renderPage()}
          </main>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;