import { useCallback } from 'react';

import { type TreeDataLoader } from '@headless-tree/core';

import { type MainMenuTreeItemType } from './MainMenuTypes';

export const useTreeDataLoader = (
  getItems: () => Record<string, MainMenuTreeItemType>,
): TreeDataLoader<MainMenuTreeItemType> => {
  const getChildren = useCallback(
    (itemId: string): string[] => {
      const items = getItems();
      const item = items[itemId];
      return item.children ?? [];
    },
    [getItems],
  );

  const getItem = useCallback(
    (itemId: string): MainMenuTreeItemType => {
      const items = getItems();
      return items[itemId];
    },
    [getItems],
  );

  return {
    getChildren,
    getItem,
  };
};
