import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

function TranscriptEditor({ initialTranscript }) {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState(null);
  const [newWord, setNewWord] = useState('');
  const playbackRef = useRef(null);

  const maxTime = useMemo(() => {
    return transcript.length > 0 ? 
      transcript[transcript.length - 1].start_time + transcript[transcript.length - 1].duration 
      : 0;
  }, [transcript]);

  useEffect(() => {
    if (!isPlaying) return;

    playbackRef.current = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 100);
    }, 100);

    return () => clearInterval(playbackRef.current);
  }, [isPlaying]);

  useEffect(() => {
    if (currentTime >= maxTime) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [currentTime, maxTime]);

  const playTranscript = useCallback(() => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const stopTranscript = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
  }, []);

  const handleWordClick = useCallback((index) => {
    setSelectedWordIndex(index);
    setNewWord(transcript[index].word);
    setIsModalOpen(true);
  }, [transcript]);

  const handleSave = useCallback(() => {
    if (newWord.trim() !== '') {
      const updatedTranscript = transcript.map((wordObj, i) =>
        i === selectedWordIndex ? { ...wordObj, word: newWord } : wordObj
      );
      setTranscript(updatedTranscript);
    }
    setIsModalOpen(false);
    setNewWord(''); // Reset newWord after saving
  }, [newWord, selectedWordIndex, transcript]);

  return (
    <div className='text-white text-center border p-4 m-4'>
      <div className="transcript text-xl">
        {transcript.map((wordObj, index) => (
          <span
            key={index}
            className={`mr-2 cursor-pointer ${
              currentTime >= wordObj.start_time && currentTime < wordObj.start_time + wordObj.duration
                ? 'bg-yellow-300'
                : ''
            }`}
            onClick={() => handleWordClick(index)}
          >
            {wordObj.word}
          </span>
        ))}
      </div>
      <div className="mt-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white`}
          onClick={isPlaying ? stopTranscript : playTranscript}
          aria-label={isPlaying ? 'Stop Playback' : 'Play Transcript'}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>

      {/* Conditionally Render Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="rounded-lg p-6 z-10" style={{ background: '#34495E' }}>
            <h2 className="text-xl font-semibold mb-4">Edit Word</h2>
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="border p-2 rounded w-full text-black"
              aria-label="Edit word input"
            />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => {
                  setIsModalOpen(false);
                  setNewWord(''); // Reset newWord on cancel
                }}
                aria-label="Cancel editing"
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleSave}
                aria-label="Save edited word"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TranscriptEditor;
