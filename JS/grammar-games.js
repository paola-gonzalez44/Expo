let players = [];

        function onYouTubeIframeAPIReady() {

            const iframes = document.querySelectorAll(".youtube-video");

            iframes.forEach((iframe, index) => {

                let firstPauseDone = false;
                let secondPauseDone = false;

                const player = new YT.Player(iframe, {

                    events: {

                        onStateChange: function(event) {

                            if (event.data === YT.PlayerState.PLAYING) {

                                const interval = setInterval(() => {

                                    const duration = player.getDuration();
                                    const current = player.getCurrentTime();

                                    // PRIMERA PAUSA (mitad del video)
                                    if (!firstPauseDone && current >= duration * 0.5) {
                                        player.pauseVideo();
                                        pauseForQuestion(iframe);
                                        firstPauseDone = true;
                                    }

                                    // SEGUNDA PAUSA (90% del video)
                                    if (!secondPauseDone && current >= duration * 0.9) {
                                        player.pauseVideo();
                                        pauseForQuestion(iframe);
                                        secondPauseDone = true;
                                    }

                                    if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                                        clearInterval(interval);
                                    }

                                }, 1000);
                            }
                        }
                    }
                });

                players.push(player);
            });
        }

        // VIDEO LOCAL (video3.mp4)
        const normalVideos = document.querySelectorAll("video.interactive-video");

        normalVideos.forEach(video => {

            let firstPauseDone = false;
            let secondPauseDone = false;

            video.addEventListener("timeupdate", () => {

                const duration = video.duration;
                const current = video.currentTime;

                // PRIMERA PAUSA
                if (!firstPauseDone && current >= duration * 0.5) {
                    pauseForQuestion(video);
                    firstPauseDone = true;
                }

                // SEGUNDA PAUSA
                if (!secondPauseDone && current >= duration * 0.9) {
                    pauseForQuestion(video);
                    secondPauseDone = true;
                }
            });
        });

        function pauseForQuestion(videoElement) {

            const popup = videoElement.parentElement.querySelector(".question-popup");

            if (videoElement.tagName.toLowerCase() === "video") {
                videoElement.pause();
            }

            popup.style.display = "flex";
        }

        function continueVideo(button) {

            const popup = button.parentElement;
            popup.style.display = "none";

            const container = popup.parentElement;

            const iframe = container.querySelector("iframe.youtube-video");
            const video = container.querySelector("video");

            if (iframe) {

                const player = players.find(p => p.getIframe() === iframe);

                if (player) {
                    player.playVideo();
                }

            } else if (video) {

                video.play();
            }
        }
   