
export type MainMenuItemType = {
  id: string;
  title?: string;
  icon?: string;
  description?: string;
};

export type MainMenuFolderType = {
  id: string;
  title?: string;
  items?: MainMenuItemType[];
  folders?: MainMenuFolderType[];
};

export type MainMenuTreeItemType = {
  type: 'folder' | 'item';
  id: string;
  title?: string;
  icon?: string;
  children?: string[];
};
