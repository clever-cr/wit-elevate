import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs/Blogs";
import Events from "./pages/Events";
import LogIn from "./pages/LogIn";
import AboutUs from "./pages/AboutUs";
import Partner from "./pages/Partner";
import BlogLayout from "./components/layout/BlogLayout";
import Motivation from "./pages/Blogs/Motivation";
import Experience from "./pages/Blogs/Experience";
import Opportunity from "./pages/Blogs/Opportunity";
import Testimony from "./pages/Blogs/Testimony";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<BlogLayout />}>
              <Route index element={<Blogs />} />
              <Route path="motivation" element={<Motivation />} />
              <Route path="experience" element={<Experience />} />
              <Route path="opportunity" element={<Opportunity />} />
              <Route path="testimony" element={<Testimony />} />
            </Route>
            <Route path="events" element={<Events />} />

            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="partner" element={<Partner />} />
          </Route>
          <Route path="logIn" element={<LogIn />} />
          <Route path="signUp" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
