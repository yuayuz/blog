export type NavigationButton = {
  img?: string;
  title: string;
  navigation: string;
};
export type Navigation = {
  img?: string;
  home: NavigationButton;
  buttons: NavigationButton[];
};

export type NavigationMenu = {
  title: string;
  items: NavigationButton[];
};
