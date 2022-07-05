<script lang="ts">
  let input: HTMLDivElement

  export let name = 'Field',
    value = '',
    placeholder = ''

  export const focus = () => {
    input?.focus()
  }
</script>

<div class="field">
  <span class="name">{name}</span>
  <div class="content-editable">
    <div class="content" contenteditable="true" bind:this={input} bind:textContent={value} />
    {#if !value}
      <div class="placeholder">{placeholder}</div>
    {/if}
  </div>
</div>

<style lang="scss">
  .field {
    display: flex;
    flex-direction: column;
  }

  .name {
    margin-bottom: 0.375rem;
    font-size: var(--text-xs);
    font-weight: 500;
  }

  .content-editable {
    position: relative;
    padding: 0.5rem 1rem;
    width: 100%;
    border: 1px solid hsla(0, 100%, 100%, 0.15);
    border-radius: var(--rounded);
    font-size: var(--text-sm);

    .content {
      outline: none;
    }

    .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0.5rem 1rem;
      pointer-events: none;
      color: var(--theme-primary-500);
    }
  }
</style>
