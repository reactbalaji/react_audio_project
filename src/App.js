import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import AudioUpload from './components/AudioUpload';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/AudioUpload" element={<AudioUpload />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
