export const findMemeById = (arr, id) => {
  return arr.findIndex((m) => m.id === id);
};

export const deleteFromArray = (arr, id) => {
  let copy = [...arr];
  const index = findMemeById(copy, id);
  copy.splice(index, 1);
  return copy;
};
