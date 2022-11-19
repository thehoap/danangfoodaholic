import { Card, Carousel } from 'antd';
import { ArrowRight, ArrowLeft } from 'assets/icons';
import React, { ReactNode } from 'react';

interface ISlider {
    data: ReactNode[];
}
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const settings = {
    className: 'center',
    // centerMode: true,
    infinite: false,
    centerPadding: '30px',
    slidesToShow: 2.5,
    speed: 500,
    dots: false,
    arrows: true,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
};

const Slider = ({ data }: ISlider) => {
    return <Carousel {...settings}>{data}</Carousel>;
};

export default Slider;
