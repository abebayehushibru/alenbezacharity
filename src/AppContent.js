import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PostDetail from "./pages/PostDetail";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AdminLayout from "./pages/Admins/Home";
import Payments from "./pages/Payments";
import DonateNow from "./pages/DonateNow";
import SignUpForm from "./components/forms/Signup";
import PopUpContainer from "./components/popup/PopUpContainer";
import About from "./pages/About";
import Members from "./pages/Admins/Members";
import AllAdmins from "./pages/Admins/AllAdmins";
import Dashbord from "./pages/Admins/Dashbord";
import NotFound from "./pages/NotFound";
import AllChildren from "./pages/Admins/Childrens";
import ContactUs from "./pages/Contact";
import { usePopup } from "./context/popUpContext";
import ChildDetailPage from "./pages/Admins/ChildDetailPage";
import MemberDetailPage from "./pages/Admins/MemberDetailPage";
import AllPosts from "./pages/Admins/Post";
import AdminPostDetail from "./pages/Admins/AdminPostDetail";
import AllDeletedMembers from "./pages/Admins/AllDeletedMember";
import Gifts from "./pages/Admins/Gifts";
import GiftDetail from "./pages/Admins/GiftDetail";
import { useAuth } from "./context/AuthContext"; // Import useAuth for authorization
import Transactions from "./pages/Admins/Transactions";

export const AppContent = () => {
  const location = useLocation();
 
  const { requireRole } = useAuth(); // Use requireRole for role-based authorization

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

            {/* Routes requiring specific roles */}
            <Route path="members/all" element={requireRole('superadmin', 'Finance-controller') ? <Members /> : <Navigate to="/not-authorized" />} />
            <Route path="members/view/:id" element={requireRole('superadmin', 'Finance-controller') ? <MemberDetailPage /> : <Navigate to="/not-authorized" />} />

            <Route path="members/admins" element={requireRole('superadmin') ? <AllAdmins /> : <Navigate to="/not-authorized" />} />
            <Route path="members/admins/:id" element={requireRole('superadmin') ? <MemberDetailPage /> : <Navigate to="/not-authorized" />} />

            <Route path="members/deleted" element={requireRole('superadmin') ? <AllDeletedMembers /> : <Navigate to="/not-authorized" />} />
            <Route path="members/deleted/:id" element={requireRole('superadmin') ? <MemberDetailPage /> : <Navigate to="/not-authorized" />} />
            <Route path="transactions" element={requireRole('superadmin', 'Finance-controller') ? <Transactions /> : <Navigate to="/not-authorized" />} />
          
            <Route path="donations/gifts" element={requireRole('superadmin', 'Finance-controller') ? <Gifts /> : <Navigate to="/not-authorized" />} />
            <Route path="donations/gifts/:id" element={requireRole('superadmin', 'Finance-controller') ? <GiftDetail /> : <Navigate to="/not-authorized" />} />

            <Route path="posts" element={requireRole('superadmin', 'Content-manager') ? <AllPosts /> : <Navigate to="/not-authorized" />} />
            <Route path="posts/:id" element={requireRole('superadmin', 'Content-manager') ? <AdminPostDetail /> : <Navigate to="/not-authorized" />} />

            <Route path="childrens" element={requireRole('superadmin', 'Finance-controller') ? <AllChildren /> : <Navigate to="/not-authorized" />} />
            <Route path="childrens/:id" element={requireRole('superadmin', 'Finance-controller') ? <ChildDetailPage /> : <Navigate to="/not-authorized" />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>

        <PopUpContainer />

        {!isAdminRoute && <Footer />}
      </div>
    </>
  );
};
