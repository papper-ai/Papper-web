import { StatisticProps } from "antd"
import CountUp from "react-countup"

export const statsFormatter: StatisticProps["formatter"] = (value) => {
    return <CountUp end={value as number} />
}
