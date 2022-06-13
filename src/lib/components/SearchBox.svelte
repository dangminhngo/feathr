<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  export let value = '',
    placeholder = ''
</script>

<form>
  <input type="text" bind:value {placeholder} />
  <Icon class="icon" name="search" />
</form>

<style lang="scss">
  form {
    position: relative;
  }

  form :global(.icon) {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    display: block;
    color: var(--theme-searchBoxPlaceholderFg);
  }

  input {
    padding-left: 1rem;
    width: 20rem;
    height: var(--input-height);
    border-radius: var(--rounded);
    background-color: var(--theme-searchBoxBg);
    color: var(--theme-searchBoxFg);

    &::placeholder {
      color: var(--theme-searchBoxPlaceholderFg);
    }
  }
</style>
