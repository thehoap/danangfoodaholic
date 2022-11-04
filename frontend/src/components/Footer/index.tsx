import React from 'react';
import { StyledFooter } from './styles';

interface IFooter {
    className: string;
}

const Footer = ({ className }: IFooter) => {
    return <StyledFooter className={className}>Footer</StyledFooter>;
};

export default Footer;
