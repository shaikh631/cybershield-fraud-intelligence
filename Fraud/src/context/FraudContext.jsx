import { createContext, useContext, useState } from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";
import { alerts as initialAlerts, cases, users } from "../data/mockData";

const FraudContext = createContext(null);

export function FraudProvider({ children }) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2300);
  };

  const updateAlert = (id, status) => {
    setAlerts((current) =>
      current.map((alert) => (alert.id === id ? { ...alert, status } : alert)),
    );
    notify(`Alert ${id} marked ${status.toLowerCase()}`);
  };

  const createCase = (alert) => {
    if (alert.caseId) return notify("Alert is already linked to a case");
    setAlerts((current) =>
      current.map((item) =>
        item.id === alert.id ? { ...item, caseId: "CS-10482" } : item,
      ),
    );
    notify("Alert linked to unified case CS-10482");
  };

  return (
    <FraudContext.Provider
      value={{ alerts, cases, users, updateAlert, createCase, notify }}
    >
      {children}
      {toast && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Check size={15} />
          {toast}
        </motion.div>
      )}
    </FraudContext.Provider>
  );
}

export function useFraud() {
  const context = useContext(FraudContext);
  if (!context) throw new Error("useFraud must be used inside FraudProvider");
  return context;
}
