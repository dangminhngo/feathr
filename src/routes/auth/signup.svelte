<script lang="ts">
  import SignUp from '$lib/components/forms/SignUp.svelte'

  type SignUpEvent = SignUp['$$events_def']['signup']
  const handleSignUp = ({ detail }: SignUpEvent) => {
    console.log(detail)
  }
</script>

<div class="wrapper">
  <p>Create an account</p>
  <SignUp on:signup={handleSignUp} />
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
