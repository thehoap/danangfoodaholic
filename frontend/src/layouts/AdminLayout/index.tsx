import Footer from 'components/Footer';
import Header from 'components/Header';
import './styles.scss';

interface IAdminLayout {
    children: any;
}

const AdminLayout = ({ children }: IAdminLayout) => {
    return (
        <div className="layout layout-admin">
            <Header className="layout-admin__header" />
            <main className="layout-admin__content">{children}</main>
            <Footer className="layout-admin__footer" />
        </div>
    );
};

export default AdminLayout;
