"use client";
import { DndContext } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import React, { useState } from "react";
import DroppableArea from "@/components/Droppable";
import DraggableItem from "@/components/Draggable";
import {
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
interface Item {
  id: string;
  position: { top: number; left: number };
  isDragging: boolean;
  height: number;
  width: number;
}

export default function Home() {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const [items, setItems] = useState<Item[]>([]);
  const [itemHight, setItemHight] = useState(5);
  const [itemWidth, setItemWidth] = useState(15);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      id: `item-${items.length}`,
      position: { top: 0, left: 0 },
      height: itemHight,
      width: itemWidth,
      isDragging: false,
    };
    setItems([...items, newItem]);
  };

  const handleDragStart = (event: any) => {
    const { active } = event;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === active.id ? { ...item, isDragging: true } : item
      )
    );
  };

  const handleDragEnd = (event: any) => {
    const { active, delta } = event;
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === active.id
          ? {
              ...item,
              position: {
                top: Math.max(0, item.position.top + delta.y),
                left: Math.max(0, item.position.left + delta.x),
              },
              isDragging: false,
            }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full justify-between">
      <form
        className="w-full md:w-1/2 h-full flex flex-col items-center justify-center gap-5"
        onSubmit={handleAddItem}
      >
        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Hight *(percentage)</label>
            <input
              type="number"
              min={1}
              max={100}
              value={itemHight}
              onChange={(e) => setItemHight(Number(e.target.value))}
              className="bg-gray-50 focus-visible:outline-indigo-600 h-10"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Width *(percentage)</label>
            <input
              type="number"
              min={1}
              max={100}
              value={itemWidth}
              onChange={(e) => setItemWidth(Number(e.target.value))}
              className="bg-gray-50 focus-visible:outline-indigo-600 h-10"
              required
            />
          </div>
        </div>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add Item
        </button>
      </form>
      <div className="w-full md:w-1/2 h-full">
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement]}
          sensors={sensors}
        >
          <DroppableArea>
            {items.map((item) => (
              <DraggableItem
                key={item.id}
                id={item.id}
                data={item}
                style={{
                  position: "absolute",
                  top: item.position.top,
                  left: item.position.left,
                  height: `${item.height}%`,
                  width: `${item.width}%`,
                }}
              />
            ))}
          </DroppableArea>
        </DndContext>
      </div>
    </div>
  );
}
