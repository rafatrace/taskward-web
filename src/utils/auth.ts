/**
 * Is user loggedin
 */
export const isLoggedin = (): boolean => {
  const accessToken = localStorage.getItem('@browser_accessToken')
  if (accessToken != null) return true

  return false
}

/**
 * Clean Storage
 */
export const cleanStorage = () => {
  localStorage.removeItem('@browser_user')
  localStorage.removeItem('@browser_accessToken')
}
