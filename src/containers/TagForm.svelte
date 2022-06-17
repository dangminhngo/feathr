<script>
  import ContentEditable from '$lib/components/ContentEditable.svelte'
  import { createEmptyTag, clickOutside } from '$lib/helpers'
  import { tagsStore } from '$lib/stores'

  let tag = createEmptyTag()

  const { addTag, updateTag } = tagsStore

  const handleSubmit = () => {
    if (!tag.label) return
    addTag(tag)
  }
</script>

<div class="form" use:clickOutside on:outsideclick={handleSubmit}>
  <ContentEditable placeholder="Add a tag..." bind:value={tag.label} />
  {#if tag.label}
    <button class="close-button" on:click={handleSubmit}>Save</button>
  {/if}
</div>

<style lang="scss">
  .form {
    position: relative;
    margin: 0 auto;
    padding: 0 1rem;
    width: 30rem;
    border: 1px solid var(--theme-primary-600);
    border-radius: var(--rounded);
  }

  .close-button {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 0.5rem;
    height: 100%;
    border-radius: var(--rounded);
    font-size: var(--text-sm);
    color: var(--theme-primary-400);
    transition: all 0.15s ease-out;

    &:hover {
      background-color: var(--theme-primary-700);
    }
  }
</style>
