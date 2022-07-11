<script lang="ts">
  export let component: any,
    placeholder = ''
  let show = false

  const toggleShow = () => (show = !show)
</script>

<div class="wrapper">
  {#if show}
    <svelte:component this={component} on:close={toggleShow} />
  {:else}
    <div class="placeholder" on:click={toggleShow}>{placeholder}</div>
  {/if}
</div>

<style lang="scss">
  .wrapper {
    cursor: text;
    margin: 0 auto;
    width: 30rem;
    border: 1px solid var(--theme-sep);
    border-radius: var(--rounded);
    box-shadow: var(--shadow);
  }

  .placeholder {
    padding: 0.5rem 1rem;
    color: var(--theme-fg-dim);
  }
</style>
