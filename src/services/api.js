export async function getCategories() {
  return fetch('https://api.mercadolibre.com/sites/MLB/categories').then((r) => r.json());
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}_ID&q=${query}`)
    .then((r) => r.json());
}
