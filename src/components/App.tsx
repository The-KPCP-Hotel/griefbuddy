import React = require('react');
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';


function App() {
  return (
    <Routes>
      <Route path="/"   element={<HomePage />}/>
      <Route path="/"/>
    </Routes>


  );

}

export default App;
