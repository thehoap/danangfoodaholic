import { Card, Carousel } from 'antd';
import { ArrowRight, ArrowLeft } from 'assets/icons';
import React, { ReactNode } from 'react';

interface ISlider {
    data?: ReactNode[];
    slidesToShow: number;
}

const settings = {
    className: 'center',
    // centerMode: true,
    infinite: false,
    centerPadding: '20px',
    speed: 500,
    dots: false,
    arrows: true,
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
};

const Slider = ({ data, slidesToShow }: ISlider) => {
    return (
        <Carousel {...settings} slidesToShow={slidesToShow}>
            {data}
        </Carousel>
    );
};

export default Slider;
