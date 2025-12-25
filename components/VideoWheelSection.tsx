import React, { useState, useRef, useCallback } from 'react';
import { Play, Instagram, Video as VideoIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { videos } from '../data';
import { VideoItem } from '../types';

const VideoWheelSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [wheelRotation, setWheelRotation] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const sectionRef = useRef<HTMLDivElement>(null);
    const wheelRef = useRef<HTMLDivElement>(null);

    const ITEMS_COUNT = videos.length;
    const ANGLE_PER_ITEM = 360 / ITEMS_COUNT;

    const activeVideo = videos[activeIndex];

    // Navigate to specific video
    const goToVideo = useCallback((index: number) => {
        // Handle looping
        let newIndex = index;
        if (index < 0) {
            newIndex = ITEMS_COUNT - 1;
        } else if (index >= ITEMS_COUNT) {
            newIndex = 0;
        }
        setActiveIndex(newIndex);
        setWheelRotation(newIndex * ANGLE_PER_ITEM);
    }, [ANGLE_PER_ITEM, ITEMS_COUNT]);

    // Navigate prev/next (with infinite loop)
    const goPrev = () => {
        goToVideo(activeIndex - 1);
    };

    const goNext = () => {
        goToVideo(activeIndex + 1);
    };

    // Helper to get YouTube ID
    const getYoutubeId = (url: string) => {
        if (url.includes('embed/')) {
            return url.split('embed/')[1].split('?')[0];
        }
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/);
        return match ? match[1] : '';
    };

    // Get wheel item styles
    const getWheelItemStyle = (index: number): React.CSSProperties => {
        const radius = 160; // Distance from center
        const angle = (index * ANGLE_PER_ITEM - wheelRotation - 90) * (Math.PI / 180);

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        const isActive = index === activeIndex;

        return {
            transform: `translate(${x}px, ${y}px) scale(${isActive ? 1.2 : 0.85})`,
            opacity: isActive ? 1 : 0.5,
            filter: isActive ? 'grayscale(0)' : 'grayscale(0.7)',
            zIndex: isActive ? 10 : 1,
        };
    };

    // Render video player
    const renderPlayer = (video: VideoItem) => {
        switch (video.source) {
            case 'youtube':
                return (
                    <iframe
                        className="w-full h-full rounded-lg"
                        src={`${video.url}${video.url.includes('?') ? '&' : '?'}rel=0&autoplay=1&mute=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                );
            case 'instagram':
                let igUrl = video.url.split('?')[0].replace(/\/$/, '');
                if (!igUrl.endsWith('/embed')) {
                    igUrl += '/embed';
                }
                return (
                    <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center relative rounded-lg overflow-hidden">
                        <iframe
                            className="w-full h-full border-none"
                            src={igUrl}
                            title={video.title}
                            allowFullScreen
                        />
                        <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 hover:bg-black/80 text-white text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 transition-all"
                        >
                            Watch on Instagram
                        </a>
                    </div>
                );
            case 'local':
                return (
                    <div className="w-full h-full bg-black flex items-center justify-center rounded-lg overflow-hidden">
                        <video
                            className="w-full h-full object-contain"
                            controls
                            autoPlay
                            src={video.url}
                        >
                            Your browser does not support the video tag.
                        </video>
                    </div>
                );
            default:
                return null;
        }
    };

    // Render thumbnail
    const renderThumbnail = (video: VideoItem) => {
        // Use custom thumbnail if provided
        if (video.thumbnailUrl) {
            return (
                <div className="relative w-full h-full">
                    <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <Play size={16} fill="currentColor" className="text-white" />
                    </div>
                </div>
            );
        }

        switch (video.source) {
            case 'youtube':
                return (
                    <div className="relative w-full h-full">
                        <img
                            src={`https://img.youtube.com/vi/${getYoutubeId(video.url)}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <Play size={16} fill="currentColor" className="text-white" />
                        </div>
                    </div>
                );
            case 'local':
                return (
                    <div className="relative w-full h-full bg-zinc-900">
                        <video
                            src={video.url}
                            className="w-full h-full object-cover object-top pointer-events-none"
                            muted
                            preload="metadata"
                            onLoadedMetadata={(e) => {
                                e.currentTarget.currentTime = 1;
                            }}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <VideoIcon size={16} className="text-white" />
                        </div>
                    </div>
                );
            case 'instagram':
                return (
                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                        <Instagram size={20} className="text-white" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* Main Section */}
            <section
                ref={sectionRef}
                className="relative w-full min-h-screen flex items-center justify-center py-20 z-30"
                id="video-journey"
            >
                <div className="w-full max-w-7xl mx-auto px-4">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-tighter mb-2">
                            Creative Journey
                        </h2>
                        <p className="text-theater-gold text-xs uppercase tracking-[0.2em] font-light">
                            Scroll to explore • Film, Sound & Craft
                        </p>
                    </div>

                    {/* Desktop Layout: Display + Wheel */}
                    <div className="hidden lg:grid grid-cols-5 gap-8 items-center min-h-[500px]">

                        {/* Left: Video Display Zone (3 cols) */}
                        <div className="col-span-3 space-y-6">
                            {/* Video Preview Card */}
                            <div
                                className="relative aspect-video bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden cursor-pointer group shadow-2xl"
                                onClick={() => setIsPlaying(true)}
                                style={{
                                    transform: 'scale(1)',
                                    transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                }}
                            >
                                {/* Thumbnail Preview */}
                                <div className="w-full h-full">
                                    {activeVideo.thumbnailUrl ? (
                                        <img
                                            src={activeVideo.thumbnailUrl}
                                            alt={activeVideo.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : activeVideo.source === 'youtube' ? (
                                        <img
                                            src={`https://img.youtube.com/vi/${getYoutubeId(activeVideo.url)}/maxresdefault.jpg`}
                                            alt={activeVideo.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : activeVideo.source === 'local' ? (
                                        <video
                                            src={activeVideo.url}
                                            className="w-full h-full object-contain bg-black pointer-events-none"
                                            muted
                                            preload="metadata"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                                            <Instagram size={64} className="text-white/50" />
                                        </div>
                                    )}
                                </div>

                                {/* Play Overlay */}
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="w-20 h-20 rounded-full bg-theater-gold/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                                        <Play size={32} fill="currentColor" className="text-black ml-1" />
                                    </div>
                                </div>

                                {/* Golden Border Glow on Hover */}
                                <div className="absolute inset-0 rounded-lg border-2 border-theater-gold/0 group-hover:border-theater-gold/50 transition-all duration-300 pointer-events-none" />
                            </div>

                            {/* Video Info */}
                            <div className="border-l-2 border-theater-gold pl-6 py-2">
                                <span className="text-theater-gold text-sm font-bold tracking-widest uppercase block mb-2">
                                    {activeVideo.date}
                                </span>
                                <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight mb-3">
                                    {activeVideo.title}
                                </h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                                    {activeVideo.description}
                                </p>

                                {activeVideo.source === 'instagram' && (
                                    <a
                                        href={activeVideo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 text-xs uppercase tracking-widest text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors"
                                    >
                                        <Instagram size={14} /> View on Instagram
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Right: Wheel Navigation (2 cols) */}
                        <div className="col-span-2 flex items-center justify-center">
                            <div className="relative w-[400px] h-[400px]">
                                {/* Wheel Track (decorative ring) */}
                                <div className="absolute inset-4 rounded-full border border-zinc-800/50" />
                                <div className="absolute inset-16 rounded-full border border-zinc-800/30" />

                                {/* Center Hub */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner">
                                    <span className="text-xs text-theater-gold font-bold">
                                        {activeIndex + 1}/{ITEMS_COUNT}
                                    </span>
                                </div>

                                {/* Wheel Items */}
                                <div
                                    ref={wheelRef}
                                    className="absolute inset-0 flex items-center justify-center"
                                    style={{
                                        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    }}
                                >
                                    {videos.map((video, index) => (
                                        <button
                                            key={video.id}
                                            onClick={() => goToVideo(index)}
                                            className={`absolute w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-500 ${index === activeIndex
                                                ? 'border-theater-gold shadow-[0_0_20px_rgba(212,175,55,0.5)]'
                                                : 'border-zinc-700 hover:border-zinc-500'
                                                }`}
                                            style={getWheelItemStyle(index)}
                                        >
                                            {renderThumbnail(video)}
                                        </button>
                                    ))}
                                </div>

                                {/* Navigation Arrows */}
                                <button
                                    onClick={goPrev}
                                    className="absolute top-1/2 -left-4 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center transition-all hover:bg-zinc-800 hover:border-theater-gold"
                                >
                                    <ChevronLeft size={20} className="text-white" />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="absolute top-1/2 -right-4 -translate-y-1/2 w-10 h-10 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center transition-all hover:bg-zinc-800 hover:border-theater-gold"
                                >
                                    <ChevronRight size={20} className="text-white" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Layout: Swipe Carousel */}
                    <div className="lg:hidden">
                        {/* Video Preview */}
                        <div
                            className="relative aspect-video bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden mb-6 cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                        >
                            {activeVideo.thumbnailUrl ? (
                                <img
                                    src={activeVideo.thumbnailUrl}
                                    alt={activeVideo.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : activeVideo.source === 'youtube' ? (
                                <img
                                    src={`https://img.youtube.com/vi/${getYoutubeId(activeVideo.url)}/hqdefault.jpg`}
                                    alt={activeVideo.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : activeVideo.source === 'local' ? (
                                <video
                                    src={activeVideo.url}
                                    className="w-full h-full object-contain bg-black pointer-events-none"
                                    muted
                                    preload="metadata"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center">
                                    <Instagram size={48} className="text-white/50" />
                                </div>
                            )}

                            {/* Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-14 h-14 rounded-full bg-theater-gold/90 flex items-center justify-center shadow-lg">
                                    <Play size={24} fill="currentColor" className="text-black ml-1" />
                                </div>
                            </div>
                        </div>

                        {/* Video Info */}
                        <div className="mb-6 text-center">
                            <span className="text-theater-gold text-xs font-bold tracking-widest uppercase block mb-2">
                                {activeVideo.date}
                            </span>
                            <h3 className="text-xl font-serif text-white leading-tight mb-2">
                                {activeVideo.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {activeVideo.description}
                            </p>
                        </div>

                        {/* Horizontal Dots Navigation */}
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <button
                                onClick={goPrev}
                                className="p-2"
                            >
                                <ChevronLeft size={24} className="text-white" />
                            </button>

                            <div className="flex gap-2">
                                {videos.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToVideo(index)}
                                        className={`w-2 h-2 rounded-full transition-all ${index === activeIndex
                                            ? 'bg-theater-gold w-6'
                                            : 'bg-zinc-600 hover:bg-zinc-500'
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={goNext}
                                className="p-2"
                            >
                                <ChevronRight size={24} className="text-white" />
                            </button>
                        </div>

                        {/* Thumbnail Strip */}
                        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700">
                            {videos.map((video, index) => (
                                <button
                                    key={video.id}
                                    onClick={() => goToVideo(index)}
                                    className={`flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${index === activeIndex
                                        ? 'border-theater-gold'
                                        : 'border-zinc-700 opacity-60'
                                        }`}
                                >
                                    {renderThumbnail(video)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Hint (Desktop) */}
                    <div className="hidden lg:flex justify-center mt-8 text-gray-500 text-xs uppercase tracking-widest animate-pulse">
                        {activeIndex < ITEMS_COUNT - 1 ? (
                            <span>↓ Scroll to explore more</span>
                        ) : (
                            <span>↓ Continue scrolling</span>
                        )}
                    </div>
                </div>
            </section>

            {/* Video Player Modal */}
            {isPlaying && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8"
                    onClick={() => setIsPlaying(false)}
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setIsPlaying(false)}
                        className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 hover:border-theater-gold transition-all z-10"
                    >
                        <X size={24} className="text-white" />
                    </button>

                    {/* Player Container */}
                    <div
                        className="w-full max-w-5xl aspect-video"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {renderPlayer(activeVideo)}
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoWheelSection;
