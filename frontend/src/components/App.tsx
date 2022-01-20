import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import FileNotFound from './404';
import Home from "./Home";
import Layout from "./Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<FileNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
