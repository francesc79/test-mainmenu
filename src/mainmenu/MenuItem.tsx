import cx from 'classnames';

import css from './MainMenu.module.scss';
import { type MainMenuTreeItemType } from './MainMenuTypes';

export interface MenuItemProps {
  item: MainMenuTreeItemType;
  isFocused?: boolean;
  isSelected?: boolean;
  isDraggingOver?: boolean;
  onSelected?: (evt: React.MouseEvent<HTMLDivElement>) => void;
}

export const MenuItem = (props: MenuItemProps) => {
  const { item, isFocused, isSelected, isDraggingOver, onSelected } = props;
  const { title } = item;

  return (
    <div
      className={cx(css.menuItem, {
        [`${css.menuItemSelected}`]: isSelected,
        [`${css.menuItemFocused}`]: isFocused,
        [`${css.menuItemDraggingOver}`]: isDraggingOver,
      })}
      tabIndex={-1}
      onClick={onSelected}
    >
      {title ?? ''}
    </div>
  );
};
