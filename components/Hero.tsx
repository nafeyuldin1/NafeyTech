'use client'
import React, { useEffect, useRef, useMemo } from 'react';
import Header from './Header';
import { BodyFont, HeadingFont } from '@/fonts';
import Link from 'next/link';
import { projectGallery, ServicesTags } from '@/data';
import Image from 'next/image';
import gsap from 'gsap';

const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const servicesTagsRefs = useRef<(HTMLHeadingElement | null)[]>([]); // Refs for services tags

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      const playedBefore = localStorage.getItem('videoPlayed') === 'true';
      if (playedBefore) {
        video.currentTime = 14; // Start at 14s if played before
      }
    };

    const handleEnded = () => {
      localStorage.setItem('videoPlayed', 'true');
      video.currentTime = 14; // Reset to 14s after first full play
      video.play().catch(console.error);
    };

    // Mobile-friendly video setup
    const initVideo = () => {
      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('ended', handleEnded);

      // iOS specific attributes
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');

      // Handle autoplay restrictions
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback for strict mobile policies
          document.addEventListener('touchstart', () => {
            video.play();
          }, { once: true });
        });
      }
    };

    initVideo();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (headingRef.current && paragraphRef.current && buttonRef.current) {
      // Reset initial positions
      gsap.set([headingRef.current, paragraphRef.current, buttonRef.current], {
        opacity: 0,
        y: 50,
      });

      // Animate heading
      gsap.to(headingRef.current, {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Animate paragraph
      gsap.to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1,
      });

      // Animate button
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 1.5,
      });

      // Add a subtle scale animation to the button on hover
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.1,
          duration: 1,
          ease: 'power2.out',
        });
      });

      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 1,
          ease: 'power2.out',
        });
      });
    }

    // Animate services tags with a stagger effect
    if (servicesTagsRefs.current.length > 0) {
      gsap.set(servicesTagsRefs.current, { opacity: 0, y: 20 });

      gsap.to(servicesTagsRefs.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2, // Delay between each tag animation
        ease: 'power3.out',
        delay: 2, // Start after other animations
      });
    }
  }, []);

  // Memoize static content
  const servicesTags = useMemo(() => (
    ServicesTags.map((item, index) => (
      <h3
        key={item.id}
        ref={(el) => {
          if (el) servicesTagsRefs.current[index] = el; // Assign ref to each tag
        }}
        className='text-white text-lg px-2 bg-[#901937] rounded-sm'
      >
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
    <div className="h-auto lg:h-[100vh] hero w-full relative overflow-hidden">
      {/* Video element with mobile-optimized attributes */}
      <video
        ref={videoRef}
        playsInline
        muted
        preload="metadata"
        className="background-video absolute h-full w-full left-0 right-0 top-0 z-[-1] object-cover"
        poster="/video-poster.jpg" // Add optimized poster image
      >
        <source src="/bannervideo.mp4" type="video/mp4" />
        <source src="/bannervideo.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      <div className="h-full hero w-full flex items-center lg:pt-0 pt-[20vh] justify-start">
        <div className="content w-[90%] lg:w-[90%] lg:flex-row flex-col flex ld:gap-0 gap-8 lg:items-center justify-between lg:px-0 px-[13px] text-start mx-auto">
          <div className='min-w-fit'>
            <div className='services flex flex-wrap items-center gap-2 lg:gap-4 mb-2 justify-start'>
              {servicesTags}
            </div>
            <h1
              ref={headingRef}
              className={`${HeadingFont} text-5xl md:text-7xl max-w-[800px] font-extrabold text-white`}
            >
              Design, Develop, Deploy, Dominate Digitally
            </h1>
            <p
              ref={paragraphRef}
              className={`${BodyFont} text-xl md:text-2xl text-white mt-3 lg:mt-6 max-w-[800px] mb-8`}
            >
              We transform visionary ideas into powerful digital experiences with innovation, precision, and expertise.
            </p>
            <Link
              ref={buttonRef}
              href="/casestudies"
              className={`${BodyFont} casestudiesButton tracking-[0.1rem] font-extrabold`}
              prefetch={false}
            >
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