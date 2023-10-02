import React from 'react';
import './App.css';

import RouteSetup from './routes/RouteSetup';
import Containers from './component/Container';
import Navbar from './component/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <Containers>
      <RouteSetup/>
      </Containers>
    </>
  );
 }

export default App;
