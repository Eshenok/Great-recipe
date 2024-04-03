type CategoryItemType = {
  name: string,
  image: string,
}

type CategoryItemFullType = CategoryItemType & {
  checked: boolean,
  key: string,
}

export {CategoryItemType, CategoryItemFullType};