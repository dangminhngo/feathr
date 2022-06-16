<script lang="ts">
  import Portal from 'svelte-portal/src/Portal.svelte'
  export let width = 30
</script>

<Portal target="body">
  <div class="backdrop">&nbsp;</div>
  <div class="wrapper" style="width: {width}rem;"><slot /></div>
</Portal>

<style lang="scss">
  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: hsla(0, 0%, 0%, 0.6);
  }

  .wrapper {
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: var(--theme-primary-900);
  }
</style>
