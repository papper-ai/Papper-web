import { UserOutlined } from "@ant-design/icons"
import classNames from "classnames"
import React from "react"
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
}

export const Message = ({ className, sender, content, traceback }: MessageProps) => {
    return (
        <div className={classNames(cls.Message, {}, [className, cls[sender]])}>
            <Avatar theme={sender} />
            <div className={cls.content}>
                {content.split(/\n/).map((line, index) => index === 0 ? line : <React.Fragment key={line}>{line}<br /></React.Fragment>)}
                {sender === "ai" &&
                    <Acordion items={[{
                        key: "answer",
                        label: "Используемые документы в ответе",
                        children: traceback.map((item) => <Text key={item.document_id} title={item.document_id} text={item.information} textTheme={TextTheme.VAULT} />)
                    }]} />
                }
            </div>
        </div>
    )
}
