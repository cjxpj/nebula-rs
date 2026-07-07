const mdModules = import.meta.glob(
  ['../../v1.0/*.md'],
  { query: '?raw', import: 'default', eager: true }
)

const pages = []

for (const [key, content] of Object.entries(mdModules)) {
  const match = key.match(/v1\.0\/(.+)\.md$/)
  if (!match) continue
  let slug = match[1]
  const path = slug === 'index' ? '/v1.0/' : `/v1.0/${slug}`

  const titleMatch = content.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1] : path

  const headings = []
  const headingRegex = /^#{2,3}\s+(.+)$/gm
  let h
  while ((h = headingRegex.exec(content)) !== null) {
    headings.push(h[1])
  }

  pages.push({ path, title, headings, content })
}

export function search(query) {
  if (!query.trim()) return []
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)

  return pages
    .filter(p => {
      const haystack = (p.title + ' ' + p.headings.join(' ') + ' ' + p.content).toLowerCase()
      return terms.every(t => haystack.includes(t))
    })
    .map(p => {
      const idx = p.content.toLowerCase().indexOf(terms[0])
      const start = Math.max(0, idx - 40)
      const end = Math.min(p.content.length, idx + 120)
      let snippet = p.content.slice(start, end).replace(/\n+/g, ' ')
      if (start > 0) snippet = '...' + snippet
      if (end < p.content.length) snippet += '...'
      return { ...p, snippet }
    })
    .slice(0, 10)
}
