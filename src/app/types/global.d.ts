declare module "*.scss" {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export = classNames;
}
declare module "*.svg" {
    import React from "react"
    const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
    export default SVG
}
declare module "*.png" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value: any
    export = value;
}
declare module "*.jpg" {

}
declare module "*.jpeg" {

}

declare const __IS_DEV__: boolean
