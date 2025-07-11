import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';

import {
  createOnDropHandler,
  dragAndDropFeature,
  type ItemInstance,
  selectionFeature,
  syncDataLoaderFeature,
  expandAllFeature,
  type TreeState,
  hotkeysCoreFeature,
  insertItemsAtTarget,
  removeItemsFromParents,
  type DragTarget,
} from '@headless-tree/core';
import { AssistiveTreeDescription, useTree } from '@headless-tree/react';
import cx from 'classnames';

import css from './MainMenu.module.scss';
import { type MainMenuFolderType, type MainMenuTreeItemType } from './MainMenuTypes';
import { MenuArrow } from './MenuArrow';
import { MenuItem } from './MenuItem';
import { useMainMenu } from './UseMainMenu';
import { useTreeDataLoader } from './UseTreeDataLoader';

export type MenuHandler = {
  expandAll: () => void;
  collapseAll: () => void;
  selectItem: (id: string) => void;
};

export interface MainMenuProps {
  ref?: React.Ref<MenuHandler>;
  className?: string;
  root: MainMenuFolderType;
  currentId?: string;
  enableDragAndDrop?: boolean;
  onItemChange?: (item: MainMenuTreeItemType) => Promise<any>;
  insertNewItem?: (dataTransfer: DataTransfer) => MainMenuTreeItemType;
}

export const MainMenu = (props: MainMenuProps) => {
  const { ref, className, root, currentId, enableDragAndDrop, onItemChange, insertNewItem } = props;

  const [state, setState] = useState<Partial<TreeState<MainMenuTreeItemType>>>({
    focusedItem: currentId,
    selectedItems: currentId ? [currentId] : [],
  });

  useEffect(() => {
    setState({
      focusedItem: currentId,
      selectedItems: currentId ? [currentId] : [],
    });
  }, [currentId]);

  const { getItems, setItems } = useMainMenu(root);

  const dataLoader = useTreeDataLoader(getItems);

  const onDrop = createOnDropHandler<MainMenuTreeItemType>((item, newChildren) => {
    setItems(data => {
      const _item = data[item.getId()];
      return {
        ...data,
        [item.getId()]: {
          ..._item,
          children: newChildren,
        },
      };
    });
  });

  const getItemName = useCallback((item: ItemInstance<MainMenuTreeItemType>) => {
    return item.getItemData().title ?? '';
  }, []);

  const isItemFolder = useCallback((item: ItemInstance<MainMenuTreeItemType>) => {
    return item.getItemData().type === 'folder';
  }, []);

  const onDropForeignDragObject = (dataTransfer: DataTransfer, target: DragTarget<any>) => {
    if (!insertNewItem) {
      return;
    }
    const newItem = insertNewItem?.(dataTransfer);
    setItems(data => ({ ...data, [newItem?.id]: newItem }));

    insertItemsAtTarget([newItem?.id], target, (item, newChildrenIds) => {
      setItems(data => {
        const _item = data[item.getId()];
        return {
          ...data,
          [item.getId()]: {
            ..._item,
            children: newChildrenIds,
          },
        };
      });
    });
  };
  const onCompleteForeignDrop = (items: ItemInstance<any>[]) =>
    removeItemsFromParents(items, (item, newChildren) => {
      setItems(data => {
        const _item = data[item.getId()];
        return {
          ...data,
          [item.getId()]: {
            ..._item,
            children: newChildren,
          },
        };
      });
    });

  const canDropForeignDragObject = (dataTransfer: DataTransfer, target: DragTarget<MainMenuTreeItemType>) =>{
          const json = dataTransfer.getData('text/plain');
      if (!json) {
        return true;
      }

      const data = JSON.parse(dataTransfer.getData('text/plain'));

      console.log('canDropForeignDragObject', data, target);

      return false;
  };

  const tree = useTree<MainMenuTreeItemType>({
    state,
    setState,
    rootItemId: root.id,
    getItemName,
    isItemFolder,
    dataLoader,
    canReorder: true,
    onDrop,
    onCompleteForeignDrop: enableDragAndDrop ? onCompleteForeignDrop : undefined,
    onDropForeignDragObject: enableDragAndDrop ? onDropForeignDragObject : undefined,
    canDropForeignDragObject: enableDragAndDrop ? canDropForeignDragObject : undefined,
    features: [
      hotkeysCoreFeature,
      syncDataLoaderFeature,
      selectionFeature,
      expandAllFeature,
      ...(enableDragAndDrop ? [dragAndDropFeature] : []),
    ],
  });

  useImperativeHandle<MenuHandler, MenuHandler>(
    ref,
    () => ({
      selectItem: (id: string) => {
        tree.setSelectedItems([id]);
      },
      collapseAll: () => {
        tree.collapseAll();
      },
      expandAll: () => {
        tree.expandAll();
      },
    }),
    [tree],
  );

  return (
    <section className={cx('fx4-mainmenu', className, css.mainMenu)}>
      <AssistiveTreeDescription tree={tree} />
      <div {...tree.getContainerProps()} className={css.menuContainer}>
        {tree.getItems().map(item => (
          <button
            {...item.getProps()}
            key={item.getId()}
            className={css.menuContainerItems}
            style={{ paddingLeft: `${item.getItemMeta().level}rem` }}
          >
            <div className={css.menuItemContainer}>
              <MenuArrow isFolder={item.isFolder()} isExpanded={item.isExpanded()} />
              <MenuItem
                item={item.getItemData()}
                isFocused={item.isFocused()}
                isSelected={item.isSelected()}
                isDraggingOver={enableDragAndDrop && item.isDraggingOver() && item.isFolder()}
                onSelected={() => {
                  if (onItemChange && !item.isFolder()) {
                    onItemChange(item.getItemData());
                  }
                }}
              />
            </div>
          </button>
        ))}
        {enableDragAndDrop && <div style={tree.getDragLineStyle()} className={css.dragBetweenLine} />}
      </div>
    </section>
  );
};
