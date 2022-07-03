<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import TextInput from '$lib/components/TextInput.svelte'
  import PasswordInput from '$lib/components/PasswordInput.svelte'
  import Button from '$lib/components/Button.svelte'
  import type { ValidateErrors, AuthData } from '$lib/types'

  export let loading = false,
    errors: ValidateErrors<AuthData> = null

  let email = '',
    password = ''

  const dispatch = createEventDispatcher()
  const handleSubmit = () => {
    dispatch('signup', {
      email,
      password,
    })
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <TextInput
    label="Email"
    placeholder="Enter your email"
    bind:value={email}
    error={errors?.email}
  />
  <PasswordInput
    label="Password"
    placeholder="Enter your password"
    bind:value={password}
    error={errors?.password}
  />
  <Button size="lg" variant="primary" stretch={true} {loading} disabled={loading}>Sign up</Button>
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
