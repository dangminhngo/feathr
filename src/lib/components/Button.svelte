<script lang="ts">
  import { onMount } from 'svelte'

  export let size: 'base' | 'lg' = 'base',
    variant: 'default' | 'primary' | 'danger' = 'default',
    stretch = false,
    loading = false,
    disabled = false

  let buttonRef: HTMLButtonElement,
    width = 'auto',
    height = 'auto'

  onMount(() => {
    const rect = buttonRef.getBoundingClientRect()
    width = rect.width ? `${rect.width}px` : 'auto'
    height = rect.height ? `${rect.height}px` : 'auto'
  })
</script>

<button
  bind:this={buttonRef}
  class={`${size} ${variant}`}
  class:stretch
  style="width: {width}; height: {height};"
  {disabled}
  on:click|stopPropagation
>
  {#if loading}
    <span class="dot">&nbsp;</span>
    <span class="dot">&nbsp;</span>
    <span class="dot">&nbsp;</span>
  {:else}
    <slot />
  {/if}
</button>

<style lang="scss">
  button {
    cursor: pointer;
    padding: 0.375em 0.75em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
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
    background-color: var(--theme-fg);
    color: var(--theme-bg);
  }

  button.primary {
    background-color: var(--theme-accent, var(--clr-accent));
    color: var(--theme-fg, var(--clr-primary-200));
  }

  button.danger {
    background-color: var(--theme-danger);
    color: var(--theme-fg);
  }

  button.stretch {
    align-self: stretch;
    width: 100%;
    text-align: center;
  }

  .dot {
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: currentColor;
    animation-name: blink;
    animation-duration: 0.75s;
    animation-iteration-count: infinite;
  }

  .dot:nth-child(1) {
    animation-delay: 0;
  }

  .dot:nth-child(2) {
    animation-delay: 0.125s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.25s;
  }

  @keyframes blink {
    0% {
      opacity: 0.25;
    }

    100% {
      opacity: 1;
    }
  }
</style>
