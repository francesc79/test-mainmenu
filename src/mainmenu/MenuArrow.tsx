import css from './MainMenu.module.scss';

export interface MenuArrowProps {
  isFolder?: boolean;
  isExpanded?: boolean;
}

export const MenuArrow = (props: MenuArrowProps) => {
  const { isFolder, isExpanded } = props;

  if (!isFolder) {
    return <span className={css.emptyIcon} />;
  }
  return isExpanded ? '-' : '+';
};
