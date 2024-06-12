import { UserOutlined } from "@ant-design/icons"
import { Carousel } from "antd"
import classNames from "classnames"
import React from "react"
import Markdown from "react-markdown"
import { TypeAnimation } from "react-type-animation"
import type { IRole, ITraceback } from "entities/Chat"
import { Avatar } from "../Avatar/Avatar"
import { Acordion } from "../Collapse/Collapse"
import { Text, TextTheme } from "../Text/Text"
import * as cls from "./Message.module.scss"

interface MessageProps {
    className?: string
    sender?: IRole
    content?: string
    traceback?: ITraceback[]
    isExample?: boolean
}

export const Message = (props: MessageProps) => {
    const {
        className,
        sender,
        content,
        traceback = [],
        isExample = false
    } = props
    return (
        <div className={classNames(cls.Message, {}, [className, cls[sender || "user"]])}>
            <Avatar theme={sender} />
            <div className={classNames(cls.content, { [cls.isExample]: isExample })}>
                {isExample ? <TypeAnimation cursor={false} sequence={[content as string]} /> : <Markdown>{content}</Markdown>}
                {(sender === "ai" && traceback.length > 0) &&
                    <Acordion items={[{
                        key: "answer",
                        label: "Используемые документы в ответе",
                        children: traceback.map((item) => <Text key={item.document_id} title={item.document_name} text={item.information} textTheme={TextTheme.VAULT} />)
                    }]} />
                }
            </div>
        </div>
    )
}
