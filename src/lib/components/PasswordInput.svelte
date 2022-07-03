<script lang="ts">
  export let label = '',
    placeholder = '',
    value = '',
    error = ''
</script>

<div>
  <label for={label}>{label}</label>
  <input
    type="password"
    id={label}
    style="border-color: {error ? 'var(--clr-danger)' : 'var(--clr-primary-600)'};"
    {placeholder}
    bind:value
  />
  {#if error}
    <span>{error}</span>
  {/if}
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  label {
    color: var(--clr-primary-300);
    font-size: var(--text-sm);
  }

  input {
    padding: 0.5rem 1rem;
    background-color: var(--clr-primary-700);
    border-width: 1px;
    border-style: solid;
    border-radius: var(--rounded);
  }

  input:focus {
    border-color: var(--clr-accent);
  }

  span {
    color: var(--clr-danger);
    font-size: var(--text-2xs);
  }
</style>
