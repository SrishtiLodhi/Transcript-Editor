import React, { useState, useEffect, useRef } from 'react';

function TranscriptEditor({ initialTranscript }) {
  const [transcript, setTranscript] = useState(initialTranscript);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playbackRef = useRef(null);

  const playTranscript = () => {
    if (isPlaying) return;

    setIsPlaying(true);
    playbackRef.current = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 100);
    }, 100);
  };

  const stopTranscript = () => {
    setIsPlaying(false);
    clearInterval(playbackRef.current);
  };

  useEffect(() => {
    const maxTime = transcript[transcript.length - 1].start_time + transcript[transcript.length - 1].duration;
    if (currentTime >= maxTime) {
      stopTranscript();
      setCurrentTime(0);
    }
  }, [currentTime, transcript]);

  const handleWordClick = (index) => {
    const newWord = prompt('Edit the word:', transcript[index].word);
    if (newWord && newWord.trim() !== '') {
      const updatedTranscript = transcript.map((wordObj, i) =>
        i === index ? { ...wordObj, word: newWord } : wordObj
      );
      setTranscript(updatedTranscript);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${isPlaying ? 'bg-red-500' : 'bg-green-500'} text-white`}
          onClick={isPlaying ? stopTranscript : playTranscript}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
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
    </div>
  );
}

export default TranscriptEditor;
