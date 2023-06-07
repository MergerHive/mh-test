import React from 'react'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ children, slidesToShow = 2, speed = 2000, autoplaySpeed = 5000 }) => {
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: slidesToShow,
        slidesToScroll: 1,
        autoplay: true,
        speed: speed,
        autoplaySpeed: autoplaySpeed,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    dots: false,
                    infinite: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    speed: 1000,
                    autoplaySpeed: 2000
                },
            }
        ]
    };

    return (
        <div className="App">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    );
}

export default Carousel