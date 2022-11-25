import { Card, Carousel, Tooltip } from 'antd';
import { ArrowRight, ArrowLeft, NewWindow } from 'assets/icons';
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

    return (
        <Carousel
            {...settings}
            slidesToShow={slidesToShow}
            afterChange={(e) => {
                if (data.length - slidesToShow == e)
                    setAllowViewMore('View more');
                else setAllowViewMore('');
            }}
            prevArrow={<ArrowLeft />}
            nextArrow={
                <Tooltip title={allowViewMore}>
                    {allowViewMore ? (
                        <NewWindow
                            onClick={() => {
                                navigate(viewMorePath);
                            }}
                        />
                    ) : (
                        <ArrowRight />
                    )}
                </Tooltip>
            }
        >
            {data}
        </Carousel>
    );
};

export default Slider;
