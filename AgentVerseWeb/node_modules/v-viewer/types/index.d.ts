import { App } from 'vue'
import ViewerJs from 'viewerjs'
import type { Directive, DefineComponent } from 'vue'

declare namespace VueViewer {
  export interface InstallationOptions {
    name?: string
    debug?: boolean
    defaultOptions?: ViewerJs.Options
  }

  export interface ViewerApiOptions {
    images: Array<string | object>
    options?: ViewerJs.Options
  }

  export function install(app: App, options?: InstallationOptions): void

  export function setDefaults(defaultOptions: ViewerJs.Options): void
}

export declare const Viewer: typeof ViewerJs

export declare const api: (options: VueViewer.ViewerApiOptions) => ViewerJs

export declare const directive: (options?: VueViewer.InstallationOptions) => Directive

export declare const component: DefineComponent<{}, {}, any>

export default VueViewer

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $viewerApi: typeof api
  }
}
