import { DownCircleOutlined, QuestionCircleOutlined, UserOutlined } from "@ant-design/icons"
import { useGSAP } from "@gsap/react"
import { Button, Carousel, Drawer, Timeline } from "antd"
import classNames from "classnames"
import gsap from "gsap"
import TextPlugin from "gsap/TextPlugin"
import React, { useCallback, useState } from "react"
import Markdown from "react-markdown"
import { TypeAnimation } from "react-type-animation"
import type { IRole, ITraceback } from "entities/Chat"
import { Avatar } from "../Avatar/Avatar"
import { Acordion } from "../Collapse/Collapse"
import { Text, TextTheme } from "../Text/Text"
import * as cls from "./Message.module.scss"

gsap.registerPlugin(useGSAP, TextPlugin)
interface MessageProps {
    className?: string
    sender?: IRole
    content?: string
    traceback?: ITraceback[]
    isExample?: boolean
}

export const Message = (props: MessageProps) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)
    const openDrawer = useCallback(() => {
        setDrawerIsOpen(true)
    }, [])
    const closeDrawer = useCallback(() => {
        setDrawerIsOpen(false)
    }, [])
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
                {(sender === "ai" && traceback?.length > 0) &&
                    <>
                        <Button style={{ marginLeft: "auto", display: "block" }} size="large" type="text" icon={<QuestionCircleOutlined style={{ color: "var(--font-color)", fontSize: "30px" }} />} onClick={openDrawer} />
                        <Drawer title="Используемые документы в ответе" placement="right" onClose={closeDrawer} size="large" open={drawerIsOpen}>
                            <Timeline
                                mode="left"
                                items={traceback.map((item) => ({
                                    children: <Text title={item.document_name} text={item.information} textTheme={TextTheme.TRACEBACK} />,
                                    dot: <DownCircleOutlined style={{ color: "var(--primary-color)", fontSize: "15px" }} />
                                }))}
                            />
                        </Drawer>
                    </>
                    // <Acordion items={[{
                    //     key: "answer",
                    //     label: "Используемые документы в ответе",
                    //     children: traceback.map((item) => <Text key={item.document_id} title={item.document_name} text={item.information} textTheme={TextTheme.VAULT} />)
                    // }]} />
                }
            </div>
        </div>
    )
}
