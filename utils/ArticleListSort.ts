import type { PageListMessage } from "~/types/main";

export const compareByUpdatedAsc = function (
  x: PageListMessage,
  y: PageListMessage,
) {
  if (x.updated_at > y.updated_at) {
    return 1;
  } else if (x.updated_at < y.updated_at) {
    return -1;
  }
  return 0;
};
export const compareByUpdatedDesc = function (
  x: PageListMessage,
  y: PageListMessage,
) {
  if (x.updated_at < y.updated_at) {
    return 1;
  } else if (x.updated_at > y.updated_at) {
    return -1;
  }
  return 0;
};
