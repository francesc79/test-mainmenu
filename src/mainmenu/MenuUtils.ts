import { type MainMenuFolderType, type MainMenuItemType, type MainMenuTreeItemType } from './MainMenuTypes';

/**
 * Recursively collects all MainMenuItemType items from a MainMenuFolderType tree
 * into a flat Record keyed by their `id`.
 */
export function flattenMainMenuItems(root: MainMenuFolderType): Record<string, MainMenuTreeItemType> {
  const result: Record<string, MainMenuTreeItemType> = {};

  function traverse(folder: MainMenuFolderType) {
    result[folder.id] = {
      type: 'folder',
      id: folder.id,
      title: folder.title,
      children: [
        ...(folder.folders ?? ([] as MainMenuFolderType[])).map(f => f.id),
        ...(folder.items ?? ([] as MainMenuItemType[])).map(i => i.id),
      ],
    };

    if (folder.items) {
      for (const item of folder.items) {
        result[item.id] = { type: 'item', id: item.id, title: item.title, icon: item.icon };
      }
    }
    if (folder.folders) {
      for (const subfolder of folder.folders) {
        traverse(subfolder);
      }
    }
  }

  traverse(root);
  return result;
}
