<script lang="ts">
  let { navItems = [] }: { navItems: Array<{ label: string; href: string }> } = $props();

  let isOpen = $state(false);

  function toggleMenu() {
    isOpen = !isOpen;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Si la ventana se hace grande (vista de escritorio) y el menú estaba abierto, lo cerramos
  function handleResize() {
    if (isOpen && window.innerWidth >= 768) { // 768px es el breakpoint 'md' de Tailwind
      toggleMenu();
    }
  }
</script>

<svelte:window onresize={handleResize} />

<!-- Botón Hamburguesa Móvil -->
<button
  onclick={toggleMenu}
  class="flex md:hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/50 bg-surface text-foreground shadow-sm transition-colors hover:bg-border/50 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-background"
  aria-label="Abrir menú"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="text-foreground/80"
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
</button>

<!-- Overlay y Modal -->
{#if isOpen}
  <!-- Fondo oscuro MUY OPÁCO, sin fade -->
  <button
    class="fixed inset-0 top-16 z-40 bg-black cursor-default"
    style="opacity: 1 !important;"
    onclick={toggleMenu}
    aria-label="Cerrar menú"
  ></button>

  <!-- Panel Lateral totalmente opaco, sin fly -->
  <div
    class="fixed inset-y-0 left-0 top-16 z-50 w-3/4 max-w-sm border-r border-border/40 bg-white dark:bg-[#171717] shadow-2xl sm:w-1/2"
  >
    <div class="flex h-full flex-col p-4">
      <nav class="flex flex-col gap-2">
        {#each navItems as item}
          <a
            href={item.href}
            class="block rounded-lg px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-brand hover:text-white"
            onclick={toggleMenu}
          >
            {item.label}
          </a>
        {/each}
      </nav>

      <div class="mt-auto border-t border-border/40 pt-4">
        <button class="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-foreground/70 transition-colors hover:bg-brand hover:text-white">
          <div class="flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle
                cx="12"
                cy="7"
                r="4"
              /></svg
            >
            Mi Perfil
          </div>
        </button>
      </div>
    </div>
  </div>
{/if}
