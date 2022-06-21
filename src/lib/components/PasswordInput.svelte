<script lang="ts">
  export let label = '',
    placeholder = '',
    value = ''
</script>

<div>
  <span>{label}</span>
  <input type="password" {placeholder} {value} />
</div>

<style lang="scss">
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  span {
    color: var(--clr-primary-300);
    font-size: var(--text-sm);
  }

  input {
    padding: 0.5rem 1rem;
    background-color: var(--clr-primary-700);
    border: 1px solid var(--clr-primary-600);
    border-radius: var(--rounded);
  }

  input:focus {
    border-color: var(--clr-accent);
  }
</style>
