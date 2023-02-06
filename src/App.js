import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
// for components
import AdminProtectRoute from "./components/AdminProtectRoute";
import UserProtectRoute from "./components/UserProtectRoute";
import ErrorComponent from "./components/ErrorComponent";
import Spinner from "./components/Spinner";

// for pages
const Librarian = lazy(() => import("./pages/Librarian"));
const User = lazy(() => import("./pages/User"));
const About = lazy(() => import("./pages/About"));

// for librarian
const Inventory = lazy(() => import("./components/librarian/Inventory"));
const Issue = lazy(() => import("./components/librarian/Issue"));
const IssuedBooks = lazy(() => import("./components/librarian/IssuedBooks"));
const Requested = lazy(() => import("./components/librarian/Requested"));
const NewsLetter = lazy(() => import("./components/librarian/NewsLetter"));
const Subscribers = lazy(() => import("./components/librarian/Subscribers"));
const DueBooks = lazy(() => import("./components/librarian/DueBooks"));
const AddBook = lazy(() => import("./components/librarian/AddBook"));
const BlockedUsers = lazy(() => import("./components/librarian/BlockedUsers"));
const UserDetails = lazy(() => import("./components/librarian/UserDetails"));
const ActivityLogs = lazy(() => import("./components/librarian/ActivityLogs"));

// for user
const BookDetails = lazy(() => import("./components/user/BookDetails"));
const UserInventory = lazy(() => import("./components/user/UserInventory"));
const UserIssuedBooks = lazy(() => import("./components/user/UserIssuedBooks"));
const UserRequested = lazy(() => import("./components/user/UserRequested"));
const ForgotLink = lazy(() => import("./components/user/ForgotLink"));
const ForgotPass = lazy(() => import("./components/user/ForgotPass"));
const Contact = lazy(() => import("./components/user/Contact"));
const WishList = lazy(() => import("./components/user/WishList"));
const MyAccount = lazy(() => import("./components/user/MyAccount"));
const EditProfile = lazy(() => import("./components/user/EditProfile"));

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route element={<AdminProtectRoute />}>
              <Route path="/" element={<Librarian />}>
                <Route index path="issue" element={<Issue />} />
                <Route path="issued" element={<IssuedBooks />} />
                <Route path="requested" element={<Requested />} />
                <Route path="inventory" element={<Inventory />} />
                <Route path="user" element={<UserDetails />} />
                <Route path="addbook" element={<AddBook />} />
                <Route path="subscribers" element={<Subscribers />} />
                <Route path="news" element={<NewsLetter />} />
                <Route path="duebooks" element={<DueBooks />} />
                <Route path="logs" element={<ActivityLogs />} />
                <Route path="blocked" element={<BlockedUsers />} />
              </Route>
            </Route>
            <Route element={<UserProtectRoute />}>
              <Route path="/users" element={<User />}>
                <Route index path="userissued" element={<UserIssuedBooks />} />
                <Route path="userrequested" element={<UserRequested />} />
                <Route path="userinventory" element={<UserInventory />} />
                <Route path=":bookId" element={<BookDetails />} />
                <Route path="wishlist" element={<WishList />} />
              </Route>
              <Route path="/account" element={<MyAccount />} />
              <Route path="/edit-profile" element={<EditProfile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgotlink" element={<ForgotLink />} />
            <Route path="/forgotpass/:token" element={<ForgotPass />} />
            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
