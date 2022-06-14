<button class="menu-button" on:click>
  <div>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
    <span>&nbsp;</span>
  </div>
</button>

<style lang="scss">
  .menu-button {
    cursor: pointer;
    width: var(--button-height);
    height: var(--button-height);
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
      width: 1.25rem;
      height: 0.75rem;
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
      top: 5px;
    }

    span:nth-child(3) {
      top: 10px;
    }
  }
</style>
