<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let name = '',
    size: 'lg' | 'md' | 'sm' = 'lg',
    variant: 'none' | 'base' = 'base',
    active = false,
    disabled = false

  const getIconSize = (size: 'lg' | 'md' | 'sm'): number => (size === 'lg' ? 20 : 18)
</script>

<button
  class:lg={size === 'lg'}
  class:md={size === 'md'}
  class:sm={size === 'sm'}
  class:none={variant === 'none'}
  class:active
  {disabled}
  on:click|stopPropagation
>
  <Icon {name} size={getIconSize(size)} />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    background-color: var(--theme-icon-button-bg);
    color: var(--theme-icon-button-fg);
    transition: all 0.15s ease-out;
  }

  button.lg {
    width: 2.25rem;
    height: 2.25rem;
  }

  button.md {
    width: 1.875rem;
    height: 1.875rem;
  }

  button.sm {
    width: 1.5rem;
    height: 1.5rem;
  }

  button.active {
    color: var(--theme-accent);
  }

  button:hover {
    background-color: var(--theme-icon-button-bg-hover);
    color: var(--theme-icon-button-fg-hover);
  }

  button.none {
    background-color: transparent;
    color: inherit;
  }
</style>
