<script lang="ts">
  import { goto } from '$app/navigation'
  import SignIn from '$lib/components/forms/SignIn.svelte'
  import { signIn } from '$lib/firebase/auth'
  import { validateSignInForm } from '$lib/validate'
  import type { ValidateErrors, AuthData } from '$lib/types'

  let loading = false,
    errors: ValidateErrors<AuthData> = null

  type SignInEvent = SignIn['$$events_def']['signin']
  const handleSignIn = async ({ detail }: SignInEvent) => {
    try {
      const validate = validateSignInForm(detail)

      if (validate.errors) {
        errors = validate.errors
        return
      }

      const { email, password } = detail
      loading = true
      await signIn(email, password)
      loading = false
      goto('/app/notes')
    } catch (err) {
      console.log(err)
    }
  }
</script>

<div class="wrapper">
  <p>Sign in to Feathr</p>
  <SignIn on:signin={handleSignIn} {loading} {errors} />
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
