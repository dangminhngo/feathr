<script lang="ts">
  import { notesStore } from '$lib/stores'
  import NewField from '$lib/components/NewField.svelte'
  console.log($notesStore)
  let value = ''

  $: console.log(value)
</script>

<NewField {value} />
