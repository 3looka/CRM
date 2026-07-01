import { useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import Modal from "../components/Modal";
import AddTaskForm from "../components/AddTaskForm";
import { initialTasks } from "../data/mockTasks";

const priorityStyles = {
  high: "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400",
  medium: "bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  low: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

function Tasks() {
  const { t, isRTL } = useLanguage();
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priorityLabel = {
    high: t("tasks.priorityHigh"),
    medium: t("tasks.priorityMedium"),
    low: t("tasks.priorityLow"),
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return tasks;
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, search]);

  const handleAdd = (formData) => {
    setTasks((prev) => [{ id: Date.now(), ...formData }, ...prev]);
    setIsModalOpen(false);
  };

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "done" ? "todo" : "done" }
          : t
      )
    );
  };

  const inputClass = `px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {t("tasks.title")}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {t("tasks.subtitle")}
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-soft transition-colors whitespace-nowrap"
        >
          + {t("tasks.addTask")}
        </button>
      </div>

      <input
        type="text"
        placeholder={t("tasks.searchPlaceholder")}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        dir={isRTL ? "rtl" : "ltr"}
        className={`w-full max-w-md ${inputClass} ${isRTL ? "text-right" : "text-left"}`}
      />

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-card border border-gray-100 dark:border-gray-800 p-10 text-center text-sm text-gray-500 dark:text-gray-400">
            {t("tasks.noTasks")}
          </div>
        ) : (
          filtered.map((task) => (
            <div
              key={task.id}
              className={`bg-white dark:bg-[#18181b] rounded-xl shadow-card border border-gray-100 dark:border-gray-800 px-5 py-4 flex items-center gap-4 transition-opacity ${
                task.status === "done" ? "opacity-60" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={task.status === "done"}
                onChange={() => toggleDone(task.id)}
                className="w-4 h-4 accent-primary-600 cursor-pointer shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium text-gray-900 dark:text-white truncate ${
                    task.status === "done" ? "line-through text-gray-400 dark:text-gray-500" : ""
                  } ${isRTL ? "text-right" : "text-left"}`}
                >
                  {task.title}
                </p>
                <p className={`text-xs text-gray-400 dark:text-gray-500 mt-0.5 ${isRTL ? "text-right" : "text-left"}`}>
                  {task.dueDate}
                </p>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shrink-0 ${priorityStyles[task.priority]}`}>
                {priorityLabel[task.priority]}
              </span>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("tasks.modalTitle")}
      >
        <AddTaskForm
          onSubmit={handleAdd}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default Tasks;