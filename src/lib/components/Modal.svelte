<script lang="ts">
  import Portal from 'svelte-portal/src/Portal.svelte'
</script>

<Portal target="body">
  <div class="backdrop">&nbsp;</div>
  <slot />
</Portal>

<style lang="scss">
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: hsla(0, 0%, 0%, 0.2);
  }
</style>
