<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let name = '',
    size: 'lg' | 'md' | 'sm' = 'lg',
    active = false

  const iconSize = size !== 'sm' ? 20 : 18
</script>

<button
  class:lg={size === 'lg'}
  class:md={size === 'md'}
  class:sm={size === 'sm'}
  class:active
  on:click|stopPropagation
>
  <Icon class="icon" {name} width={iconSize} height={iconSize} />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    transition: color 0.15s ease-out;
  }

  button.lg {
    width: 2.25rem;
    height: 2.25rem;
  }

  button.md {
    width: 2rem;
    height: 2rem;
  }

  button.sm {
    width: 1.75rem;
    height: 1.75rem;
  }

  button.active {
    color: var(--theme-accent);
  }

  button:hover {
    color: var(--theme-accent);
  }
</style>
