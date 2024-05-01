import type { RadioChangeEvent } from "antd"
import { Radio, Space } from "antd"
import { useState } from "react"
import * as cls from "./RadioButton.module.scss"

export interface RadioItem {
    value: string
    label: string
}

interface RadioButtonProps {
    items: RadioItem[],
    onChange?: (e: RadioChangeEvent) => void
    value?: string
}

export const RadioButton = (props: RadioButtonProps) => {
    const { items, onChange, value } = props

    return (
        <Radio.Group buttonStyle="solid" className={cls.radio} onChange={onChange} value={value}>
            <Space className={cls.space} direction="vertical">
                {items.map((item) => (
                    <Radio.Button className={cls.item} key={item.value} value={item.value}>
                        {item.label}
                    </Radio.Button>
                ))}
            </Space>
        </Radio.Group>
    )
}
