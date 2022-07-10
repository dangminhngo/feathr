<script lang="ts">
  export let url: string, email: string
</script>

<button on:click>
  <img src={url} alt={email} />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    width: var(--button-size);
    height: var(--button-size);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;
  }

  button:hover {
    background-color: var(--theme-primary-700);
  }

  img {
    pointer-events: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
  }
</style>
