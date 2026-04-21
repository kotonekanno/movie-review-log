export const breadcrumbMap: Record<
  string,
  { label: string; parent?: string; match?: RegExp }
> = {
  "/": {
    label: "ホーム",
  },

  "/reviews": {
    label: "レビュー一覧",
    parent: "/",
  },

  "/reviews/edit": {
    label: "レビュー作成",
    parent: "/reviews",
  },

  "/reviews/:reviewId": {
    label: "レビュー詳細",
    parent: "/reviews",
    match: /^\/reviews\/[^/]+$/,
  },

  "/reviews/edit/:reviewId": {
    label: "レビュー編集",
    parent: "/reviews/:reviewId",
    match: /^\/reviews\/edit\/[^/]+$/,
  },

  "/watchlist": {
    label: "ウォッチリスト",
    parent: "/",
  },
}