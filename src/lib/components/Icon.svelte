<script lang="ts">
  import Logo from '$assets/icons/logo.svg'
  import Bandage from '$assets/icons/bandage.svg'
  import Brush from '$assets/icons/brush.svg'
  import Check from '$assets/icons/check.svg'
  import Close from '$assets/icons/close.svg'
  import Cog from '$assets/icons/cog.svg'
  import Download from '$assets/icons/download.svg'
  import Feather from '$assets/icons/feather.svg'
  import Link from '$assets/icons/link.svg'
  import Menu from '$assets/icons/menu.svg'
  import MoreVerticalFull from '$assets/icons/more-vertical-f.svg'
  import Pencil from '$assets/icons/pencil.svg'
  import PencilFull from '$assets/icons/pencil-f.svg'
  import Picture from '$assets/icons/picture.svg'
  import Pin from '$assets/icons/pin.svg'
  import PinFull from '$assets/icons/pin-f.svg'
  import Plus from '$assets/icons/plus.svg'
  import Redo from '$assets/icons/redo.svg'
  import Save from '$assets/icons/save.svg'
  import Search from '$assets/icons/search.svg'
  import Tag from '$assets/icons/tag.svg'
  import Tags from '$assets/icons/tags.svg'
  import List from '$assets/icons/task-list.svg'
  import Trash from '$assets/icons/trash.svg'
  import TrashFull from '$assets/icons/trash-f.svg'

  // NOTE: string for svelte component type, no error????
  const icons: { [key: string]: string } = {
    logo: Logo,
    bandage: Bandage,
    brush: Brush,
    check: Check,
    close: Close,
    cog: Cog,
    download: Download,
    feather: Feather,
    link: Link,
    menu: Menu,
    more: MoreVerticalFull,
    pencil: Pencil,
    pencilFull: PencilFull,
    picture: Picture,
    pin: Pin,
    pinFull: PinFull,
    plus: Plus,
    redo: Redo,
    save: Save,
    search: Search,
    tag: Tag,
    tags: Tags,
    list: List,
    trash: Trash,
    trashFull: TrashFull,
  }

  export let name: string,
    size = 20
</script>

<span
  class={$$props.class}
  style="min-width: {size}px; max-width: {size}px; min-height: {size}px; max-height: {size}px"
>
  <svelte:component this={icons[name]} width="100%" height="100%" />
</span>

<style lang="scss">
  span {
    display: block;
    pointer-events: none;
  }
</style>
