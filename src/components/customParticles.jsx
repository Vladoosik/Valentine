import React, {memo, useMemo} from 'react';
import Particles from "@tsparticles/react";

const CustomParticles = () => {
    const options = useMemo(
        () => ({
            fpsLimit: 120,
            interactivity: {
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: "#0e2596",
                },
                links: {
                    color: "",
                    distance: 150,
                    enable: false,
                    opacity: 0.5,
                    width: 1,
                },
                move: {
                    direction: "bottom",
                    enable: true,
                    random: true,
                    speed: 4,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: 200,
                },
                opacity: {
                    value: 0.6,
                },
                shape: {
                    type: ['image', 'heart'],
                    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
                    options: {
                        image: [
                            {
                                src: 'https://pngimg.com/d/heart_PNG51168.png',
                                width: 32,
                                height: 32,
                                particles: {
                                    size: {
                                        value: 16
                                    }
                                }
                            },
                        ],
                    }
                },
                size: {
                    value: {min: 1, max: 5},
                },
            },
            detectRetina: true,
        }),
        [],
    );
    return (
            <Particles
                id="tsparticles"
                options={options}
            />
    );
};

export default memo(CustomParticles);
