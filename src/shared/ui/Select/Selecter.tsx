import classNames from "classnames"
import * as cls from "./Selecter.module.scss"
import { Select } from "antd"
interface SelectProps {
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
    value?: string
    label?: string
}
//  TODO: вынести в antd
export const Selecter = (props: SelectProps) => {
    const {
        onChange,
        className,
        label
    } = props
    return (
        <>
            <label htmlFor="select">{label}</label>
            <select id="select" className={classNames(cls.Selecter, {}, [className])} onChange={onChange}>
                <option value="graph">Граф</option>
                <option value="vector">Вектор</option>
            </select>
        </>

    )
}
