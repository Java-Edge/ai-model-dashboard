import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, TrendingUp } from 'lucide-react';
import { Model } from '../App';

interface ModelItemProps {
  model: Model;
  rank: number;
  isActive: boolean;
}

const ModelItem: React.FC<ModelItemProps> = ({
  model,
  rank,
  isActive
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: model.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-black';
    if (rank === 2) return 'bg-gray-400 text-black';
    if (rank === 3) return 'bg-orange-500 text-white';
    return 'bg-gray-600 text-white';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg p-4 transition-all duration-200 group
        ${isDragging ? 'opacity-50 shadow-lg scale-105' : ''}
        ${isActive ? 'ring-2 ring-purple-500' : ''}
        border border-gray-600/50 hover:border-purple-500/50
      `}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-purple-400 transition-colors duration-200"
      >
        <GripVertical size={16} />
      </div>

      {/* Rank Badge */}
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
        ${getRankStyle(rank)}
      `}>
        {rank}
      </div>

      {/* Model Info */}
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Model Icon/Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            {model.name.charAt(0)}
          </div>
          
          {/* Model Name */}
          <div>
            <h3 className="text-white font-medium">{model.name}</h3>
            <p className="text-gray-400 text-sm">AI模型</p>
          </div>
        </div>

        {/* Trending Icon */}
        <div className="flex items-center gap-2 text-green-400">
          <TrendingUp size={16} />
          <span className="text-sm font-medium">{Math.floor(Math.random() * 100) + 50}</span>
        </div>
      </div>
    </div>
  );
};

export default ModelItem;