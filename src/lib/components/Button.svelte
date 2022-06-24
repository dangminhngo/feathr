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
    transition: background-color 0.15s ease-out;
  }

  button.base {
    font-size: var(--text-sm);
  }

  button.lg {
    font-size: var(--text-base);
  }

  button.default {
    background-color: var(--theme-primary-300);
    color: var(--theme-primary-900);
  }

  button.default:hover {
    background-color: var(--theme-primary-50);
  }

  button.primary {
    background-color: var(--clr-accent);
    color: var(--clr-white);
  }

  button.primary:hover {
    background-color: var(--clr-accent-light);
  }

  button.stretch {
    align-self: stretch;
    width: 100%;
    text-align: center;
  }
</style>
