<div class="bar">
  <div class="indicator">&nbsp;</div>
</div>

<style lang="scss">
  .bar {
    width: 100%;
    height: 0.25rem;
    background-color: var(--theme-primary-600);
    border-radius: var(--rounded-full);
    overflow: hidden;
  }

  .indicator {
    width: 50%;
    height: 100%;
    background-color: var(--theme-accent);
    border-radius: var(--rounded-full);
    transform-origin: 0 0;
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
  }

  @keyframes loading {
    0% {
      transform: translateX(-100%) scaleX(50%);
    }

    50% {
      transform: translateX(0%) scaleX(100%);
    }

    100% {
      transform: translateX(100%) scaleX(100%);
    }

    100% {
      transform: translateX(200%) scaleX(50%);
    }
  }
</style>
