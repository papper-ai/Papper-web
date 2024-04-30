import { Collapse as AntdCollapse } from "antd"
import React from "react"

const { Panel } = AntdCollapse

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

const itemsNest = [
    {
        key: "1",
        header: "This is panel nest panel",
        content: <p>{text}</p>
    }
]

const items = [
    {
        key: "1",
        header: "This is panel header 1",
        content: <AntdCollapse defaultActiveKey={["1"]} items={itemsNest} />
    },
    {
        key: "2",
        header: "This is panel header 2",
        content: <p>{text}</p>
    },
    {
        key: "3",
        header: "This is panel header 3",
        content: <p>{text}</p>
    }
]
interface CollapseProps {
    children?: React.ReactNode
}
export const Collapse: React.FC = ({ children }: CollapseProps) => {
    const onChange = (key: string | string[]) => {
        console.log(key)
    }

    return (
        <AntdCollapse onChange={onChange} defaultActiveKey={["1"]} items={items}>
            {children}
        </AntdCollapse>
    )
}

export const CollapsePanel: React.FC<{ header: string; key: string; children: React.ReactNode }> = ({ header, key, children }) => (
    <Panel header={header} key={key}>
        {children}
    </Panel>
)
