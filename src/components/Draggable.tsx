"use client";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

interface DraggableItemProps {
  id: string;
  style: React.CSSProperties;
  data: Item;
}

interface Item {
  id: string;
  position: { top: number; left: number };
  isDragging: boolean;
  height: number;
  width: number;
}

const DraggableItem = ({ id, style, data }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const finalTransform = data.isDragging
    ? `translate3d(${transform?.x}px, ${transform?.y}px, 0)`
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...style, transform: finalTransform }}
      className={`text-white bg-blue-500 flex item-center justify-center ${
        data.isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {id}
    </div>
  );
};
export default DraggableItem;
