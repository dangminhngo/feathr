<button class="hamburger" on:click>
  <div>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
  </div>
</button>

<style lang="scss">
  .hamburger {
    cursor: pointer;
    width: var(--button-size);
    height: var(--button-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;

    &:hover {
      background-color: var(--theme-primary-800);
    }

    div {
      position: relative;
      width: 1.125rem;
      height: 0.875rem;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      display: block;
      background-color: var(--theme-primary-200);
      transition: all 0.15s ease-out;
    }

    span:nth-child(1) {
      top: 0;
    }

    span:nth-child(2) {
      top: 6px;
    }

    span:nth-child(3) {
      top: 12px;
    }
  }
</style>
