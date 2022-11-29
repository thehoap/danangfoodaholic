import { Tooltip } from 'antd';
import { ArrowRight, ArrowLeft, ViewMore } from 'assets/icons';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledSlider } from './styles';

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
    draggable: true,
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
        <StyledSlider
            {...settings}
            slidesToShow={slidesToShow}
            afterChange={handleViewMore}
            prevArrow={<ArrowLeft />}
            nextArrow={nextArrow}
            slidesToScroll={Math.floor(slidesToShow)}
        >
            {data}
        </StyledSlider>
    );
};

export default Slider;
