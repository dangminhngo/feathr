<script lang="ts">
  import { onMount } from 'svelte'
  import { quintOut } from 'svelte/easing'
  import { slide } from 'svelte/transition'
  import Portal from 'svelte-portal/src/Portal.svelte'
  import { uiState } from '$lib/state'

  const { dismiss } = uiState

  onMount(() => {
    console.log('mounted')
    const timeout = setTimeout(() => {
      dismiss()
    }, 2000)
    console.log(timeout)

    return () => clearTimeout(timeout)
  })
</script>

<Portal target="body">
  <div
    transition:slide={{ duration: 250, easing: quintOut }}
    class="notification"
    class:error={$uiState.notification?.error}
  >
    <p>{$uiState.notification?.message}</p>
    <button on:click={dismiss}> Dismiss </button>
  </div>
</Portal>

<style lang="scss">
  .notification {
    position: fixed;
    left: 2rem;
    bottom: 2rem;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
    min-width: 25vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: var(--rounded);
    background-color: var(--theme-primary-800);
    box-shadow: var(--shadow);
  }

  .notification.error {
    color: var(--clr-danger);
  }

  button {
    cursor: pointer;
    padding: 0.25rem;
    border-radius: var(--rounded);
    color: var(--theme-accent);
    font-weight: 600;
  }
</style>
