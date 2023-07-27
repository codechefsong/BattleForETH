import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';

const data = {
  id: `26`,
  index: 26,
  type: "army",
  content: "TTT",
}

export const Troop = () => {
  const handleDrop = async (item, index) => {
    console.log(item, index)
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CELL',
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'CELL',
    drop: (item) => handleDrop(item, data.index),
  }));

  const cellRef = useRef(null);

  drag(drop(cellRef)); 

  return (
    <div
      ref={cellRef}
      className="w-16 h-16 border border-gray-300 flex items-center justify-center font-bold bg-green-100"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
    >
      <img src="/assets/troop.png" alt="Troop" />
    </div>
  );
};