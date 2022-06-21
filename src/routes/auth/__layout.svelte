<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
</script>

<section>
  <a href="/" class="logo">
    <Icon name="logo" width={80} height={80} />
  </a>
  <slot />
</section>

<style lang="scss">
  :global(body) {
    background-color: var(--clr-primary-900);
    color: var(--clr-primary-200);
  }

  section {
    margin-top: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
