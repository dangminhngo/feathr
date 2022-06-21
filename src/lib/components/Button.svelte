<script lang="ts">
  export let variant: 'default' | 'primary' = 'default',
    stretch = false
</script>

<button class={variant} class:stretch on:click>
  <slot />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    padding: 0.5rem 1rem;
    border-radius: var(--rounded);
    font-weight: 700;
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
