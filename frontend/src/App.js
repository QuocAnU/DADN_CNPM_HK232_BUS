

import React from 'react'; 

import MapComponent, {Header, List} from './Components/MapComponent';

// import MapWithDirections from './Components/Test';
function App() {
  return (
    <div style = {{height: '1000px'}}>
        <Header></Header>
        <List></List>
        <MapComponent />
        
        {/* <MapComponent></MapComponent> */}
        
        {/* <MapWithRoute></MapWithRoute> */}
    </div>
      
  );
  
  
  
}

export default App;
