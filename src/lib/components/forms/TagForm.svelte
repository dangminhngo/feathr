<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte'
  import Button from '$lib/components/Button.svelte'
  import Field from '$lib/components/Field.svelte'
  import firestore from '$lib/firebase/firestore'
  import { createEmptyTag, getItemById, isEmptyTag } from '$lib/helpers'
  import { uiState, tagsState } from '$lib/state'
  import type { Tag } from '$lib/types'

  let tag = createEmptyTag(),
    labelField: Field
  const editingTag = getItemById<Tag>($tagsState.tags, $tagsState.currentTagId)
  if (editingTag) tag = { ...editingTag }

  const { closeAllModals } = uiState
  const { setCurrentTag, addTag, updateTag } = tagsState
  const dispatch = createEventDispatcher()

  const handleSubmit = async () => {
    dispatch('close')
    if (isEmptyTag(tag)) return
    if (editingTag) {
      await firestore.updateTag(tag)
      updateTag(tag.id, tag)
    } else {
      await firestore.addTag(tag)
      addTag(tag)
    }
    setCurrentTag('')
    closeAllModals()
  }

  onMount(() => {
    labelField?.focus()
  })
</script>

<div class="form">
  <Field bind:this={labelField} name="Label" placeholder="Label" bind:value={tag.label} />
  <div class="actions">
    <Button on:click={handleSubmit}>{tag.label ? 'Save' : 'Close'}</Button>
  </div>
</div>

<style lang="scss">
  .form {
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
    border-radius: var(--rounded);
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: var(--theme-primary-300);
  }
</style>
