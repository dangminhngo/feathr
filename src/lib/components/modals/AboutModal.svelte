<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import ModalWrapper from './ModalWrapper.svelte'
  import { uiState } from '$lib/state'

  const { closeAllModals } = uiState
  const handleModalClose = () => {
    closeAllModals()
  }
</script>

{#if $uiState.modal.about}
  <ModalWrapper width={40} title="About Feathr" handleClose={handleModalClose}>
    <div class="wrapper">
      <div class="left">
        <p>
          Feathr is a note-taking web application built by <a
            href="https://jadnw.github.io"
            target="_blank">Jaden Wu</a
          >
        </p>
        <p style="margin-top: 2em;">Get in touch</p>
        <p>Website: https://jadnw.github.io</p>
        <p>Email: jadenwu137@protonmail.com</p>
        <p>Twitter: @jadnw</p>
      </div>
      <div class="right">
        <Icon name="logo" size={96} />
      </div>
    </div>
  </ModalWrapper>
{/if}

<style lang="scss">
  .wrapper {
    padding: 1rem;
    display: flex;
    gap: 1rem;
    color: var(--theme-primary-300);
  }

  .left {
    line-height: 180%;
  }

  .right {
    align-self: center;
    padding: 2rem;
  }

  a:link,
  a:visited,
  a:active {
    color: var(--theme-accent-light);
    font-weight: 600;
  }
</style>
