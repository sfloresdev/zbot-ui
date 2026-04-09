<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    import Mail from "lucide-svelte/icons/mail";
    import Loader2 from "lucide-svelte/icons/loader-2";
    import ArrowLeft from "lucide-svelte/icons/arrow-left";
    import CheckCircle2 from "lucide-svelte/icons/circle-check";

    let email = $state("");
    let loading = $state(false);
    let errorMessage = $state("");
    let success = $state(false);

    function handleRecovery(e: Event) {
        e.preventDefault();
        loading = true;
        errorMessage = "";

        setTimeout(() => {
            // Validación Frontend: Solo dominios '@zaltor.com'
            if (!email.toLowerCase().endsWith("@zaltor.com")) {
                errorMessage = "Se requiere un dominio '@zaltor.com'.";
                loading = false;
                return;
            }

            // Simulación de éxito
            success = true;
            loading = false;
        }, 1200);
    }

    function resetForm() {
        success = false;
        email = "";
    }
</script>

<svelte:head>
    <style>
        html,
        body {
            overflow: hidden !important;
            width: 100vw;
            height: 100vh;
            overscroll-behavior: none;
        }
    </style>
</svelte:head>

<div
    class="relative w-full max-w-4xl mx-auto px-4 min-h-[70vh] flex items-center justify-center"
>
    <Card.Root
        class="relative w-full min-h-[460px] flex flex-col justify-center rounded-none border border-white/20 bg-black shadow-2xl z-20 cyber-card-fade transition-all duration-500"
    >
        <Card.Header class="pt-10 pb-6 flex flex-col items-center">
            <div
                class="h-14 w-24 border-2 border-dashed border-white flex items-center justify-center"
            >
                <span
                    class="text-[10px] uppercase tracking-widest text-white/50 font-bold"
                    >Logo</span
                >
            </div>
            {#if !success}
                <div class="mt-6 text-center space-y-1">
                    <h2
                        class="text-white font-bold tracking-[0.2em] uppercase text-sm"
                    >
                        Restablecer Contraseña
                    </h2>
                    <p
                        class="text-white/40 text-[10px] tracking-widest uppercase"
                    >
                        Recupere el acceso a su cuenta
                    </p>
                </div>
            {/if}
        </Card.Header>

        <Card.Content
            class="px-8 pb-12 sm:px-12 md:px-16 flex flex-col justify-center"
        >
            {#if success}
                <div
                    class="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500"
                >
                    <CheckCircle2 class="h-16 w-16 text-brand" />
                    <div class="text-center space-y-2">
                        <p
                            class="text-white font-bold uppercase tracking-widest text-sm"
                        >
                            Recuperación Iniciada
                        </p>
                        <p class="text-white/60 text-xs max-w-md mx-auto">
                            Se han enviado las instrucciones de recuperación a <span
                                class="text-white font-semibold">{email}</span
                            >.
                        </p>
                    </div>
                    <div class="pt-6">
                        <a
                            href="/login"
                            class="flex items-center text-[10px] font-bold uppercase tracking-widest text-brand hover:text-brand/80 transition-colors"
                        >
                            <ArrowLeft class="h-3 w-3 mr-2" />
                            Volver al acceso principal
                        </a>
                    </div>
                </div>
            {:else}
                <form
                    onsubmit={handleRecovery}
                    class="space-y-5 animate-in fade-in duration-300"
                >
                    {#if errorMessage}
                        <p
                            class="text-xs font-bold uppercase text-red-500 tracking-widest text-center bg-red-500/10 py-2 border border-red-500/30"
                        >
                            {errorMessage}
                        </p>
                    {/if}

                    <div class="space-y-2">
                        <Label
                            for="email"
                            class="text-[10px] font-bold uppercase tracking-widest text-white/70 ml-1"
                            >Email Corporativo</Label
                        >
                        <div class="relative flex items-center">
                            <Mail
                                class="absolute left-4 h-4 w-4 text-white/50"
                            />
                            <Input
                                id="email"
                                type="email"
                                bind:value={email}
                                placeholder="tu.nombre@zaltor.com"
                                class="rounded-none h-11 pl-12 w-full bg-transparent border-white/30 focus:border-white focus:ring-0 transition-colors text-white text-sm placeholder:text-white/20"
                                required
                            />
                        </div>
                    </div>

                    <div class="flex flex-col space-y-4 pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            class="rounded-none w-full h-11 bg-brand hover:bg-brand/90 text-white font-bold uppercase tracking-[0.2em] text-xs transition-transform active:scale-[0.99]"
                        >
                            {#if loading}
                                <Loader2 class="h-4 w-4 animate-spin mr-2" />
                                Validando...
                            {:else}
                                Solicitar Enlace
                            {/if}
                        </Button>

                        <div class="text-center">
                            <a
                                href="/login"
                                class="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                            >
                                <ArrowLeft class="h-3 w-3 mr-2" />
                                Cancelar
                            </a>
                        </div>
                    </div>
                </form>
            {/if}
        </Card.Content>
    </Card.Root>
</div>

<style lang="postcss">
    /* Base Global Fade In */
    @keyframes fadeInDelayed {
        0% {
            opacity: 0;
            transform: translateY(10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    :global(.cyber-card-fade) {
        opacity: 0;
        animation: fadeInDelayed 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        animation-delay: 0.2s;
    }
</style>
