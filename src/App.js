import { RouterProvider } from 'react-router-dom'
import './App.css';
import { router } from './Routes/Routes/Routes';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div >
      <RouterProvider router={router}></RouterProvider>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
