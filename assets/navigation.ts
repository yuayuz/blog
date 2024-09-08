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
      navigation: "lifeNotes",
    },
    {
      title: "navigation.learning",
      navigation: "learning",
    },
    {
      title: "navigation.reading",
      navigation: "reading",
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
export const menuButtons: NavigationMenu[] = [
  {
    title: "navigationMenu.photos.title",
    items: photos,
  },
];
