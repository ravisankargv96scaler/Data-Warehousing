import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  shortLabel: string;
  icon: React.ElementType;
}

export type ScenarioType = 'transaction' | 'analytics' | null;

export interface SchemaField {
  id: string;
  name: string;
  type: 'fact' | 'dimension';
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}