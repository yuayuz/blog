import type { PageListMessage } from "~/types/main";

export const setListMessage = function (page: string, count: number) {
  const listMessage: PageListMessage[] = [];
  for (let i = 0; i < count; i++) {
    listMessage.push({
      title: `${page}${i}`,
      subMessage: "你好",
      date: new Date().toLocaleString(),
    });
  }
  return listMessage;
};
