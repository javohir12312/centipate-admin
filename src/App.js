import React from 'react';
import Description from './components/Description';
import Flag from './components/Flag';
import Hint from './components/Hint';

function App() {
  return (
    <div className="App">
      <h1>CTF Management</h1>
      <Description />
      <Flag />
      <Hint />
    </div>
  );
}

export default App;
