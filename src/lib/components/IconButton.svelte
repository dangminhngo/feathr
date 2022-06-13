<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let name = ''
</script>

<button {...$$props}>
  <Icon class="icon" {name} />
</button>

<style lang="scss">
  button {
  }

  button:hover {
    background-color: var(--theme-buttonHoverBg);
  }
</style>
