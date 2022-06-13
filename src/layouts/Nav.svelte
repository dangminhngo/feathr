<script lang="ts">
  import layoutStore from '$lib/stores/layout'
  import Icon from '$lib/components/Icon.svelte'

  const items = [
    {
      icon: 'feather',
      label: 'Notes',
    },
    {
      icon: 'taskList',
      label: 'Tasks',
    },
    {
      icon: 'tags',
      label: 'Tags',
    },
    {
      icon: 'trash',
      label: 'Trash',
    },
  ]
</script>

<div class="navigation" class:shrink={$layoutStore.navShrink}>
  {#each items as { icon, label }}
    <a href="/">
      <span>
        <Icon name={icon} />
      </span>
      <span>{label}</span>
    </a>
  {/each}
</div>

<style lang="scss">
  .navigation {
    padding: 0.25rem 0;
    width: var(--sidenav-width);
    height: calc(100vh - 4rem);
    background-color: var(--theme-primary-800);
    transition: width 0.25s ease-out;

    &.shrink {
      width: 5.25rem;
      background-color: transparent;
    }

    &.shrink > a,
    &.shrink > a:link,
    &.shrink > a:visited {
      margin: 0 1.125rem;
      padding: 0.375rem;
      border-radius: var(--rounded);
    }

    &.shrink > a > span:nth-child(2) {
      display: none;
    }

    a,
    a:link,
    a:visited {
      padding: 0.375rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      color: var(--theme-primary-300);
      transition: background-color 0.15s ease-out;
    }

    a span:first-child {
      padding: 0.5rem;
    }

    a:hover {
      background-color: var(--theme-primary-700);
      color: var(--theme-primary-100);
    }
  }
</style>
