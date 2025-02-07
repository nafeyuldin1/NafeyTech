'use client'
import React, { useEffect, useRef, useMemo } from 'react';
import Header from './Header';
import { BodyFont, HeadingFont } from '@/fonts';
import Link from 'next/link';
import { projectGallery, ServicesTags } from '@/data';
import Image from 'next/image';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      const playedBefore = localStorage.getItem('videoPlayed') === 'true';
      if (playedBefore) {
        video.currentTime = 19; // Start at 19s if played before
      }
    };

    const handleEnded = () => {
      localStorage.setItem('videoPlayed', 'true');
      video.currentTime = 19; // Reset to 19s after first full play
      video.play().catch(console.error);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    // Auto-play video (muted to bypass browser restrictions)
    video.play().catch((err) => {
      console.error('Autoplay blocked:', err);
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Memoize static content
  const servicesTags = useMemo(() => (
    ServicesTags.map((item) => (
      <h3 key={item.id} className='text-white text-lg px-2 bg-[#901937] rounded-sm'>
        {item.label}
      </h3>
    ))
  ), []);

  const projectSlides = useMemo(() => (
    projectGallery.map((item) => (
      <div key={item.id} className='lg:h-auto h-[150px] min-w-[150px] lg:w-full bg-white rounded-xl'>
        <Image
          alt="projects"
          className='object-cover h-full rounded-lg'
          src={item.image}
          height={500}
          width={500}
          priority={item.id <= 2}
          quality={75}
        />
      </div>
    ))
  ), []);

  return (
    <div className="h-auto lg:h-[100vh] hero w-full">
      <video
        ref={videoRef}
        playsInline
        muted
        preload="auto"
        className="background-video absolute h-full w-full left-0 right-0 top-0 z-[-1] object-cover"
      >
        <source src="/bannervideo.mp4" type="video/mp4" />
        <source src="/bannervideo.webm" type="video/webm" />
      </video>

      <div className="h-full hero w-full flex  items-center lg:pt-0 pt-[20vh] justify-start">
        <div className="content w-[90%] lg:w-[90%] lg:flex-row flex-col flex ld:gap-0 gap-8 lg:items-center justify-between lg:px-0 px-[13px] text-start mx-auto">
          <div className='min-w-fit'>
            <div className='services flex flex-wrap items-center gap-2 lg:gap-4 mb-2 justify-start'>
              {servicesTags}
            </div>
            <h1 className={`${HeadingFont} text-5xl md:text-7xl max-w-[800px] font-extrabold text-white`}>
              Design, Develop, Deploy, Dominate Digitally
            </h1>
            <p className={`${BodyFont} text-xl md:text-2xl text-white mt-3 lg:mt-6 max-w-[800px] mb-8`}>
              We transform visionary ideas into powerful digital experiences with innovation, precision, and expertise.
            </p>
            <Link href="/casestudies" className={`${BodyFont} casestudiesButton tracking-[0.1rem] font-extrabold`}>
              <span>Case Studies</span>
            </Link>
          </div>
          <div className='project_slider lg:max-w-[700px] grid grid-cols-1 lg:grid-cols-2 flex-col gap-5 lg:h-[80vh] w-auto overflow-hidden'>
            <div className='flex animate1 flex-row lg:flex-col gap-3'>
              {projectSlides}
            </div>
            <div className='flex animate2 flex-row lg:flex-col gap-3'>
              {projectSlides}
            </div>
          </div>
        </div>
      </div>
      <Header />
    </div>
  );
};

export default React.memo(Hero);