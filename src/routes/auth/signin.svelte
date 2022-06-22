<script lang="ts">
  import { goto } from '$app/navigation'
  import SignIn from '$lib/components/forms/SignIn.svelte'
  import { signIn } from '$lib/firebase/auth'

  type SignInEvent = SignIn['$$events_def']['signin']
  const handleSignIn = async ({ detail }: SignInEvent) => {
    const { email, password } = detail
    await signIn(email, password)
    goto('/app/notes')
  }
</script>

<div class="wrapper">
  <p>Sign in to Feathr</p>
  <SignIn on:signin={handleSignIn} />
  <div class="navigate">
    New to Feathr? <a href="/auth/signup">Sign up</a>
  </div>
</div>

<style lang="scss">
  .wrapper {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 1.5rem;
  }

  p {
    text-align: center;
    font-size: var(--text-lg);
    font-weight: 500;
  }

  .navigate {
    padding: 1rem;
    text-align: center;
    border: 1px solid var(--clr-primary-700);
    border-radius: var(--rounded);
  }

  a {
    color: var(--clr-accent);
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
