import { Divider } from 'antd';
import { NavLink } from 'react-router-dom';

import { StyledFooter } from './styles';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { PATH } from 'constants/path';
import { Facebook } from 'assets/icons';

interface IFooter {
    className: string;
}

const Footer = ({ className }: IFooter) => {
    const services = [
        {
            heading: 'Về công ty',
            items: [
                {
                    path: PATH.HOME.path,
                    label: 'Trang chủ',
                },
                {
                    path: PATH.HOME.path,
                    label: 'Về chúng tôi',
                },
            ],
        },
        {
            heading: 'Hỗ trợ',
            items: [
                {
                    path: PATH.HOME.path,
                    label: 'FAQs',
                },
                {
                    path: PATH.HOME.path,
                    label: 'Bảo mật thông tin',
                },
                {
                    path: PATH.HOME.path,
                    label: 'Chính sách chung',
                },
            ],
        },
    ];

    return (
        <StyledFooter className={className}>
            <section className="information">
                <div className="social">
                    <Logo />
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Mollitia, tenetur.
                    </p>
                    <div className="facebook">
                        <Facebook />
                    </div>
                </div>
                {services.map((services) => (
                    <div className="services" key={services.heading}>
                        <h4 className="services-heading">{services.heading}</h4>
                        <ul className="services-list">
                            {services.items.map((item) => (
                                <li key={item.label}>
                                    <NavLink to={item.path}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <Divider />
            <section className="copyright">
                Copyright &copy; 2022
                <span className="copyright-name"> thehoap</span>. All Rights
                Reserved.
            </section>
        </StyledFooter>
    );
};

export default Footer;
