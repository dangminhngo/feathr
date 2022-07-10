<script lang="ts">
  import { quintOut } from 'svelte/easing'
  import { fade, scale } from 'svelte/transition'
  import Portal from 'svelte-portal/src/Portal.svelte'
  import Button from './Button.svelte'

  export let width = 30

  interface Action {
    func: ((...args: any[]) => void) | null
    params: any[] | null
  }
  let action: Action = {
      func: null,
      params: null,
    },
    showDialog = false

  const confirm = (func: (...args: any[]) => void, ...params: any[]) => {
    action = { func, params }
    showDialog = true
  }

  const handleConfirm = () => {
    if (!action.func) {
      throw new Error('No action to confirm')
    }

    action.func(action.params)
    showDialog = false
  }

  const handleCancel = () => {
    action = {
      func: null,
      params: null,
    }
    showDialog = false
  }
</script>

<slot {confirm} />

{#if showDialog}
  <Portal target="body">
    <div class="backdrop" transition:fade={{ duration: 150 }} on:click={handleCancel}>&nbsp;</div>
    <div
      class="wrapper"
      transition:scale={{ duration: 350, easing: quintOut }}
      style="width: {width}rem;"
    >
      <div>
        <p class="message">
          <slot name="message">Are you sure to complete this action?</slot>
        </p>
        <p class="desc">
          <slot name="description">This action cannot be undone.</slot>
        </p>
      </div>
      <div class="buttons">
        <Button on:click={handleCancel}>
          <slot name="cancel">Cancel</slot>
        </Button>
        <Button variant="danger" on:click={handleConfirm}>
          <slot name="confirm">Confirm</slot>
        </Button>
      </div>
    </div>
  </Portal>
{/if}

<style lang="scss">
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--theme-backdrop);
  }

  .wrapper {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    border-radius: var(--rounded);
    background-color: var(--theme-bg);
    color: var(--theme-fg);
    box-shadow: var(--shadow);
    overflow: hidden;
  }

  .desc {
    margin-top: 0.5rem;
    font-size: var(--text-sm);
    color: var(--theme-fg-dim);
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
