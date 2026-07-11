import { computed } from 'vue'
import { useRoute } from 'vue-router'

// 自动发现所有版本（扫描 docs 下 v* 目录）
const mdModules = import.meta.glob(
  ['../../*/*.md'],
  { query: '?raw', import: 'default', eager: true }
)

const versionSet = new Set()
for (const key of Object.keys(mdModules)) {
  const m = key.match(/\.\.\/\.\.\/(v[^/]+)\//)
  if (m) versionSet.add(m[1])
}

export const availableVersions = [...versionSet].sort().reverse()

// 从路由路径中提取版本号
export function getVersionFromPath(path) {
  const m = path.match(/^\/(v[^/]+)/)
  return m ? m[1] : (availableVersions[0] || 'v1.0')
}

export function useVersion() {
  const route = useRoute()
  const version = computed(() => getVersionFromPath(route.path))
  return { version }
}

// 获取某版本下的所有 md 模块
export function getMdModulesForVersion(version) {
  const prefix = `../../${version}/`
  const result = {}
  for (const [key, value] of Object.entries(mdModules)) {
    if (key.startsWith(prefix)) {
      result[key] = value
    }
  }
  return result
}
