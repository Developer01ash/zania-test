import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './Card.css';

interface Document {
  type: string;
  title: string;
  position: number;
}

interface CardProps {
  index: number;
  document: Document;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  onCardClick: (image: string) => void;
}

const Card: React.FC<CardProps> = ({ index, document, moveCard, onCardClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'CARD',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  const thumbnails: Record<string, string> = {
    'bank-draft': '/images/image1.jpg',
    'bill-of-lading': '/images/image2.jpg',
    'invoice': '/images/image3.jpg',
    'bank-draft-2': '/images/image4.jpg',
    'bill-of-lading-2': '/images/image5.png',
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`card ${isDragging ? 'dragging' : ''}`}
      onClick={() => onCardClick(thumbnails[document.type])}
    >
      {isLoading && <div className="spinner"></div>}
      <img
        src={thumbnails[document.type]}
        alt={document.title}
        className="thumbnail"
        onLoad={() => setIsLoading(false)}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      <h3>{document.title}</h3>
    </div>
  );
};

export default Card;