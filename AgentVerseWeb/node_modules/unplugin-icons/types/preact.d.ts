declare module 'virtual:icons/*' {
  import type { JSX, SVGProps } from 'preact'
  const component: (props: SVGProps<SVGSVGElement>) => JSX.Element
  export default component
}
declare module '~icons/*' {
  import type { JSX, SVGProps } from 'preact'
  const component: (props: SVGProps<SVGSVGElement>) => JSX.Element
  export default component
}
