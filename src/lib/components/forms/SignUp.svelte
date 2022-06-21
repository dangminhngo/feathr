<script lang="ts">
  import TextInput from '$lib/components/TextInput.svelte'
  import PasswordInput from '$lib/components/PasswordInput.svelte'
  import Button from '$lib/components/Button.svelte'

  let email = '',
    password = ''
</script>

<form>
  <TextInput label="Email" placeholder="Enter your email" bind:value={email} />
  <PasswordInput label="Password" placeholder="Enter your password" bind:value={password} />
  <Button size="lg" variant="primary" stretch={true} on:click={() => console.log('Sign Up')}
    >Sign up</Button
  >
</form>

<style lang="scss">
  form {
    padding: 1.5rem 1rem;
    width: 24rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
    background-color: var(--clr-primary-800);
    border-radius: var(--rounded);
  }
</style>
