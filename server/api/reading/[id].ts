import { defineEventHandler, getRouterParam } from "#imports";
import pool from "~/server/db";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  try {
    // 使用数据库连接池查询数据
    const { rows } = await pool.query(
      "SELECT id,title,content,created_at,updated_at FROM reading WHERE id=$1",
      [id],
    );
    return rows;
  } catch (error) {
    console.error("数据库查询失败:", error);
    return { error: "无法获取数据" };
  }
});
