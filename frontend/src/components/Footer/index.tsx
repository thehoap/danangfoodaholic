import { Divider, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

import { StyledFooter } from './styles';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { PATH } from 'constants/path';
import { Facebook } from 'assets/icons';

interface IFooter {
    className: string;
}

const Footer = ({ className }: IFooter) => {
    return (
        <StyledFooter className={className}>
            <section className="information">
                <a
                    href="https://www.facebook.com/danangfoodaholic/"
                    target="_blank"
                    className="social"
                >
                    <div className="facebook">
                        <Facebook />
                    </div>
                    <Tooltip title="Visit us on Facebook to see your review">
                        <span>Da Nang Foodaholic</span>
                    </Tooltip>
                </a>
            </section>
            <section className="copyright">
                Copyright &copy; 2022
                <span className="copyright-name"> thehoap</span>. All Rights
                Reserved.
            </section>
        </StyledFooter>
    );
};

export default Footer;
