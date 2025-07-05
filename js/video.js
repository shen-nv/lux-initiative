document.querySelectorAll('.player').forEach(player => {
      const video = player.querySelector('.video');
      const playPause = player.querySelector('.playPause');
      const progressBar = player.querySelector('.progress');
      const progressFill = player.querySelector('.progress-fill');
      const timeDisplay = player.querySelector('.time');
      const muteBtn = player.querySelector('.muteBtn');
      const fullscreenBtn = player.querySelector('.fullscreenBtn');

      function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
      }

      playPause.onclick = () => {
        if (video.paused) {
          video.play();
          playPause.innerHTML = "<strong>||</strong>";
        } else {
          video.pause();
          playPause.innerHTML = "<strong>></strong>";
        }
      };

      video.ontimeupdate = () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressFill.style.width = percent + '%';
        timeDisplay.textContent = `${formatTime(video.currentTime)} / ${formatTime(video.duration)}`;
      };

      progressBar.onclick = (e) => {
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const ratio = x / rect.width;
        video.currentTime = ratio * video.duration;
      };

      muteBtn.onclick = () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? "<strong>X</strong>" : "<strong>M</strong>";
      };

      fullscreenBtn.onclick = () => {
        const isFullscreen = document.fullscreenElement === player || document.webkitFullscreenElement === player;
        if (isFullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        } else {
          if (player.requestFullscreen) {
            player.requestFullscreen();
          } else if (player.webkitRequestFullscreen) {
            player.webkitRequestFullscreen();
          }
        }
      };

      video.onloadedmetadata = () => {
        timeDisplay.textContent = `00:00 / ${formatTime(video.duration)}`;
      };
    });