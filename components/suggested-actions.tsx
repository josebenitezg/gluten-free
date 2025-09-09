'use client';

import { motion } from 'framer-motion';
import { memo } from 'react';

interface SuggestedActionsProps {
  chatId: string;
  append: (text: string) => void;
}

const suggestedActions = [
  {
    title: 'Restaurantes',
    label: '¿Dónde puedo encontrar pizzas sin gluten en Asunción?',
    action: '¿Dónde puedo encontrar pizzas sin gluten en Asunción?',
  },
  {
    title: 'Información',
    label: '¿Que marcas de pasta sin gluten hay en Paraguay?',
    action: '¿Que marcas de pasta sin gluten hay en Paraguay?',
  },
  {
    title: 'Panaderías',
    label: '¿Cuáles son las mejores panaderías sin gluten?',
    action: '¿Cuáles son las mejores panaderías sin gluten en Paraguay?',
  },
  {
    title: 'Productos',
    label: '¿Dónde comprar productos sin gluten?',
    action: '¿Cuáles son las tiendas que venden productos sin gluten en Paraguay?',
  },
];

function PureSuggestedActions({ append }: SuggestedActionsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-3xl mx-auto p-4">
      {suggestedActions.map((suggestedAction, index) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.05 * index }}
          key={`suggested-action-${suggestedAction.title}-${index}`}
          className={index > 1 ? 'hidden sm:block' : 'block'}
        >
          <button
            onClick={async () => {
              append(suggestedAction.action);
            }}
            className="text-left border dark:border-gray-700 rounded-xl px-4 py-3.5 text-sm flex flex-col w-full h-auto justify-start items-start hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <span className="font-medium text-[#00F879]">
              {suggestedAction.title}
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {suggestedAction.label}
            </span>
          </button>
        </motion.div>
      ))}
    </div>
  );
}

export const SuggestedActions = memo(PureSuggestedActions, () => true); 