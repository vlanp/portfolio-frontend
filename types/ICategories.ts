import { z } from "zod/v4";

const ZCategories = z.record(
  z.string(),
  z.object({
    numberOfElements: z.number(),
    id: z.string(),
    get childCategories() {
      return ZCategories;
    },
  })
);

type ICategories = z.infer<typeof ZCategories>;

function getParentId(categories: ICategories, targetId: string): string | null {
  function findParentRecursive(currentCategories: ICategories): string | null {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [categoryName, categoryData] of Object.entries(
      currentCategories
    )) {
      if (
        Object.values(categoryData.childCategories).some(
          (child) => child.id === targetId
        )
      ) {
        return categoryData.id;
      }

      const foundParent = findParentRecursive(categoryData.childCategories);

      if (foundParent !== null) {
        return foundParent;
      }
    }

    return null;
  }

  if (Object.values(categories).some((category) => category.id === targetId)) {
    return null;
  }

  return findParentRecursive(categories);
}

const isChild = (
  categories: ICategories,
  parentId: string,
  childId: string
): boolean => {
  function findCategoryById(
    categories: ICategories,
    targetId: string
  ): ICategories | null {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [categoryName, categoryData] of Object.entries(categories)) {
      if (categoryData.id === targetId) {
        return categoryData.childCategories;
      }

      const found = findCategoryById(categoryData.childCategories, targetId);
      if (found !== null) {
        return found;
      }
    }
    return null;
  }

  function hasChildWithId(categories: ICategories, targetId: string): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [categoryName, categoryData] of Object.entries(categories)) {
      if (categoryData.id === targetId) {
        return true;
      }

      if (hasChildWithId(categoryData.childCategories, targetId)) {
        return true;
      }
    }
    return false;
  }

  const parentChildren = findCategoryById(categories, parentId);

  if (!parentChildren) {
    throw new Error(
      "No category found with the provided id. " +
        JSON.stringify(
          {
            id: parentId,
            categories,
          },
          undefined,
          2
        )
    );
  }

  return hasChildWithId(parentChildren, childId);
};

export type { ICategories };
export { getParentId, isChild, ZCategories };
