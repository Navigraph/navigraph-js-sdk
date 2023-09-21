import verifyUser from "./verifyUser"

/**
 * A callback that fires every time that the authentication state changes.
 * @param user - The user object, or null if the user is not authenticated.
 */
export type UserCallback = (user: User | null) => void

/** Unsubscribe function to unmount a previously registered listener. */
export type Unsubscribe = () => void

export interface User {
  scope: string[]
  sub: string
  preferred_username: string
  subscriptions: string[]
}

export let USER: User | null = null

// prettier-ignore
export const USER_LISTENERS = {
  listeners: new Set<UserCallback>(),
  add(listener: UserCallback) { this.listeners.add(listener) },
  remove(listener: UserCallback) { this.listeners.delete(listener) },
  notify(user: User | null) { this.listeners.forEach(listener => listener(user)) },
}

/** Updates the {@link USER} variable and notifies registered listeners of the change */
export function setUser(user: User | null) {
  USER = user
  USER_LISTENERS.notify(user)
}

/** Grabs information about the currently authenticated {@link USER user} from memory
 * @param verify Whether to verify the signed in user with the server by attempting to grab new credentials. If true, the function will return a promise instead.
 * @returns {User|null} The currently authenticated user
 * @throws {NotInitializedError} If the SDK has not been initialized
 */
export function getUser(): User | null
export function getUser(verify?: false): User | null
export function getUser(verify?: true): Promise<User | null>
export function getUser(verify?: boolean): User | null | Promise<User | null> {
  return verify ? verifyUser() : USER
}
