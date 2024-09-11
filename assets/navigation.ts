import type {
  Navigation,
  NavigationButton,
  NavigationMenu,
} from "~/types/navigation";

export const pages: Navigation = {
  home: {
    title: "title",
    navigation: "",
  },
  buttons: [
    {
      title: "navigation.lifeNotes",
      navigation: "article-lifeNotes",
    },
    {
      title: "navigation.reading",
      navigation: "article-reading",
    },
  ],
};
const photos: NavigationButton[] = [
  {
    title: "navigationMenu.photos.photography",
    navigation: "photos/photography",
  },
  {
    title: "navigationMenu.photos.visualImpressions",
    navigation: "photos/visualImpressions",
  },
];
const learning: NavigationButton[] = [
  {
    title: "navigationMenu.learning.frontend",
    navigation: "article-frontend",
  },
];
export const menuButtons: NavigationMenu[] = [
  {
    title: "navigationMenu.learning.title",
    items: learning,
  },
  {
    title: "navigationMenu.photos.title",
    items: photos,
  },
];
