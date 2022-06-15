declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    onoutsideclick?: (event: any) => any
  }
}

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.svg?component' {
  const content: any
  export default content
}

declare module '*.svg?src' {
  const content: string
  export default content
}

declare module '*.svg?url' {
  const content: string
  export default content
}
