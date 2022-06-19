<script>
  import Button from '$lib/components/Button.svelte'
  import Field from '$lib/components/Field.svelte'
  import { createEmptyTag } from '$lib/helpers'
  import { tagsStore } from '$lib/stores'

  let tag = createEmptyTag()

  const { addTag } = tagsStore

  const handleSubmit = () => {
    if (!tag.label) return
    addTag(tag)
  }
</script>

<div class="form">
  <Field placeholder="Add a tag..." bind:value={tag.label} />
  {#if tag.label}
    <Button on:click={handleSubmit}>Save</Button>
  {/if}
</div>

<style lang="scss">
  .form {
    margin: 0 auto;
    padding-left: 1rem;
    width: 30rem;
    display: flex;
    align-items: stretch;
    border: 1px solid var(--theme-primary-600);
    border-radius: var(--rounded);
  }
</style>
