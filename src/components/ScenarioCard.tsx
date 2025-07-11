import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import ModelItem from './ModelItem';
import { Scenario } from '../App';

interface ScenarioCardProps {
  scenario: Scenario;
  activeId: string | null;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  activeId
}) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-purple-500/30 overflow-hidden">
      {/* Header with purple gradient border */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-px">
        <div className="bg-gray-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">
            {scenario.name}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-3">
          <SortableContext items={scenario.models.map(m => m.id)} strategy={verticalListSortingStrategy}>
            {scenario.models.map((model, index) => (
              <ModelItem
                key={model.id}
                model={model}
                rank={index + 1}
                isActive={activeId === model.id}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;