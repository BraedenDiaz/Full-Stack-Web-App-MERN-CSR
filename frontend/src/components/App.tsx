import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FileNotFound from "./errors/404";
import CreateNewForum from "./forums/CreateNewForum";
import EditForumPage from "./forums/EditForumPage";
import ForumListingsPage from "./forums/ForumListingsPage";
import ForumPage from "./forums/ForumPage";
import Home from "./Home";
import Layout from "./Layout";
import LoginRegisterContainer from "./loginRegister/index";
import UserAccountPage from "./profile";
/**
 * @author Braeden Diaz
 * 
 * Main application functional component which contains the top-level React Router route 
 * components and renders them along with their corresponding page component once they are
 * navigated to by the user.
 */



function App() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: ""
  });
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout isLoggingOut={isLoggingOut} setIsLoggingOut={setIsLoggingOut} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginRegisterContainer />} />
          <Route path="users/:username" element={<UserAccountPage isLoggingOut={isLoggingOut} />} />
          <Route path="forums" element={<ForumListingsPage isLoggingOut={isLoggingOut} alert={alert} setAlert={setAlert}/>} />
          <Route path="forums/create" element={<CreateNewForum isLoggingOut={isLoggingOut} alert={alert} setAlert={setAlert} />} />
          <Route path="forums/:forumID" element={<ForumPage isLoggingOut={isLoggingOut} />} />
          <Route path="forums/:forumID/edit" element={<EditForumPage isLoggingOut={isLoggingOut} />} />
          <Route path="*" element={<FileNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
