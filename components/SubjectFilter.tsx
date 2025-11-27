import React from 'react';
import { SUBJECTS, SubjectType } from '../types';

interface Props {
  selectedSubject: SubjectType;
  onSelect: (subject: SubjectType) => void;
}

export const SubjectFilter: React.FC<Props> = ({ selectedSubject, onSelect }) => {
  return (
    <div className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar">
      <div className="flex space-x-2 min-w-max px-2">
        {SUBJECTS.map((subject) => (
          <button
            key={subject}
            onClick={() => onSelect(subject)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${selectedSubject === subject
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-900 border border-gray-200 hover:bg-gray-50'}
            `}
          >
            {subject}
          </button>
        ))}
      </div>
    </div>
  );
};