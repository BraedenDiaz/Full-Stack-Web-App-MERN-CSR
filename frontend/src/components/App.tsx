import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import FileNotFound from "./errors/404";
import CreateNewForum from "./forums/CreateNewForum";
import ForumsPage from "./forums/ForumsPage";
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
  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: ""
  });
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginRegisterContainer />} />
          <Route path="users/:username" element={<UserAccountPage />} />
          <Route path="forums" element={<ForumsPage alert={alert} setAlert={setAlert}/>} />
          <Route path="forums/create" element={<CreateNewForum alert={alert} setAlert={setAlert} />} />
          <Route path="*" element={<FileNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
