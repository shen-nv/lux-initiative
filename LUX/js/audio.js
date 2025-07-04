function setupAudioPlayer(id) {
  const audio = document.getElementById(`audio_${id}`);
  const playPauseBtn = document.getElementById(`play-pause_${id}`);
  const muteBtn = document.getElementById(`mute-unmute_${id}`);
  const progress = document.getElementById(`progress_${id}`);
  const timeDisplay = document.getElementById(`time_${id}`);

  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '<strong>||</strong>';
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '<strong>></strong>';
    }
  });

  muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    muteBtn.innerHTML = audio.muted ? '<strong>X</strong>' : '<strong>M</strong>';
  });

  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    progress.value = percent;

    const format = (s) => `0${Math.floor(s)}`.slice(-2);
    const current = format(audio.currentTime);
    const duration = format(audio.duration || 15);
    timeDisplay.textContent = `${current} / ${duration}`;
  });

  progress.addEventListener('input', () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
  });
}

[1, 2, 3].forEach(setupAudioPlayer);
