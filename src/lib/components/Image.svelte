<script lang="ts">
  export let src: string, alt: string
</script>

<div>
  <img {src} {alt} />
</div>

<style lang="scss">
  div {
    position: relative;
    border-radius: var(--rounded);
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
  }
</style>
