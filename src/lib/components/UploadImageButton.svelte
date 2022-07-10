<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
</script>

<div>
  <input name="file" id="file" type="file" multiple on:change />
  <label for="file">
    <Icon name="picture" size={18} />
  </label>
</div>

<style lang="scss">
  label {
    cursor: pointer;
    width: 1.75rem;
    height: 1.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    background-color: var(--theme-icon-button-bg);
    color: var(--theme-icon-button-fg);
    transition: all 0.15s ease-out;
  }

  label:hover {
    background-color: var(--theme-icon-button-bg-hover);
    color: var(--theme-icon-button-fg-hover);
  }

  input {
    display: none;
  }
</style>
