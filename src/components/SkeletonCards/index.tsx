import React from 'react';
import { SkeletonCard } from './components/SkeletonCard';

export const SkeletonCards: React.FC = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-x-4 gap-y-8 sm:gap-x-6 xl:gap-x-8"
    >
      {[1, 2, 3, 4, 5].map((line) => (
        <li key={line} className="relative">
          <SkeletonCard />
        </li>
      ))}
    </ul>
  );
};
