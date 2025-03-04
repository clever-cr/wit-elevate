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
import BlogDetails from "./pages/BlogDetails";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./components/layout/Dashboard";
import CreateBlog from "./pages/createBlog";
import ListBlogs from "./pages/ListBlogs";
import CreateEvent from "./pages/CreateEvent";
import ListEvents from "./pages/ListEvents";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import Assessment from "./pages/Assessment";
import GetStarted from "./pages/GetStarted";
import PortalLayout from "./components/layout/PortalLayout";
import Generate from "./pages/Generate";
import Courses from "./pages/Courses";
import Project from "./pages/project";
import Forum from "./pages/Forum";
import HomePage from "./pages/HomePage";
import ThreadDetailPage from "./pages/ThreadDetailPage";

const App = () => {
  return (
    <div className="bg-[#F8F9FB]">
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
            <Route path="blog/:id" element={<BlogDetails />} />
            <Route path="event/:id" element={<EventDetails />} />
            <Route path="events" element={<Events />} />
            <Route path="AboutUs" element={<AboutUs />} />
            <Route path="partner" element={<Partner />} />
          </Route>
          <Route path="logIn" element={<LogIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="blog/create" element={<CreateBlog />} />
            <Route path="blog/edit/:id" element={<CreateBlog />} />
            <Route path="blog/list" element={<ListBlogs />} />
            <Route path="event/create" element={<CreateEvent />} />
            <Route path="event/edit/:id" element={<CreateEvent />} />
            <Route path="event/list" element={<ListEvents />} />
          </Route>
          <Route path="portal" element={<PortalLayout />}>
            <Route path="assessment" element={<Assessment />} />
           {/* <Route path="generate" element={<Generate />} />  */}
           <Route path="courses" element={<Courses />} />
            <Route path="project" element={<Project />} />
            <Route path="profile" element={<Profile />} />
            <Route path="getStarted" element={<GetStarted />} /> 
            <Route path="forum" element={<ThreadDetailPage />} />
          </Route>
{/*          
          <Route path="/assessment" element={<Assessment />} />
          */}
           {/* <Route path="forum" element={<ThreadDetailPage />} /> */}
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
};
export default App;
