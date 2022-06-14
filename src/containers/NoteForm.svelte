<script lang="ts">
  import ContentEditable from '$/lib/components/ContentEditable.svelte'
  import IconButton from '$lib/components/IconButton.svelte'
  let title = '',
    body = ''

  $: console.log(title, body)
</script>

<div class="form">
  <ContentEditable placeholder="Title" value={title} />
  <hr class="sep" />
  <ContentEditable size="sm" placeholder="Body" value={body} />
  <div class="actions">
    <div class="left">
      <IconButton name="pin" size="md" />
    </div>
    <div class="right">
      <IconButton name="picture" size="md" />
      <IconButton name="tags" size="md" />
      <IconButton name="brush" size="md" />
      <IconButton name="delete" size="md" />
    </div>
  </div>
</div>

<style lang="scss">
  .form {
    padding: 0 1rem;
    width: 100%;
    border: 1px solid var(--theme-primary-500);
    border-radius: var(--rounded);
  }

  .title,
  .body {
    position: relative;
    padding: 0.75rem 0;

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

  .body {
    font-size: var(--text-sm);
  }

  .sep {
    border-color: var(--theme-primary-700);
  }

  .actions {
    padding-top: 0.5rem;
    padding-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--theme-primary-400);
  }

  .left,
  .right {
    display: flex;
    align-items: center;
  }
</style>
