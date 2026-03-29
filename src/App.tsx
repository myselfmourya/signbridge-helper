import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import SignRecognition from './pages/SignRecognition';

import TextToSign from './pages/TextToSign';
import TextToSpeech from './pages/TextToSpeech';
import LearningMode from './pages/LearningMode';
import Dictionary from './pages/Dictionary';

import MyProgress from './pages/MyProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="recognize" element={<SignRecognition />} />
        <Route path="text-to-sign" element={<TextToSign />} />
        <Route path="text-to-speech" element={<TextToSpeech />} />
        <Route path="learn" element={<LearningMode />} />
        <Route path="progress" element={<MyProgress />} />
        <Route path="dictionary" element={<Dictionary />} />
      </Route>
    </Routes>
  );
}

export default App;
