<script lang="ts">
  import { getContext } from 'svelte'
  import Button from '$lib/components/Button.svelte'
  import ModalWrapper from './ModalWrapper.svelte'
  import SelectedThemeCircle from './SelectedThemeCircle.svelte'
  import { uiState } from '$lib/state'
  import presets from '$lib/data/themes.json'
  import { themeKey } from '$lib/consts'

  const { getTheme, setTheme } = getContext(themeKey)
  let currentThemeName = getTheme().name

  const { closeAllModals, notify } = uiState
  const handleModalClose = () => {
    closeAllModals()
  }

  const handleSubmit = () => {
    closeAllModals()
    if (currentThemeName !== getTheme().name) {
      setTheme(currentThemeName)
      notify(`Theme ${currentThemeName} has been applied`)
    }
  }
</script>

{#if $uiState.modal.themes}
  <ModalWrapper title="Themes" handleClose={handleModalClose}>
    <div class="wrapper">
      <p>Choose your theme</p>
      <div class="grid">
        {#each presets as preset (preset.name)}
          <SelectedThemeCircle bind:group={currentThemeName} name="theme" theme={preset} />
        {/each}
      </div>
      <Button on:click={handleSubmit}>Save</Button>
    </div>
  </ModalWrapper>
{/if}

<style lang="scss">
  .wrapper {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
  }

  p {
    align-self: flex-start;
    font-size: var(--text-sm);
    color: var(--theme-fg-dim);
  }

  .grid {
    align-self: stretch;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
  }
</style>
