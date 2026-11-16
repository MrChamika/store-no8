export type CartItem = {
  id: string
  slug: string
  name: string
  price: number
  image: string
  option?: string
  quantity: number
}

const STORAGE_KEY = "store-no8-cart"
const EMPTY_SNAPSHOT = "[]"

let cachedSnapshot: string | null = null
const listeners = new Set<() => void>()

function handleStorageEvent() {
  cachedSnapshot = null
  listeners.forEach((listener) => listener())
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  window.addEventListener("storage", handleStorageEvent)

  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", handleStorageEvent)
  }
}

export function getSnapshot() {
  if (cachedSnapshot === null) {
    try {
      cachedSnapshot = window.localStorage.getItem(STORAGE_KEY) ?? EMPTY_SNAPSHOT
    } catch {
      cachedSnapshot = EMPTY_SNAPSHOT
    }
  }
  return cachedSnapshot
}

export function getServerSnapshot() {
  return EMPTY_SNAPSHOT
}

export function writeItems(items: CartItem[]) {
  const next = JSON.stringify(items)
  cachedSnapshot = next
  try {
    window.localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // storage unavailable, keep the in-memory snapshot
  }
  listeners.forEach((listener) => listener())
}

export function parseItems(snapshot: string): CartItem[] {
  try {
    const parsed = JSON.parse(snapshot)
    return Array.isArray(parsed) ? (parsed as CartItem[]) : []
  } catch {
    return []
  }
}
