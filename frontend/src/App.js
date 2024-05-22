
import './App.css';
import React from 'react'; 

import MapComponent, {Header, List} from './Components/MapComponent';


function App() {
  return (
    <div style = {{height: '1000px'}}>
        <Header></Header>
        <List></List>
        <MapComponent />
    </div>
      
  );
  
  
  
}

export default App;
