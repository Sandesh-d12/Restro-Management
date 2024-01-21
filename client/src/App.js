import AllRoute from "./route";
import "./App.css";
import { Toaster, ToastBar } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <AllRoute />
      <Toaster>
  {(t) => (
    <ToastBar
      toast={t}
      style={{
        ...t.style,
        animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
      }}
    />
  )}
</Toaster>
    </div>
  );
}

export default App;
