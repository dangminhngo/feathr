<button on:click>
  <slot />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    padding: 0 1rem;
    min-height: 2rem;
    border-radius: var(--rounded);
    font-size: var(--text-sm);
    font-weight: 700;
    background-color: var(--theme-primary-50);
    color: var(--theme-primary-900);
  }
</style>
