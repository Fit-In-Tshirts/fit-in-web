'use client'

import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

import image_1 from '../../../public/slideShow_1.png'
import image_2 from '../../../public/slideShow_2.png'
import image_3 from '../../../public/slideshow_image_1.png'
import image_4 from '../../../public/slideshow_image_2.png'
import image_5 from '../../../public/slideshow_image_3.png'

import Image from 'next/image';
import { Button } from '../ui/button';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);

  const slides = [
    { src: image_1, alt: "Custom T-Shirt Design 1" },
    { src: image_2, alt: "T-Shirt Printing Process" },
    { src: image_3, alt: "Quality T-Shirt Materials" },
    { src: image_4, alt: "Custom Design Examples" },
    { src: image_5, alt: "Professional Printing Equipment" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index : number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-96 w-full overflow-hidden bg-gradient-to-bl from-violet-500 to-fuchsia-500 flex flex-row items-center justify-between px-8 lg:px-16">
      
      {/* Left Side - Text Content */}
      <div className={`flex flex-col items-start justify-center gap-6 flex-1 max-w-lg transform transition-all duration-1000 ease-out ${
        isAnimated ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}>
        <div className="text-white">
          <h1 className="text-4xl lg:text-5xl font-bold font-mono mb-4 leading-tight">
            Design It.
            <br />
            <span className="text-yellow-300">Print It.</span>
            <br />
            Wear It.
          </h1>
          <p className="text-lg lg:text-xl text-purple-100 font-medium">
            Your creativity, our quality. Custom t-shirts made exactly how you imagine them.
          </p>
        </div>
        
        <Button variant={'secondary'} className="bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transform hover:scale-105 transition-all duration-200 shadow-lg">
          Start Creating
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Right Side - Slideshow */}
      <div className="relative flex-1 max-w-md lg:max-w-lg h-80 ml-8">
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl">
          {/* Main Image Display */}
          <div className="relative w-full h-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-scale-down md:object-contain"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button 
            variant={'ghost'}
            onClick={prevSlide}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant={'ghost'}
            onClick={nextSlide}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-neutral-500' 
                    : 'bg-white hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements for Visual Interest */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-white rounded-full"></div>
      </div>
    </div>
  );
};

export default HeroSection;