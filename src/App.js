import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorComponent from "./components/ErrorComponent";
import Inventory from "./components/librarian/Inventory";
import Issue from "./components/librarian/Issue";
import IssuedBooks from "./components/librarian/IssuedBooks";
import Requested from "./components/librarian/Requested";
import UserInventory from "./components/user/UserInventory";
import Librarian from "./pages/Librarian";
import Login from "./pages/Login";
import Register from "./pages/Register";
import User from "./pages/User";
import UserIssuedBooks from "./components/user/UserIssuedBooks";
import UserRequested from "./components/user/UserRequested";
import UserDetails from "./components/librarian/UserDetails";
import AddBook from "./components/librarian/AddBook";
import AdminProtectRoute from "./components/AdminProtectRoute";
import UserProtectRoute from "./components/UserProtectRoute";
import BookDetails from "./components/user/BookDetails";
import NewsLetter from "./components/librarian/NewsLetter";
import Unsubscribe from "./components/user/Unsubscribe";
import Subscribers from "./components/librarian/Subscribers";
import ForgotLink from "./components/user/ForgotLink";
import ForgotPass from "./components/user/ForgotPass";
import WishList from "./components/user/WishList";
import DueBooks from "./components/librarian/DueBooks";
import Contact from "./components/user/Contact";
import ActivityLogs from "./components/librarian/ActivityLogs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Router basename="/">
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
            </Route>
          </Route>
          <Route element={<UserProtectRoute />}>
            <Route path="/users" element={<User />}>
              <Route index path="userissued" element={<UserIssuedBooks />} />
              <Route path="userrequested" element={<UserRequested />} />
              <Route path="userinventory" element={<UserInventory />} />
              <Route path=":bookId" element={<BookDetails />} />
              <Route path="unsubscribe" element={<Unsubscribe />} />
              <Route path="wishlist" element={<WishList />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgotlink" element={<ForgotLink />} />
          <Route path="/forgotpass/:token" element={<ForgotPass />} />
          <Route path="*" element={<ErrorComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
