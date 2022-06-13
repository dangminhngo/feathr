<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'

  export let name = ''
  export let width = 36,
    height = 36
</script>

<button on:click style="width: {width}px; height: {height}px;">
  <Icon class="icon" {name} />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;
  }

  button:hover {
    background-color: var(--theme-primary-700);
  }
</style>
