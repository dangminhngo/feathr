<script lang="ts">
  export let size: 'base' | 'lg' = 'base',
    variant: 'default' | 'primary' = 'default',
    stretch = false
</script>

<button class={`${size} ${variant}`} class:stretch on:click>
  <slot />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    padding: 0.375em 0.75em;
    border-radius: var(--rounded);
    font-weight: 500;
  }

  button.base {
    font-size: var(--text-sm);
  }

  button.lg {
    font-size: var(--text-base);
  }

  button.default {
    background-color: var(--theme-primary-50);
    color: var(--theme-primary-900);
  }

  button.primary {
    background-color: var(--clr-accent);
    color: var(--clr-white);
  }

  button.stretch {
    align-self: stretch;
    width: 100%;
    text-align: center;
  }
</style>
