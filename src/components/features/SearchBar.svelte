<script lang="ts">
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";

  let isMobileOpen = $state(false);
  let searchInput: HTMLInputElement | null = $state(null);
  let containerRef: HTMLDivElement | null = $state(null);

  function toggleMobileSearch() {
    isMobileOpen = !isMobileOpen;
    if (isMobileOpen) {
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 50);
    }
  }

  function handleClickOutside(event: MouseEvent) {
    if (
      isMobileOpen &&
      containerRef &&
      !containerRef.contains(event.target as Node)
    ) {
      isMobileOpen = false;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape" && isMobileOpen) {
      isMobileOpen = false;
    }
  }

  // Cerrar si volvemos a vista escritorio
  function handleResize() {
    if (isMobileOpen && window.innerWidth >= 950) {
      isMobileOpen = false;
    }
  }

  onMount(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<svelte:window onresize={handleResize} />

<div class="relative flex items-center" bind:this={containerRef}>
  <!-- 1. VISTA ESCRITORIO (>= 950px): Barra fija como estaba originalmente -->
  <div class="hidden min-[950px]:block relative">
    <div
      class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-foreground/50"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
    </div>
    <input
      type="text"
      placeholder="Buscar información..."
      class="h-9 w-80 rounded-none border border-white/20 bg-black/50 pl-10 pr-4 text-sm shadow-sm outline-none transition-all placeholder:text-white/30 text-white focus:border-brand focus:ring-1 focus:ring-brand hover:bg-black"
    />
  </div>

  <!-- 2. VISTA MÓVIL (< 950px): Ícono de Lupa Normal -->
  <button
    onclick={toggleMobileSearch}
    class="flex min-[950px]:hidden h-9 w-9 items-center justify-center border border-white/20 text-white/70 transition-colors hover:bg-white/10 hover:text-white hover:border-white focus:outline-none"
    aria-label="Abrir buscador"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  </button>

  <!-- 3. DESPLEGABLE MÓVIL: Cuando haces click en la lupa  -->
  {#if isMobileOpen}
    <div
      class="absolute top-12 left-0 w-[280px] sm:w-[350px] p-2 bg-black border border-white/20 shadow-xl z-50 min-[950px]:hidden"
      transition:fade={{ duration: 150 }}
    >
      <div class="relative flex items-center">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-brand"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        <input
          bind:this={searchInput}
          type="text"
          placeholder="Buscar..."
          class="h-10 w-full bg-black/50 border border-white/10 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-white/30 text-white focus:border-brand focus:ring-1 focus:ring-brand"
        />
      </div>
    </div>
  {/if}
</div>
