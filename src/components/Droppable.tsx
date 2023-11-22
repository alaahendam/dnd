"use client";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

const DroppableArea = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <div ref={setNodeRef} className="bg-gray-50 w-full relative h-full">
      {children}
    </div>
  );
};

export default DroppableArea;
