import "./App.css";

import { BrowserRouter as Router} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import { PopupProvider } from "./context/popUpContext";
import { AppContent } from "./AppContent";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <PopupProvider>
        <Router>
          <AppContent />
        </Router>
      </PopupProvider>
      </ToastProvider>
    </AuthProvider>
  );
}


export default App;
