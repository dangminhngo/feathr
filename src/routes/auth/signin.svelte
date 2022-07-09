<script lang="ts">
  import { goto } from '$app/navigation'
  import { FirebaseError } from 'firebase/app'
  import SignIn from '$lib/components/forms/SignIn.svelte'
  import { signIn } from '$lib/firebase/auth'
  import { validateSignInForm } from '$lib/validate'
  import type { ValidateErrors, AuthData } from '$lib/types'
  import { FirebaseErrorCode } from '$lib/enums'

  let loading = false,
    error: string | null = null,
    fieldErrors: ValidateErrors<AuthData> = null

  type SignInEvent = SignIn['$$events_def']['signin']
  const handleSignIn = async ({ detail }: SignInEvent) => {
    try {
      const validate = validateSignInForm(detail)

      if (validate.errors) {
        fieldErrors = validate.errors
        return
      }

      const { email, password } = detail
      loading = true
      await signIn(email, password)
      loading = false
      goto('/app/notes')
    } catch (err) {
      loading = false

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case FirebaseErrorCode.USER_NOT_FOUND:
            return (error = 'Cannot find an account with this email')
          case FirebaseErrorCode.WRONG_PASSWORD:
            return (error = 'Your password is incorrect')
          default:
            return (error = 'Try to sign in to Feathr later')
        }
      }

      error = 'Something went wrong'
    }
  }
</script>

<div class="wrapper">
  <h3>Sign in to Feathr</h3>
  <SignIn on:signin={handleSignIn} {loading} errors={fieldErrors} />
  {#if error}<p class="error">{error}</p>{/if}
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
    gap: 1rem;
  }

  h3 {
    text-align: center;
    font-size: var(--text-lg);
    font-weight: 500;
  }

  p {
    padding: 0.5rem 1rem;
    border-radius: var(--rounded);
    border: 1px solid var(--clr-danger);
    font-size: var(--text-sm);
    color: var(--clr-danger);
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
