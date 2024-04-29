import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Viewer from "./Viewer";
import GooglePicker from "./GooglePicker";

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/remote" element={<GooglePicker />}></Route>
        <Route path="/viewer" element={<Viewer />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>);
