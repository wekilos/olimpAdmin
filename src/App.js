
import './App.css';
import SebedimContextProvider from './context/sebedim';

import Routes from "./routes/routes";
function App() {
  return (
    <div className="App bg-background">
      <SebedimContextProvider>
         <Routes/>
      </SebedimContextProvider>
     
    </div>
  );
}

export default App;
