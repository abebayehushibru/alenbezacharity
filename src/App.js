import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PostDetail from "./pages/PostDetail";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./pages/Admins/Home";
import Payments from "./pages/Payments";
import DonateNow from "./pages/DonateNow";
import SignUpForm from "./components/forms/Signup";
import { AuthProvider } from "./context/AuthContext";
import PopUpContainer from "./components/popup/PopUpContainer";
import { PopupProvider } from "./context/popUpContext";
import About from "./pages/About";
import Members from "./pages/Admins/Members";
import AllAdmins from "./pages/Admins/AllAdmins";
import Dashbord from "./pages/Admins/Dashbord";
import NotFound from "./pages/NotFound";
import AllChildren from "./pages/Admins/Childrens";
import ContactUs from "./pages/Contact";

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

function AppContent() {
  const location = useLocation();

  // Define routes that don't need Navbar and Footer
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
    <div className="absolute top-0 max-w-[1360px] w-full mx-auto max-h-full overflow-y-scroll">
      {/* Conditionally render Navbar and Footer based on route */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        {/* Main application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/post-detail/:id" element={<PostDetail />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/donate-now" element={<DonateNow />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashbord />} />
          <Route path="members/all" element={<Members />} />
          <Route path="members/admins" element={<AllAdmins />} />
          <Route path="childrens" element={<AllChildren />} />
          childrens
          {/* Additional nested routes can go here */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <PopUpContainer />
      {!isAdminRoute && <Footer />}

      {/* PopUpContainer can be placed here or just below Navbar */}
          
    </div>
  
    </>
  );
}

export default App;
