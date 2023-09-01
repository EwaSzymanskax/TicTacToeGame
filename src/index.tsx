import React from "react";
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './Game'
  
const rootElement = document.getElementById("root");

  const root = rootElement? ReactDOM.createRoot(rootElement) : null;
  if(root) root.render(<Game />);

 