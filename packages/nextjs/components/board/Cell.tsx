import { useState, useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { useRouter } from 'next/router';

export const Cell = ({ id, content, type, index }) => {
  const router = useRouter();

  const handleDrop = async (item, index) => {
    console.log(item, index)
    if (item.type === "mybags") {
      router.push('/confirm/place/'+ index);
    }
    else {
      router.push(`/confirm/move/${item.index}/${index}`);
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CELL',
    item: { id, index, type, content },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'CELL',
    drop: (item) => handleDrop(item, index),
  }));

  const cellRef = useRef(null);

  drag(drop(cellRef)); 

  return (
    <div
      ref={cellRef}
      className="w-16 h-16 border border-gray-300 flex items-center justify-center font-bold"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      {content}
    </div>
  );
};