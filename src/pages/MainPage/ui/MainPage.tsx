import classNames  from 'classnames';
import * as cls from './MainPage.module.scss';
import { Sidebar } from 'widgets/Sidebar';
interface MainPageProps {
    className?: string
}
const  MainPage = ({className}: MainPageProps) => {
    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <Sidebar />
        </div>
    );
}

export default MainPage
