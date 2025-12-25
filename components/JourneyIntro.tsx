import React, { useEffect, useState } from 'react';
import { MousePointer2 } from 'lucide-react';

interface JourneyIntroProps {
    visible: boolean;
    onStart: () => void;
}

const JourneyIntro: React.FC<JourneyIntroProps> = ({ visible, onStart }) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        if (visible) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-50 hidden md:flex items-center justify-center transition-opacity duration-1000 ease-out ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ opacity: visible ? 1 : 0 }}
        >
            <div className="text-center p-8 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl max-w-lg mx-4">
                <div className="relative inline-block mb-6">
                    <MousePointer2 className="w-8 h-8 md:w-10 md:h-10 text-theater-gold animate-bounce mx-auto" />
                    {/* Echo effect for the cursor */}
                    <div className="absolute inset-0 bg-theater-gold/50 blur-lg animate-pulse rounded-full" />
                </div>


                <div className="flex flex-col items-center gap-4 mb-10">
                    <p className="text-gray-300 tracking-[0.25em] text-lg md:text-xl font-cormorant italic font-light leading-relaxed">
                        The stage is dark until you bring the light.<br />
                        <span className="text-sm md:text-base tracking-[0.3em] uppercase block mt-4  text-gray-400">
                            Move to reveal • Click to explore
                        </span>
                    </p>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-theater-gold to-transparent opacity-40 mt-2" />
                </div>

                <button
                    onClick={onStart}
                    className="group relative px-10 py-4 bg-transparent border border-theater-gold/50 text-theater-gold font-outfit font-light text-lg tracking-[0.3em] uppercase hover:bg-theater-gold hover:text-black hover:border-theater-gold transition-all duration-500 ease-out overflow-hidden"
                >
                    <span className="relative z-10">Start Explore</span>
                    <div className="absolute inset-0 bg-theater-gold transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </button>
            </div>
        </div>
    );
};

export default JourneyIntro;
