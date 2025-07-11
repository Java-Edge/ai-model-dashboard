import React from 'react';
import { Model } from '../App';

interface ModelItemProps {
  model: Model;
  rank: number;
  isActive: boolean;
}

const ModelItem: React.FC<ModelItemProps> = ({ model, rank }) => {
  return (
    <div>
      <span>{rank}. {model.name}</span>
    </div>
  );
};

export default ModelItem;