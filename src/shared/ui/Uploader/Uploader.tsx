import { InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { message, Upload } from "antd"
import React, { memo } from "react"

const { Dragger } = Upload

export const Uploader = memo((props: UploadProps) => (
    <div style={{ height: "200px", width: "100%", marginTop: "20px" }}>
        <Dragger style={{ width: "100%" }} {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Кликните или перетащите для загрузки ваш файл</p>
            <p className="ant-upload-hint">
                Поддерживаемые форматы: .pdf, .md, .docx, .txt
            </p>
        </Dragger>
    </div>

))
