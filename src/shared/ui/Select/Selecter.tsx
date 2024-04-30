import { Select } from "antd"
import classNames from "classnames"
import { Text } from "../Text/Text"
import * as cls from "./Selecter.module.scss"
interface SelectProps {
    className?: string
    onChange?: (value: string) => void
    value?: string
    label?: string
}
//  TODO: вынести в antd
export const Selecter = (props: SelectProps) => {
    const {
        onChange,
        className,
        label,
        value
    } = props
    return (
        <>
            {/* <label htmlFor="select">{label}</label>
            <select id="select" className={classNames(cls.Selecter, {}, [className])} onChange={onChange}>
                <option value="graph">Граф</option>
                <option value="vector">Вектор</option>
            </select> */}
            <Text className={cls.title} text="Выберите тип хранилища" />
            <Select
                value={value}
                style={{ width: "100%", height: "50px" }}
                onChange={onChange}
                options={[
                    { value: "graph", label: "Граф знаний" },
                    { value: "vector", label: "Векторная база данных", disabled: true }
                ]}
            />
        </>

    )
}
