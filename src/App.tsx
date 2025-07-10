import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import ScenarioCard from './components/ScenarioCard';
import './App.css';

export interface Model {
  id: string;
  name: string;
}

export interface Scenario {
  id: string;
  name: string;
  models: Model[];
}

const initialScenarios: Scenario[] = [
  {
    id: '1',
    name: '学习知识点',
    models: [
      { id: '1-1', name: 'GPT-4' },
      { id: '1-2', name: 'Claude-3' },
      { id: '1-3', name: 'Gemini Pro' }
    ]
  },
  {
    id: '2',
    name: '图表绘制',
    models: [
      { id: '2-1', name: 'GPT-4' },
      { id: '2-2', name: 'Claude-3' },
      { id: '2-3', name: 'Gemini Pro' }
    ]
  },
  {
    id: '3',
    name: '智能技术问答',
    models: [
      { id: '3-1', name: 'GPT-4' },
      { id: '3-2', name: 'Claude-3' },
      { id: '3-3', name: 'Gemini Pro' }
    ]
  },
  {
    id: '4',
    name: '代码补全',
    models: [
      { id: '4-1', name: 'GPT-4' },
      { id: '4-2', name: 'Claude-3' },
      { id: '4-3', name: 'Copilot' }
    ]
  },
  {
    id: '5',
    name: '项目理解',
    models: [
      { id: '5-1', name: 'GPT-4' },
      { id: '5-2', name: 'Claude-3' },
      { id: '5-3', name: 'Gemini Pro' }
    ]
  }
];

function App() {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('ai-model-scenarios');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setScenarios(parsedData);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Handle drag start
  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    // Find which scenario this model belongs to
    const scenarioId = scenarios.find(scenario =>
      scenario.models.some(model => model.id === event.active.id)
    )?.id;
    setActiveScenarioId(scenarioId || null);
  };

  // Handle drag end
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id && activeScenarioId) {
      const scenario = scenarios.find(s => s.id === activeScenarioId);
      if (scenario) {
        const oldIndex = scenario.models.findIndex(model => model.id === active.id);
        const newIndex = scenario.models.findIndex(model => model.id === over.id);

        const newModels = arrayMove(scenario.models, oldIndex, newIndex);
        
        setScenarios(scenarios.map(s =>
          s.id === activeScenarioId
            ? { ...s, models: newModels }
            : s
        ));
      }
    }

    setActiveId(null);
    setActiveScenarioId(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ai产品榜
          </h1>
          <p className="text-gray-400 text-sm">全球最新智能AI产品排行</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1">
            <button className="px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded-md">
              AI产品榜·应用榜 6月
            </button>
            <button className="px-6 py-2 text-sm font-medium text-gray-400 hover:text-white">
              AI产品榜·网站榜 6月
            </button>
          </div>
        </div>

        {/* Scenarios */}
        <div className="space-y-6">
          {scenarios.map((scenario) => (
            <DndContext
              key={scenario.id}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <ScenarioCard
                scenario={scenario}
                activeId={activeId}
              />
            </DndContext>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500 text-sm">
          <p>© 2025 AI产品榜. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default App;