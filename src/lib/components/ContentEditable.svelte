<script lang="ts">
  let input: HTMLDivElement

  export let editable = true,
    size: 'lg' | 'sm' = 'lg',
    value = '',
    placeholder = ''

  export function focus() {
    input.focus()
  }
</script>

<div class="content-editable" class:lg={size === 'lg'} class:sm={size === 'sm'}>
  {#if editable}
    <div
      class="content"
      contenteditable="true"
      bind:this={input}
      bind:textContent={value}
      on:input
    />
  {:else}
    <div class="content">{value}</div>
  {/if}
  {#if !value}
    <div class="placeholder">{placeholder}</div>
  {/if}
</div>

<style lang="scss">
  .content-editable {
    position: relative;
    padding: 0.75rem 0;
    width: 100%;
    font-weight: 500;

    .content {
      outline: none;
    }

    .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.75rem 0;
      pointer-events: none;
      color: var(--theme-primary-400);
    }
  }

  .content-editable.lg {
    font-size: var(--text-md);
    font-weight: 500;
  }

  .content-editable.sm {
    font-size: var(--text-sm);
  }
</style>
