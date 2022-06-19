<script lang="ts">
  import { getContext } from 'svelte'
  import Button from '$lib/components/Button.svelte'
  import ModalWrapper from './ModalWrapper.svelte'
  import SelectedThemeCircle from './SelectedThemeCircle.svelte'
  import { uiStore } from '$lib/stores'
  import { presets, themeKey } from '$lib/consts'

  const { getTheme, setTheme } = getContext(themeKey)
  let currentThemeName = getTheme().name

  const { closeAllModals } = uiStore
  const handleModalClose = () => {
    closeAllModals()
  }

  const handleSubmit = () => {
    setTheme(currentThemeName)
    closeAllModals()
  }
</script>

{#if $uiStore.modal.themes}
  <ModalWrapper handleBackdropClick={handleModalClose}>
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
    gap: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 0.5rem;
  }
</style>
