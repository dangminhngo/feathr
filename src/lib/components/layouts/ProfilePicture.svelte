<script lang="ts">
  export let url =
      'https://s3.amazonaws.com/cms-assets.tutsplus.com/uploads/users/810/profiles/19338/profileImage/profile-square-extra-small.png',
    email = 'jacktheripper@gmail.com'
</script>

<button>
  <img src={url} alt={email} />
</button>

<style lang="scss">
  button {
    cursor: pointer;
    width: var(--button-height);
    height: var(--button-height);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--rounded);
    transition: background-color 0.15s ease-out;
  }

  button:hover {
    background-color: var(--theme-primary-700);
  }

  img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
  }
</style>
