<script lang="ts">
  import NewField from '$lib/components/NewField.svelte'
  let value = ''

  $: console.log(value)
</script>

<NewField />
