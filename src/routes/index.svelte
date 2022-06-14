<script lang="ts">
  import Icon from '$lib/components/Icon.svelte'
  import { notesStore } from '$lib/stores'
  console.log($notesStore)
</script>

<h1>Welcome to SvelteKit</h1>
<Icon name="bandage" width={32} height={32} />
