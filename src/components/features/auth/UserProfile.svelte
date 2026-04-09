<script lang="ts">
    import { onMount } from "svelte";
    import User from "lucide-svelte/icons/user";
    import LogOut from "lucide-svelte/icons/log-out";
    import Settings from "lucide-svelte/icons/settings";
    import { slide } from "svelte/transition";

    let username = $state("Usuario");
    let isOpen = $state(false);
    let dropdownRef: HTMLDivElement | null = $state(null);
    let buttonRef: HTMLButtonElement | null = $state(null);

    onMount(() => {
        const session = localStorage.getItem("zbot-session");
        if (session) {
            try {
                const data = JSON.parse(session);
                if (data.email) {
                    username = data.email.split("@")[0];
                }
            } catch (err) {}
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    });

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

    function logout() {
        localStorage.removeItem("zbot-session");
        window.location.href = "/login";
    }
</script>

<div
    class="relative flex items-center gap-2 sm:gap-3 pl-3 sm:pl-6 border-l border-white/10"
>
    <div class="text-right">
        <p class="text-[11px] sm:text-xs font-semibold text-white/90">
            {username}
        </p>
        <p class="text-[9px] sm:text-[10px] text-white/40">Zaltor Network</p>
    </div>

    <button
        bind:this={buttonRef}
        onclick={toggle}
        class="relative flex h-10 w-10 shrink-0 items-center justify-center border transition-all focus:outline-none cursor-pointer {isOpen
            ? 'bg-white/10 border-white/20 text-white'
            : 'border-transparent bg-transparent hover:bg-white/5 hover:border-white/20 text-white/70 hover:text-white'}"
        title="Opciones de perfil"
    >
        <User class="w-5 h-5 pointer-events-none" />
    </button>

    {#if isOpen}
        <div
            bind:this={dropdownRef}
            transition:slide={{ duration: 200, axis: "y" }}
            class="absolute right-0 top-12 mt-2 w-48 bg-[#0a0a0a] border border-white/10 shadow-2xl flex flex-col z-50 overflow-hidden"
        >
            <div class="px-4 py-3 border-b border-white/10 bg-black">
                <p class="text-xs text-white/50 uppercase tracking-widest">
                    Conectado como
                </p>
                <p class="text-sm font-bold text-white truncate mt-0.5">
                    {username}
                </p>
            </div>

            <button
                class="flex items-center gap-2 px-4 py-3 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors text-left"
            >
                <Settings class="w-4 h-4" />
                Configuración
            </button>

            <div class="border-t border-white/10">
                <button
                    onclick={logout}
                    class="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors text-left"
                >
                    <LogOut class="w-4 h-4" />
                    Cerrar Sesión
                </button>
            </div>
        </div>
    {/if}
</div>
