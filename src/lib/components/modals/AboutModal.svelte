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
        <p>Feathr is a note-taking web application built with Sveltekit, Firebase.</p>
        <p>
          Your notes is stored on cloud database and you can easily switch between multiple devices
          without breaking your ideas.
        </p>
        <div class="contact">
          <p>Get in touch</p>
          <p>
            Website: <a href="https://jadnw.github.io" target="_blank">https://jadnw.github.io</a>
          </p>
          <p>Email: <a href="mailto:jadenwu137@protonmail.com">jadenwu137@protonmail.com</a></p>
          <p>Twitter: <a href="https://twitter.com/jadnw">@jadnw</a></p>
        </div>
      </div>
      <div class="right">
        <Icon name="logo" size={128} />
      </div>
    </div>
  </ModalWrapper>
{/if}

<style lang="scss">
  .wrapper {
    padding: 1rem;
    display: flex;
    gap: 6rem;
    color: var(--theme-primary-300);
  }

  .left {
    line-height: 180%;
    flex: 1;
  }

  .right {
    flex: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a:link,
  a:visited,
  a:active {
    color: var(--theme-accent-light);
  }

  .contact {
    padding-top: 2rem;
  }

  .contact p {
    font-size: var(--text-sm);
    font-weight: 500;
  }
</style>
