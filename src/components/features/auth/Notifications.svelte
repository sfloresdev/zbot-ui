<script lang="ts">
    import { fade, slide } from "svelte/transition";
    import { onMount } from "svelte";

    let isOpen = $state(false);
    let dropdownRef: HTMLDivElement | null = $state(null);
    let buttonRef: HTMLButtonElement | null = $state(null);

    // Dummy notifications for UI
    const notifications = [
        {
            id: 1,
            title: "Alerta de Seguridad",
            message: "Nuevo inicio de sesión detectado en tu cuenta.",
            time: "Hace 2 min",
            read: false,
        },
        {
            id: 2,
            title: "Actualización",
            message: "El catálogo de fabricantes ha sido sincronizado.",
            time: "Hace 1 hora",
            read: false,
        },
        {
            id: 3,
            title: "Incidencia Resuelta",
            message: "Tu ticket #4920 ha sido cerrado por soporte.",
            time: "Ayer",
            read: true,
        },
    ];

    function toggle() {
        isOpen = !isOpen;
    }

    function handleClickOutside(e: MouseEvent) {
        if (isOpen && dropdownRef && buttonRef) {
            if (
                !dropdownRef.contains(e.target as Node) &&
                !buttonRef.contains(e.target as Node)
            ) {
                isOpen = false;
            }
        }
    }

    onMount(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });
</script>

<div class="relative">
    <button
        bind:this={buttonRef}
        onclick={toggle}
        class="relative flex h-10 w-10 shrink-0 items-center justify-center border transition-all focus:outline-none cursor-pointer {isOpen
            ? 'bg-white/10 border-white/20 text-white'
            : 'border-transparent bg-transparent hover:bg-white/5 hover:border-white/20 text-white/50 hover:text-white'}"
        title="Notificaciones"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>

        <!-- Placeholder Ping (Simulando notificaciones no leidas) -->
        <span class="absolute top-2 right-2 flex h-2 w-2">
            <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"
            ></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-brand"
            ></span>
        </span>
    </button>

    {#if isOpen}
        <div
            bind:this={dropdownRef}
            transition:slide={{ duration: 200, axis: "y" }}
            class="absolute right-0 mt-3 w-80 bg-[#0a0a0a] border border-white/10 shadow-2xl shadow-black/80 z-50 overflow-hidden"
        >
            <div
                class="bg-black border-b border-white/10 px-4 py-3 flex justify-between items-center"
            >
                <h3 class="font-bold text-white/90 text-sm">Notificaciones</h3>
                <button
                    class="text-xs text-brand hover:text-brand/80 transition-colors"
                    >Marcar leídas</button
                >
            </div>

            <div class="max-h-[350px] overflow-y-auto">
                {#each notifications as notif}
                    <div
                        class="px-4 py-3 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer flex flex-col gap-1 relative overflow-hidden"
                    >
                        {#if !notif.read}
                            <div
                                class="absolute left-0 top-0 bottom-0 w-[2px] bg-brand"
                            ></div>
                        {/if}
                        <div class="flex justify-between items-start">
                            <span
                                class="text-xs font-semibold {notif.read
                                    ? 'text-white/60'
                                    : 'text-white'}">{notif.title}</span
                            >
                            <span class="text-[9px] text-white/40"
                                >{notif.time}</span
                            >
                        </div>
                        <p class="text-xs text-white/50 leading-relaxed pr-2">
                            {notif.message}
                        </p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
