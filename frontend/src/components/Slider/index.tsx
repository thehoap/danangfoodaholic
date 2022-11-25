import { Card, Carousel, Tooltip } from 'antd';
import { ArrowRight, ArrowLeft, ViewMore } from 'assets/icons';
import { PATH } from 'constants/path';
import React, { ReactNode, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

interface ISlider {
    data: ReactNode[];
    slidesToShow: number;
    viewMorePath: string;
}

const settings = {
    className: 'center',
    // centerMode: true,
    infinite: false,
    // centerPadding: '20px',
    speed: 500,
    dots: false,
    arrows: true,
};

const Slider = ({ data, slidesToShow, viewMorePath }: ISlider) => {
    const navigate = useNavigate();
    const [allowViewMore, setAllowViewMore] = useState<'' | 'View more'>('');

    const handleViewMore = (index: number) => {
        if (data.length - slidesToShow == index) setAllowViewMore('View more');
        else setAllowViewMore('');
    };

    const nextArrow = (
        <Tooltip title={allowViewMore}>
            {allowViewMore ? (
                <ViewMore
                    onClick={() => {
                        navigate(viewMorePath);
                    }}
                />
            ) : (
                <ArrowRight />
            )}
        </Tooltip>
    );

    return (
        <Carousel
            {...settings}
            slidesToShow={slidesToShow}
            afterChange={handleViewMore}
            prevArrow={<ArrowLeft />}
            nextArrow={nextArrow}
        >
            {data}
        </Carousel>
    );
};

export default Slider;
