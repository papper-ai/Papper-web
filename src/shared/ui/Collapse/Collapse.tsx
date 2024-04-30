import type { CollapseProps } from "antd"
import { Collapse } from "antd"
import { FC } from "react"

export type AccordionItem = CollapseProps["items"]

export const Acordion: FC<CollapseProps> = (props) => {
    return <Collapse accordion {...props} />
}
