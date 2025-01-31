'use client'
import React, { useEffect, useRef } from 'react';
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

    // Check if video has been played before
    const playedBefore = localStorage.getItem('videoPlayed') === 'true';

    // Wait for video metadata to load before setting time
    const handleLoadedMetadata = () => {
      if (playedBefore) {
        video.currentTime = 19; // Start at 19s if played before
      }
    };

    // Handle video end to mark playback and restart
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

  return (
    <div className=" h-auto md:h-[100vh]  hero w-full">
       <video
          ref={videoRef}
          playsInline
          muted
          preload="auto"
          className="background-video absolute h-full w-full left-0 right-0 top-0 z-[-1] object-cover"
        >
          <source src="/15283120-uhd_3840_2160_30fps.mp4" type="video/mp4" />
        </video>

      <div className="h-full hero w-full flex items-center md:pt-0 pt-[30vh] justify-start">
       
        <div className="content w-full md:w-[1600px] md:flex-row flex-col flex  md:gap-0 gap-8 md:items-center justify-between md:px-0 px-[13px] text-start mx-auto">
          <div className='min-w-fit ' >
            <div className='services flex  flex-wrap items-center gap-2 md:gap-4  mb-2  justify-start'>
              {
                ServicesTags.map((item) => (
                  <h3  key={item.id} className='text-white text-lg px-2 bg-[#901937] rounded-sm' >
                    {item.label}
                  </h3>
                ))
              }
            </div>
            <h1 className={`${HeadingFont}  text-5xl md:text-7xl max-w-[800px] font-extrabold text-white`}>
              Design, Develop, Deploy, Dominate Digitally
            </h1>
            <p className={`${BodyFont} text-xl md:text-2xl text-white mt-3 md:mt-6 max-w-[800px] mb-8`}>
              We transform visionary ideas into powerful digital experiences with innovation, precision, and expertise.
            </p>
            <Link href="/casestudies" className={`${BodyFont} casestudiesButton tracking-[0.1rem] font-extrabold`}>
              <span>Case Studies</span>
            </Link>
          </div>
          <div className='project_slider  md:flex-row flex-col flex gap-5 md:h-[80vh]  w-auto overflow-hidden'>
            <div className='flex animate1 flex-row   md:flex-col   gap-3'>
              {projectGallery.map((item ) => (
                <div  data-id={item.id} key={item.id}  className='md:h-[250px] h-[150px] min-w-[150px]  md:min-w-[250px] bg-white rounded-xl'>
                  <Image alt="projects" className='object-cover h-full rounded-lg' src={item.image} height={500} width={500}   />
                </div>
              ))}
            </div>
            <div className='flex  flex-row  md:flex-col  animate2    gap-3'>
              {projectGallery.map((item ) => (
                <div  data-id={item.id} key={item.id}  className='md:h-[250px] h-[150px] min-w-[150px]  md:min-w-[250px] bg-white rounded-xl'>
                  <Image alt="projects" className='object-cover h-full rounded-lg' src={item.image} height={500} width={500}   />
                </div>
              ))}
            </div>
            <div>

            </div>
          </div>
        </div>

      </div>
      <Header />
    </div>
  );
};

export default Hero;


