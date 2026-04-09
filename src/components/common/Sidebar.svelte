<script lang="ts">
    import Globe from "lucide-svelte/icons/globe";
    import FileText from "lucide-svelte/icons/file-text";
    import Swords from "lucide-svelte/icons/swords";
    import MessageSquare from "lucide-svelte/icons/message-square";
    import AlertTriangle from "lucide-svelte/icons/alert-triangle";
    import StatusIndicator from "../features/StatusIndicator.svelte";

    const navItems = [
        { icon: Globe, href: "/dashboard", label: "Dashboard" },
        { icon: FileText, href: "/catalog", label: "Catálogo" },
        { icon: Swords, href: "/compare", label: "Comparativa" },
        { icon: MessageSquare, href: "/chat", label: "Asistente" },
        { icon: AlertTriangle, href: "/issues", label: "Incidencias" },
    ];
</script>

<aside
    id="app-sidebar"
    class="fixed inset-y-0 left-0 flex flex-col items-center w-20 border-r border-white/10 bg-[#0a0a0a] h-full shrink-0 transition-transform duration-300 z-50 shadow-2xl shadow-brand/10 -translate-x-full md:relative md:translate-x-0"
>
    <!-- Logo Container aligned perfectly with Header line (h-16) -->
    <div
        class="hidden py-4 md:py-0 md:flex h-16 w-full border-b border-white/10 items-center justify-center"
    >
        <a
            href="/"
            class="flex h-10 w-10 items-center justify-center border-2 border-dashed border-white/50 bg-black text-white/80 font-bold text-lg font-sans transition-transform hover:scale-105 hover:border-white hover:text-white"
            title="Inicio"
        >
            Z
        </a>
    </div>

    <!-- Navigation -->
    <nav class="flex flex-col gap-8 w-full items-center mt-6">
        {#each navItems as item}
            <a
                href={item.href}
                class="group relative flex items-center justify-center p-3 rounded-none border border-transparent hover:border-white/30 bg-transparent hover:bg-white/5 transition-all text-white/50 hover:text-white"
                title={item.label}
            >
                <svelte:component this={item.icon} class="w-[22px] h-[22px]" />
                <span class="sr-only">{item.label}</span>

                <!-- Glow Effect on Hover -->
                <div
                    class="absolute inset-0 opacity-0 group-hover:opacity-100 bg-brand/10 blur-xl pointer-events-none transition-opacity"
                ></div>
            </a>
        {/each}
    </nav>

    <!-- Bottom Utility (Status) -->
    <div class="mt-auto mb-6 flex flex-col items-center">
        <StatusIndicator compact={true} />
    </div>
</aside>
