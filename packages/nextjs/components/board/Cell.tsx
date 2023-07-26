import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { useRouter } from 'next/router';

export const Cell = ({ id, content, type, index, hp, gridData }) => {
  const router = useRouter();

  const handleDrop = async (item, index) => {
    console.log(item, gridData[index])
    if (item.type === "army") {
      router.push('/confirm/place/'+ index);
    }
    else if (gridData[index].typeGrid === "sword"){
      router.push(`/confirm/attack/${item.index}/${index}`);
    }
    else if (gridData[index].typeGrid === "reward"){
      router.push(`/confirm/reward/${item.index}/${index}`);
    }
    else {
      router.push(`/confirm/move/${item.index}/${index}`);
    }
  };

  const canMove = (item) => {
    if (+item.id > 25){
      if (index === 0 || index === 24 || index === 4 || index === 20) return true;
      return false;
    } 
    if (+item.id === 4 && +item.id + 1 === index
        || +item.id === 9 && +item.id + 1 === index
        || +item.id === 14 && +item.id + 1 === index
        || +item.id === 19 && +item.id + 1 === index) return false;
    if (+item.id === 5 && +item.id - 1 === index
      || +item.id === 10 && +item.id - 1 === index
      || +item.id === 15 && +item.id - 1 === index
      || +item.id === 20 && +item.id - 1 === index) return false;
    if (+item.id + 1 === index
        || +item.id - 1 === index
        || +item.id + 5 === index
        || +item.id - 5 === index) return true;
    return false;
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CELL',
    item: { id, index, type, hp, content },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  }));

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'CELL',
    drop: (item) => handleDrop(item, index),
    canDrop: (item) => canMove(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    }),
  }));

  const cellRef = useRef(null);

  drag(drop(cellRef)); 

  console.log(hp)

  return (
    <div
      ref={cellRef}
      className="w-20 h-20 border border-gray-300 flex items-center justify-center font-bold relative"
      style={{
        opacity: isDragging ? 0.5 : 1,
        background: "white",
        cursor: 'move',
      }}
    >
      {content}
      {isOver && canDrop && <div
        className="overlay"
        role={type}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: "blue",
        }}
      />}
      {!isOver && canDrop && <div
        className="overlay"
        role={type}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: "yellow",
        }}
      />}
      {isOver && !canDrop && <div
        className="overlay"
        role={type}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: "red",
        }}
      />}
      {hp !== "0" && <p
        className="overlay"
        style={{
          position: 'absolute',
          bottom: -15,
          left: 1,
          zIndex: 1,
          fontSize: 12
        }}
      >
        {hp}
      </p>}
    </div>
  );
};