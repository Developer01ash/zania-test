import React, { useRef, useState } from 'react';
import './App.css';
import CardList from './components/cardlist/CardList';
import { saveDocuments } from './utils/storage';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scheduleSave = (updatedDocuments: any[]) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      setIsSaving(true);
      await saveDocuments(updatedDocuments);
      setLastSaved(new Date());
      setIsSaving(false);
    }, 5000);
  };

  const handleCardClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeOverlay = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeOverlay();
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <h1 className="dashboard">Documents Dashboard</h1>
      <h3 className="dashboard-sub">Drag and drop cards to reorder them</h3>
      {isSaving ? (
        <span className="spinner-container"></span>
      ) : (
        <>
          <div className="save-status-container">
            {lastSaved && (
              <div className="save-status">
                <span>Last saved:</span>
                <span className="last-saved-time">{lastSaved.toLocaleTimeString()}</span>
              </div>
            )}
          </div>
          <CardList onCardClick={handleCardClick} onSave={scheduleSave} />
        </>
      )}
      {selectedImage && (
        <div className="overlay" onClick={closeOverlay}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Selected" className="overlay-image" />
            <button className="close-button" onClick={closeOverlay}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
