// Find similar posts based on category and date-series flow
const similarItems = (currentItem: any, allItems: any, currentSlug: string) => {
  const currentCategory = currentItem.data.category;
  const currentTags = currentItem.data.tags || [];
  const currentDate = new Date(currentItem.data.date);

  // Filter out current post and drafts
  const otherItems = allItems.filter(
    (item: any) => item.slug !== currentSlug && !item.data.draft
  );

  // 1. Get all items in the same category, sorted by date (oldest to newest)
  const categoryItems = otherItems
    .filter((item: any) => item.data.category === currentCategory)
    .sort((a: any, b: any) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime());

  let recommended = [];

  // 2. Find the "Next" article in this category by date
  const nextInSeries = categoryItems.find(
    (item: any) => new Date(item.data.date).getTime() > currentDate.getTime()
  );

  if (nextInSeries) {
    recommended.push({ ...nextInSeries, isNext: true });
  }

  // 3. Fill remaining slots with other category items (most recent first)
  const remainingCategoryItems = categoryItems
    .filter((item: any) => item.slug !== (nextInSeries?.slug || ''))
    .sort((a: any, b: any) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  recommended = [...recommended, ...remainingCategoryItems];

  // 4. Fallback to same tags if we still don't have 3
  if (recommended.length < 3 && currentTags.length > 0) {
    const sameTags = otherItems.filter((item: any) => {
      if (recommended.some((r: any) => r.slug === item.slug)) return false;
      const itemTags = item.data.tags || [];
      return itemTags.some((tag: string) => currentTags.includes(tag));
    });
    recommended = [...recommended, ...sameTags];
  }

  // 5. Absolute fallback: Just most recent posts
  if (recommended.length < 3) {
    const fallback = otherItems
      .filter((item: any) => !recommended.some((r: any) => r.slug === item.slug))
      .sort((a: any, b: any) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
    recommended = [...recommended, ...fallback];
  }

  return recommended.slice(0, 3);
};

export default similarItems;