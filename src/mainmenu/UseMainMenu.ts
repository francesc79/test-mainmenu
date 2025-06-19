import { useEffect, useState } from 'react';


import { type MainMenuFolderType, type MainMenuTreeItemType } from './MainMenuTypes';
import { flattenMainMenuItems } from './MenuUtils';
import { useInstance } from './UseInstance';

export const useMainMenu = (root: MainMenuFolderType) => {
  const [items, setItems] = useState<Record<string, MainMenuTreeItemType>>(flattenMainMenuItems(root));
  const getItems = useInstance(items);

  useEffect(() => {
    setItems(flattenMainMenuItems(root));
  }, [root]);

  return {
    getItems,
    setItems,
  };
};
