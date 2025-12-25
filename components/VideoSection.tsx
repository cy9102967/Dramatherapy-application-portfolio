import React, { useState } from 'react';
import { Play, Instagram, Video as VideoIcon } from 'lucide-react';
import { videos } from '../data';
import { VideoItem } from '../types';

const VideoSection: React.FC = () => {
    const [activeVideo, setActiveVideo] = useState<VideoItem>(videos[0]);

    // Helper to get YouTube ID
    const getYoutubeId = (url: string) => {
        // Handle embed URLs
        if (url.includes('embed/')) {
            return url.split('embed/')[1].split('?')[0];
        }
        // Handle watch URLs
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/);
        return match ? match[1] : '';
    };

    const renderPlayer = (video: VideoItem) => {
        switch (video.source) {
            case 'youtube':
                return (
                    <iframe
                        className="w-full h-full rounded-sm"
                        src={`${video.url}${video.url.includes('?') ? '&' : '?'}rel=0&autoplay=1&mute=0`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                );
            case 'instagram':
                // Ensure clean embed URL logic for consistency
                // e.g. https://www.instagram.com/reel/CzgLOa1PaG9/ -> https://www.instagram.com/reel/CzgLOa1PaG9/embed/
                let igUrl = video.url.split('?')[0].replace(/\/$/, '');
                if (!igUrl.endsWith('/embed')) {
                    igUrl += '/embed';
                }

                return (
                    <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-start pt-4 text-center rounded-sm overflow-auto relative">
                        <iframe
                            className="w-[328px] h-[540px] border-none rounded-sm relative z-10 flex-shrink-0"
                            src={igUrl}
                            title={video.title}
                            allowTransparency={true}
                            allowFullScreen={true}
                        />
                        {/* Fallback/Overlay Link in case embed fails or is blocked */}
                        <a
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 mb-4 z-20 bg-black/50 hover:bg-black/80 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/20 transition-all inline-block"
                        >
                            Watch on Instagram
                        </a>
                    </div>
                );
            case 'local':
                return (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                        {/* object-contain ensures the whole video is visible without cropping */}
                        <video
                            className="w-full h-full rounded-sm object-contain"
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

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-20 relative z-30">
            <div className="flex flex-col gap-10">
                <div className="text-center mb-0">
                    <h2 className="text-3xl md:text-4xl font-serif text-white font-bold tracking-tighter mb-2">
                        Creative Practice
                    </h2>
                    <p className="text-theater-gold text-xs uppercase tracking-[0.2em] font-light">
                        Film, Sound & Craft
                    </p>
                </div>

                {/* Main Player Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[500px]">
                    {/* Player */}
                    <div className="lg:col-span-2 w-full h-[300px] lg:h-full bg-black border border-zinc-800 rounded-sm shadow-2xl relative overflow-hidden group">
                        {activeVideo ? (
                            renderPlayer(activeVideo)
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500">
                                Select a video
                            </div>
                        )}
                    </div>

                    {/* Description Panel */}
                    <div className="w-full h-full flex flex-col justify-center text-left space-y-4 p-4 lg:p-0">
                        <div className="border-l-2 border-theater-gold pl-6 py-2">
                            <span className="text-theater-gold text-sm font-bold tracking-widest uppercase block mb-2">
                                {activeVideo.date}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight mb-4">
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
                                    className="inline-flex items-center gap-2 mt-6 text-xs uppercase tracking-widest text-white border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors"
                                >
                                    <Instagram size={14} /> View on Instagram
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Thumbnail Carousel */}
                <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    <div className="flex gap-4 min-w-max px-2">
                        {videos.map((video) => (
                            <button
                                key={video.id}
                                onClick={() => setActiveVideo(video)}
                                className={`relative w-48 h-28 flex-shrink-0 rounded-sm overflow-hidden border transition-all duration-300 group
                  ${activeVideo.id === video.id
                                        ? 'border-theater-gold shadow-[0_0_15px_rgba(255,215,0,0.3)] scale-105'
                                        : 'border-zinc-800 opacity-60 hover:opacity-100 hover:scale-105'
                                    }`}
                            >
                                {/* Thumbnails */}
                                {video.source === 'youtube' ? (
                                    <div className="w-full h-full relative">
                                        <img
                                            src={`https://img.youtube.com/vi/${getYoutubeId(video.url)}/mqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <Play size={20} fill="currentColor" className="text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                ) : video.source === 'local' ? (
                                    <div className="w-full h-full relative bg-zinc-900">
                                        <video
                                            src={video.url}
                                            className="w-full h-full object-cover pointer-events-none"
                                            muted
                                            preload="metadata"
                                            onLoadedMetadata={(e) => {
                                                // Seek to 1s to capture a frame if start is black
                                                e.currentTarget.currentTime = 1;
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                            <VideoIcon size={20} className="text-white drop-shadow-lg" />
                                        </div>
                                    </div>
                                ) : (
                                    // Instagram - Placeholder with style
                                    <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex flex-col items-center justify-center p-2 relative">
                                        <Instagram size={24} className="text-white mb-2" />
                                        <span className="text-[10px] text-white text-center font-serif leading-tight line-clamp-2 px-1">
                                            {video.title}
                                        </span>
                                    </div>
                                )}

                                {/* Title overlay for all (optional, improves clarity) */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-1">
                                    <p className="text-[10px] text-white text-center truncate px-1">
                                        {video.title}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoSection;
