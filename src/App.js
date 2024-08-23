import React from 'react';
import TranscriptEditor from '../src/components/TranscriptEditor';
import "./App.css";

const initialTranscript = [
  { word: 'Hello', start_time: 0, duration: 500 },
  { word: 'world!', start_time: 500, duration: 700 },
  { word: 'This', start_time: 1200, duration: 300 },
  { word: 'is', start_time: 1500, duration: 200 },
  { word: 'a', start_time: 1700, duration: 100 },
  { word: 'test', start_time: 1800, duration: 400 },
  { word: 'transcript', start_time: 2200, duration: 600 },
  { word: 'for', start_time: 2800, duration: 200 },
  { word: 'playback', start_time: 3000, duration: 500 },
  { word: 'and', start_time: 3500, duration: 250 },
  { word: 'editing', start_time: 3750, duration: 800 },
  { word: 'features.', start_time: 4550, duration: 650 },
];

function App() {
  return (
    <div className="App bg-black h-screen text-white">
      <h1 className="text-2xl font-bold mb-4 pt-4 text-center">Transcript Editor</h1>
      <TranscriptEditor initialTranscript={initialTranscript} />
    </div>
  );
}

export default App;
