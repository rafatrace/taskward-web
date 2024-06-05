/**
 * Cn stands for Class Names, its a helper to join classes
 */
export const cn = (...args: Array<string | Record<string, boolean> | undefined>): string => {
  const classes: string[] = []

  args.map((arg) => {
    // When argument is a string
    if (typeof arg === 'string') {
      classes.push(arg)
    }

    // When argument is an object with condition
    if (typeof arg === 'object' && Object.values(arg)[0]) {
      classes.push(Object.keys(arg)[0] as string)
    }
  })

  return classes.join(' ')
}
