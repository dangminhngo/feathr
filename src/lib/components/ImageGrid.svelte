<script lang="ts">
  export let cols = 1
</script>

<div style="grid-template-columns: repeat({cols}, 1fr);">
  <slot />
</div>

<style lang="scss">
  div {
    display: grid;
    align-content: start;
    gap: 0.25rem;
  }
</style>
