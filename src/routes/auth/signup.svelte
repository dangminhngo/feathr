<script lang="ts">
  import { goto } from '$app/navigation'
  import { FirebaseError } from 'firebase/app'
  import SignUp from '$lib/components/forms/SignUp.svelte'
  import { signUp } from '$lib/firebase/auth'
  import { validateSignUpForm } from '$lib/validate'
  import type { ValidateErrors, AuthData } from '$lib/types'
  import { FirebaseErrorCode } from '$lib/enums'

  let loading = false,
    error: string | null = null,
    fieldErrors: ValidateErrors<AuthData> = null

  type SignUpEvent = SignUp['$$events_def']['signup']
  const handleSignUp = async ({ detail }: SignUpEvent) => {
    try {
      const validate = validateSignUpForm(detail)

      if (validate.errors) {
        fieldErrors = validate.errors
        return
      }

      const { email, password } = detail
      loading = true
      await signUp(email, password)
      loading = false
      goto('/app/notes')
    } catch (err) {
      loading = false

      if (err instanceof FirebaseError) {
        switch (err.code) {
          case FirebaseErrorCode.EMAIL_ALREADY_IN_USE:
            return (error = 'This email already in use')
          default:
            return (error = 'Try to create an account later')
        }
      }

      error = 'Something went wrong'
    }
  }
</script>

<div class="wrapper">
  <h3>Create an account</h3>
  <SignUp on:signup={handleSignUp} {loading} errors={fieldErrors} />
  {#if error}<p>{error}</p>{/if}
  <div class="navigate">
    Already have an account? <a href="/auth/signin">Sign in</a>
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
