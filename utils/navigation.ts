import { navigateTo } from "#imports";

export function navigate(page?: string) {
  if (page != undefined) {
    return navigateTo({
      path: `/${page}`,
    });
  }
}
