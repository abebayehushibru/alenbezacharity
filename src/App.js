import "./App.css";

import { BrowserRouter as Router} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import { PopupProvider } from "./context/popUpContext";
import { AppContent } from "./AppContent";

function App() {
  return (
    <AuthProvider>
      <PopupProvider>
        <Router>
          <AppContent />
        </Router>
      </PopupProvider>
    </AuthProvider>
  );
}


export default App;
