import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons"
import { Button } from "antd"
import classNames from "classnames"
import * as CryptoJS from "crypto-js"
import { IDocument } from "entities/Vault"
import * as cls from "./VaultDocumentsExtra.module.scss"

interface VaultDocumentsExtraProps {
    className?: string
    deleteDocument: (id: string) => void
    doc: IDocument
}

export const VaultDocumentsExtra = ({ className, deleteDocument, doc }: VaultDocumentsExtraProps) => {
    // TODO: Логику расшифровки документа отдельной функцией сделать
    const downloadDocument = async () => {
        function detectMimeType (fileName: string) {
            const extension = fileName.split(".").pop()
            switch (extension) {
            case "pdf":
                return "application/pdf"
            case "md":
                return "text/markdown"
            case "docx":
                return "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            case "txt":
                return "text/plain"
            default:
                return "application/octet-stream"
            }
        }
        function decryptAES (encryptedData: ArrayBuffer, password: string) {
            const encryptedBytes = new Uint8Array(encryptedData)

            const salt = encryptedBytes.slice(0, 16)
            const iv = encryptedBytes.slice(16, 32)
            const ciphertext = encryptedBytes.slice(32)

            const key = CryptoJS.PBKDF2(password, CryptoJS.lib.WordArray.create(salt), {
                keySize: 256 / 32,
                iterations: 1000,
                hasher: CryptoJS.algo.SHA256
            })

            const decryptedBytes = CryptoJS.AES.decrypt(
                // @ts-expect-error
                { ciphertext: CryptoJS.lib.WordArray.create(ciphertext) },
                key,
                { iv: CryptoJS.lib.WordArray.create(iv), mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
            )

            const decryptedData = decryptedBytes.toString(CryptoJS.enc.Base64)
            const binaryString = atob(decryptedData)
            const uint8Array = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
                uint8Array[i] = binaryString.charCodeAt(i)
            }
            return uint8Array
        }
        const response = await fetch(`https://1c12c9e2-f2d7-4091-bd4a-6a4b2859bd58.selstorage.ru/${doc.id}`)
        const arrayBuffer = await response.arrayBuffer()
        try {
            const data = decryptAES(arrayBuffer, "kz6aNcWaSevCS3EkNSQUSsa8GGe6YeVZ")
            const mimeType = detectMimeType(doc.name)
            console.log(mimeType)
            const blob = new Blob([data], { type: mimeType })
            const anchor = document.createElement("a")
            anchor.href = URL.createObjectURL(blob)
            anchor.download = doc.name
            document.body.appendChild(anchor)
            anchor.style.display = "none"
            anchor.click()
            anchor.remove()
            URL.revokeObjectURL(anchor.href)
        } catch (error) {
            console.error("Error decrypting data:", error)
        }
    }
    return (
        <div className={classNames(cls.VaultDocumentsExtra, {}, [className])}>
            <Button type="text" shape="circle" style={{ color: "red", fontSize: "20px" }} icon={<DeleteOutlined />} onClick={(e) => { e.stopPropagation(); deleteDocument(doc.id) }} />
            <Button type="text" shape="circle" style={{ color: "var(--primary-color)", fontSize: "20px" }} icon={<DownloadOutlined />} onClick={(e) => { e.stopPropagation(); downloadDocument() }} />
        </div>
    )
}
