import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [streamUrl, setStreamUrl] = useState(
        "https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
    );
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        let hls;

        const initializeHLS = () => {
            hls = new Hls();
            hls.loadSource(streamUrl);
            hls.attachMedia(video);
            // video.pause().catch((error) => {
            //     // Handle play error if needed
            //     console.error("Error playing video:", error);
            // });
        };

        initializeHLS();

        // Clean up resources when the component unmounts
        return () => {
            if (hls) {
                hls.destroy();
            }
        };
    }, [streamUrl]);

    const changeStream = () => {
        const video = videoRef.current;

        // Reload the video with the new stream URL
        if (video) {
            video.pause();
            video.removeAttribute("src");
            video.load();
            video.play().catch((error) => {
                // Handle play error if needed
                console.error("Error playing video:", error);
            });
        }
    };

    const togglePlayPause = () => {
        const video = videoRef.current;

        if (video) {
            if (isPlaying) {
                video.pause();
            } else {
                video.play().catch((error) => {
                    // Handle play error if needed
                    console.error("Error playing video:", error);
                });
            }

            setIsPlaying(!isPlaying);
        }
    };

    return (
        <>
            <input
                type="text"
                value={streamUrl}
                onChange={(e) => setStreamUrl(e.target.value)}
                placeholder="Enter stream URL"
            />
            <button type="button" onClick={changeStream}>
                Change Stream
            </button>
            <button type="button" onClick={togglePlayPause}>
                {isPlaying ? "Pause" : "Play"}
            </button>
            <video
                width={700}
                height={300}
                className="videoCanvas"
                ref={videoRef}
                autoPlay
            />
        </>
    );
};

export default VideoPlayer;
