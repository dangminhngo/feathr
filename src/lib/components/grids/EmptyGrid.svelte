<script lang="ts">
  import noteImage from '$assets/images/note.svg'
  import listImage from '$assets/images/list.svg'
  import tagImage from '$assets/images/tag.svg'
  import trashImage from '$assets/images/trash.svg'
  import searchImage from '$assets/images/search.svg'

  const images: { [key: string]: string } = {
    note: noteImage,
    list: listImage,
    tag: tagImage,
    trash: trashImage,
    search: searchImage,
  }

  export let type: keyof typeof images = 'note'
</script>

<div class="empty-grid">
  <img src={images[type]} alt="Empty" />
  <p>
    <slot name="message">No items</slot>
  </p>
</div>

<style lang="scss">
  .empty-grid {
    min-height: 100%;
    padding-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rem;
  }

  img {
    height: 16rem;
  }

  p {
    color: var(--theme-fg-dim);
  }
</style>
