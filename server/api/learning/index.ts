import { defineEventHandler } from "#imports";
import pool from "~/server/db";

export default defineEventHandler(async () => {
  try {
    // 使用数据库连接池查询数据
    const { rows } = await pool.query(
      "SELECT id,title,preview,updated_at FROM learning",
    );
    return rows;
  } catch (error) {
    console.error("数据库查询失败:", error);
    return { error: "无法获取数据" };
  }
});
