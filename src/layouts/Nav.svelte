<script lang="ts">
  import { page } from '$app/stores'
  import { uiStore } from '$lib/stores'
  import Icon from '$lib/components/Icon.svelte'

  const items = [
    {
      icon: 'feather',
      label: 'Notes',
      path: '/app/notes',
    },
    {
      icon: 'taskList',
      label: 'Tasks',
      path: '/app/tasks',
    },
    {
      icon: 'tags',
      label: 'Tags',
      path: '/app/tags',
    },
    {
      icon: 'trash',
      label: 'Trash',
      path: '/app/trash',
    },
  ]
</script>

<nav class:grow={$uiStore.navGrow}>
  {#each items as { icon, label, path }}
    <a class:active={$page.url.pathname === path} href={path}>
      <span>
        <Icon name={icon} />
      </span>
      <span>{label}</span>
    </a>
  {/each}
</nav>

<style lang="scss">
  nav {
    padding: 0.25rem 0;
    min-width: 5rem;
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: transparent;
    transition: background-color 0.25s ease-out, min-width 0.15s ease-out;

    &.grow {
      min-width: var(--sidenav-width);
      background-color: var(--theme-primary-800);
    }

    &.grow > a,
    &.grow > a:link,
    &.grow > a:visited {
      margin: 0;
      padding: 0.25rem 1.5rem;
    }

    &.grow > a > span:nth-child(2) {
      display: block;
    }

    a,
    a:link,
    a:visited {
      margin: 0 1.125rem;
      padding: 0.25rem;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      border-radius: var(--rounded);
      color: var(--theme-primary-300);
      font-size: var(--text-sm);
      font-weight: 500;
      transition: background-color 0.15s ease-out;
    }

    a span:first-child {
      padding: 0.5rem;
    }

    a span:nth-child(2) {
      display: none;
    }

    a:hover {
      background-color: var(--theme-primary-700);
      color: var(--theme-primary-50);
    }

    a.active {
      background-color: var(--theme-accent);
      color: var(--theme-primary-50);
    }
  }
</style>
