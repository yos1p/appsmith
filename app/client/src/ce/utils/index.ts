import type { MenuItemProps } from "design-system-old";

declare let window: any;

export const addItemsInContextMenu = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  args: boolean[],
  history: any,
  workspaceId: string,
  moreActionItems: MenuItemProps[],
) => {
  return moreActionItems;
};

export const useHtmlPageTitle = () => {
  return window._env_.APP_TITLE;
};
