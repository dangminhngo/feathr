<script lang="ts">
  import { page } from '$app/stores'
  import Icon from '$lib/components/Icon.svelte'
  import { uiState } from '$lib/state'

  const items = [
    {
      icon: 'feather',
      label: 'Notes',
      path: '/app/notes',
    },
    {
      icon: 'list',
      label: 'Lists',
      path: '/app/lists',
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

<nav class:grow={$uiState.navGrow}>
  {#each items as { icon, label, path }}
    <a
      class="nav-link"
      class:active={$page.url.pathname === path}
      class:danger={label === 'Trash'}
      href={path}
    >
      <div class="icon">
        <Icon name={icon} />
      </div>
      <span class="label">{label}</span>
    </a>
  {/each}
</nav>

<style lang="scss">
  nav {
    min-width: var(--sidenav-width);
    height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: var(--theme-nav-bg);
    color: var(--theme-nav-fg);
    transition: min-width 0.15s ease-out;
  }

  nav.grow {
    min-width: var(--sidenav-grow-width);
  }

  .nav-link,
  .nav-link:link,
  .nav-link:visited {
    padding-left: 2rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    transition: all 0.15s ease-out;

    &:hover {
      background-color: var(--theme-nav-bg-hover);
      color: var(--theme-nav-fg-hover);
    }

    &.active {
      background-color: var(--theme-nav-bg-active);
      color: var(--theme-nav-fg-active);
    }

    &.danger {
      color: var(--theme-danger);
    }
  }

  nav.grow > .nav-link,
  nav.grow > .nav-link:link,
  nav.grow > .nav-link:visited {
    padding-left: 2rem;
  }

  .label {
    display: none;
    font-size: var(--text-sm);
    font-weight: 500;
    transition-delay: 0.125s;
  }

  nav.grow .label {
    display: block;
  }
</style>
