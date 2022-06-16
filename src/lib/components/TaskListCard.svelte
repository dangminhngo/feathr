<script lang="ts">
  import IconButton from '$lib/components/IconButton.svelte'
  import type { TaskList } from '$lib/types'
  export let taskList: TaskList, handlePinned: () => void, handleDelete: () => void
  let buttonsShow = false

  const handleMouseEnter = () => (buttonsShow = true)
  const handleMouseLeave = () => (buttonsShow = false)
</script>

<div class="task-list" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave} on:click>
  <div class="title">{taskList.title}</div>
  <div class="buttons">
    <div class="left" class:pinned={taskList.pinned} class:show={buttonsShow}>
      <IconButton
        size="sm"
        name={taskList.pinned ? 'pinFull' : 'pin'}
        active={taskList.pinned}
        on:click={handlePinned}
      />
    </div>
    <div class="right" class:show={buttonsShow}>
      <IconButton size="sm" name="picture" />
      <IconButton size="sm" name="tags" />
      <IconButton size="sm" name="brush" />
      <IconButton size="sm" name="delete" on:click={handleDelete} />
    </div>
  </div>
</div>

<style lang="scss">
  .task-list {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    border: 1px solid var(--theme-primary-600);
    border-radius: var(--rounded);
  }

  .title {
    font-weight: 500;
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.15s ease-out;
  }

  .left.pinned {
    opacity: 1;
    pointer-events: all;
  }

  .left.show,
  .right.show {
    opacity: 1;
    pointer-events: all;
  }

  .left,
  .right {
    display: flex;
    align-items: center;
    color: var(--theme-primary-400);
    opacity: 0;
    pointer-events: none;
  }
</style>
