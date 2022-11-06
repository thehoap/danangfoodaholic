import Footer from 'components/Footer';
import Header from 'components/Header';
import './styles.scss';
interface IMainLayout {
    children: any;
}

const MainLayout = ({ children }: IMainLayout) => {
    return (
        <div className="layout layout-main">
            <Header className="layout-main__header" />
            <main className="layout-main__content">{children}</main>
            <Footer className="layout-main__footer" />
        </div>
    );
};

export default MainLayout;
