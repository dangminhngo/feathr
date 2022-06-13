<script lang="ts">
  let open = false

  const toggle = () => (open = !open)
</script>

<header class="header">
  <button class="menu-button" class:open on:click={toggle}>
    <div>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
    </div>
  </button>
</header>

<style lang="scss">
  .header {
    padding: 1rem 4rem;
  }

  .menu-button {
    cursor: pointer;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      position: relative;
      width: 1.5rem;
      height: 1rem;
    }

    span {
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      display: block;
      background-color: var(--theme-fg);
      transition: all 0.15s ease-out;
    }

    span:nth-child(1) {
      top: 0;
    }

    &.open span:nth-child(1) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    &.open span:nth-child(2) {
      transform: translateX(-1rem);
      opacity: 0;
    }

    span:nth-child(2) {
      top: 7px;
    }

    span:nth-child(3) {
      top: 14px;
    }

    &.open span:nth-child(3) {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
</style>
