import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: true })

export function toArticle(resp: ArticleResponse): Article {
  const meta: ArticleFrontMatter = resp.front_matter ?? {
    title: '未命名文章',
    date: '',
  }

  return {
    meta,
    markdown: resp.content,
    html: md.render(resp.content),
  }
}
