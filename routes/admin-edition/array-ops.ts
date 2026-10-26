// Operações imutáveis de lista usadas pelas abas do editor.
export function moveItem<T>(items: T[], index: number, delta: -1 | 1): T[] {
  const target = index + delta;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export function replaceItem<T>(items: T[], index: number, patch: Partial<T>): T[] {
  return items.map((item, position) => (position === index ? { ...item, ...patch } : item));
}

export function removeItem<T>(items: T[], index: number): T[] {
  return items.filter((_, position) => position !== index);
}

export function insertItem<T>(items: T[], index: number, item: T): T[] {
  return [...items.slice(0, index), item, ...items.slice(index)];
}

export const newId = () => crypto.randomUUID();
