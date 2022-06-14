<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte'
  let title = '',
    body = ''

  $: console.log(title, body)
</script>

<div class="form">
  <form>
    <div class="title">
      <div class="content" contenteditable="true" bind:textContent={title} />
      {#if !title}
        <div class="placeholder">Title</div>
      {/if}
    </div>
    <hr class="sep" />
    <div class="body">
      <div class="content" contenteditable="true" bind:textContent={body} />
      {#if !body}
        <div class="placeholder">Body</div>
      {/if}
    </div>
  </form>
  <div class="actions">
    <div class="left">
      <IconButton name="pin" size="sm" />
    </div>
    <div class="right">
      <IconButton name="picture" size="sm" />
      <IconButton name="tags" size="sm" />
      <IconButton name="brush" size="sm" />
      <IconButton name="delete" size="sm" />
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

  form {
    display: flex;
    flex-direction: column;
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
