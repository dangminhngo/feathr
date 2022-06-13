<script lang="ts">
  import type { SvelteComponent } from 'svelte'

  import Bandage from '@assets/icons/bandage.svg'
  import Brush from '@assets/icons/brush.svg'
  import Check from '@assets/icons/check.svg'
  import Close from '@assets/icons/close.svg'
  import Cog from '@assets/icons/cog.svg'
  import DeleteFull from '@assets/icons/delete-f.svg'
  import Delete from '@assets/icons/delete.svg'
  import Download from '@assets/icons/download.svg'
  import Feather from '@assets/icons/feather.svg'
  import MoreVerticalFull from '@assets/icons/more-vertical-f.svg'
  import Pencil from '@assets/icons/pencil.svg'
  import Picture from '@assets/icons/picture.svg'
  import Pin from '@assets/icons/pin.svg'
  import Search from '@assets/icons/search.svg'
  import Tag from '@assets/icons/tag.svg'
  import Tags from '@assets/icons/tags.svg'
  import TaskList from '@assets/icons/task-list.svg'
  import Trash from '@assets/icons/trash.svg'

  const icons: { [key: string]: SvelteComponent } = {
    bandage: Bandage,
    brush: Brush,
    check: Check,
    close: Close,
    cog: Cog,
    deleteFull: DeleteFull,
    delete: Delete,
    download: Download,
    feather: Feather,
    more: MoreVerticalFull,
    pencil: Pencil,
    picture: Picture,
    pin: Pin,
    search: Search,
    tag: Tag,
    tags: Tags,
    taskList: TaskList,
    trash: Trash,
  }

  export let name: string, width: number, height: number
</script>

<span class="icon">
  <svelte:component this={icons[name]} {width} {height} />
</span>

<style lang="scss">
  .icon {
    color: inherit;
  }
</style>
