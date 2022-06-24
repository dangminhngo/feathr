<script lang="ts">
  import type { SvelteComponent } from 'svelte'

  import Logo from '$assets/icons/logo.svg'
  import Bandage from '$assets/icons/bandage.svg'
  import Beer from '$assets/icons/beer.svg'
  import Brush from '$assets/icons/brush.svg'
  import BrushFull from '$assets/icons/brush-f.svg'
  import Check from '$assets/icons/check.svg'
  import Close from '$assets/icons/close.svg'
  import Cog from '$assets/icons/cog.svg'
  import DeleteFull from '$assets/icons/delete-f.svg'
  import Delete from '$assets/icons/delete.svg'
  import Download from '$assets/icons/download.svg'
  import Feather from '$assets/icons/feather.svg'
  import Link from '$assets/icons/link.svg'
  import MoreVerticalFull from '$assets/icons/more-vertical-f.svg'
  import Pencil from '$assets/icons/pencil.svg'
  import PencilFull from '$assets/icons/pencil-f.svg'
  import Picture from '$assets/icons/picture.svg'
  import Pin from '$assets/icons/pin.svg'
  import PinFull from '$assets/icons/pin-f.svg'
  import Plus from '$assets/icons/plus.svg'
  import Save from '$assets/icons/save.svg'
  import Search from '$assets/icons/search.svg'
  import Tag from '$assets/icons/tag.svg'
  import Tags from '$assets/icons/tags.svg'
  import List from '$assets/icons/task-list.svg'
  import Trash from '$assets/icons/trash.svg'

  const icons: { [key: string]: SvelteComponent } = {
    logo: Logo,
    bandage: Bandage,
    beer: Beer,
    brush: Brush,
    brushFull: BrushFull,
    check: Check,
    close: Close,
    cog: Cog,
    deleteFull: DeleteFull,
    delete: Delete,
    download: Download,
    feather: Feather,
    link: Link,
    more: MoreVerticalFull,
    pencil: Pencil,
    pencilFull: PencilFull,
    picture: Picture,
    pin: Pin,
    pinFull: PinFull,
    plus: Plus,
    save: Save,
    search: Search,
    tag: Tag,
    tags: Tags,
    list: List,
    trash: Trash,
  }

  export let name: string,
    size = 20
</script>

<span class={$$props.class} style="width: {size}px; height: {size}px;">
  <svelte:component this={icons[name]} width="100%" height="100%" />
</span>

<style lang="scss">
  span {
    display: block;
    pointer-events: none;
  }
</style>
