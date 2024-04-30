import { InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { message, Upload } from "antd"
import React from "react"

const { Dragger } = Upload

export const Uploader: React.FC<UploadProps> = (props: UploadProps) => (
    <div style={{ height: "200px", marginTop: "20px" }}>
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                banned files.
            </p>
        </Dragger>
    </div>

)
