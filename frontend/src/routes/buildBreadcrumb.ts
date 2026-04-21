import { breadcrumbMap } from "./breadcrumb";

function buildBreadcrumb(path: string) {
  const result: { label: string; href?: string }[] = []

  let current: string | undefined = path

  while (current) {
    const entry = findBreadcrumbMeta(current)
    if (!entry) break

    result.unshift({
      label: entry.label,
      href: current,
    })

    current = entry.parent
  }

  if (result.length > 0) {
    result[result.length - 1].href = undefined
  }

  return result
}

export default buildBreadcrumb;

function findBreadcrumbMeta(path: string) {
  if (breadcrumbMap[path]) return breadcrumbMap[path]

  for (const key in breadcrumbMap) {
    const meta = breadcrumbMap[key]
    if (meta.match && meta.match.test(path)) {
      return meta
    }
  }

  return undefined
}