import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Card from '../card/Card';
import { loadDocuments } from '../../utils/storage';
import './CardList.css';

interface Document {
  type: string;
  title: string;
  position: number;
}

interface CardListProps {
  onCardClick: (image: string) => void;
  onSave: (document: Document[]) => void;
}

const CardList: React.FC<CardListProps> = ({ onCardClick, onSave }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const data = await loadDocuments();
      setDocuments(data);
    };
    fetchDocuments();
  }, []);

  const moveCard = (dragIndex: number, hoverIndex: number) => {
    const updatedDocuments = [...documents];
    const [draggedItem] = updatedDocuments.splice(dragIndex, 1);
    updatedDocuments.splice(hoverIndex, 0, draggedItem);

    setDocuments(updatedDocuments);
    onSave(updatedDocuments);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid">
        {documents?.map((doc, index) => (
          <Card
            key={doc.type}
            index={index}
            document={doc}
            moveCard={moveCard}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CardList;