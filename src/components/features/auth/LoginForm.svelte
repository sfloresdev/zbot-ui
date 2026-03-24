<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import { auth, MOCK_USERS } from "$lib/auth";

    import Mail from "lucide-svelte/icons/mail";
    import Lock from "lucide-svelte/icons/lock";
    import Eye from "lucide-svelte/icons/eye";
    import EyeOff from "lucide-svelte/icons/eye-off";
    import Loader2 from "lucide-svelte/icons/loader-2";

    let email = $state("");
    let password = $state("");
    let showPassword = $state(false);
    let loading = $state(false);
    let errorMessage = $state("");

    function handleLogin(e: Event) {
        e.preventDefault();
        loading = true;
        errorMessage = "";

        setTimeout(() => {
            const user = MOCK_USERS.find(
                (u) => u.email === email && u.pass === password,
            );

            if (user) {
                auth.login(user.email, user.role);
                window.location.href = "/";
            } else {
                errorMessage = "Credenciales invalidas";
                loading = false;
            }
        }, 800);
    }
</script>

<svelte:head>
    <style>
        /* Bloqueamos HTML y BODY para que sea una app de pantalla completa (HUD real) */
        html, body {
            overflow: hidden !important; 
            width: 100vw;
            height: 100vh;
            /* Evita el "rebote" en móviles o el scroll fantasma */
            overscroll-behavior: none; 
        }
    </style>
</svelte:head>

<div class="relative w-full max-w-4xl mx-auto px-4 min-h-[70vh] flex items-center justify-center">

    <Card.Root class="relative w-full rounded-none border border-white bg-transparent shadow-none z-20 cyber-card-fade">
        
        <div class="absolute -top-[1px] right-full w-[15vw] hud-h-left"></div>
        <div class="absolute -top-[1px] left-full w-[60vw] hud-h-right"></div>
        
        <div class="absolute -bottom-[1px] right-full w-[45vw] hud-h-left"></div>
        <div class="absolute -bottom-[1px] left-full w-[20vw] hud-h-right"></div>
        
        <div class="absolute left-[-1px] bottom-full h-[10vh] hud-v-up"></div>
        <div class="absolute left-[-1px] top-full h-[35vh] hud-v-down"></div>
        
        <div class="absolute right-[-1px] bottom-full h-[40vh] hud-v-up"></div>
        <div class="absolute right-[-1px] top-full h-[15vh] hud-v-down"></div>
        <Card.Header class="pt-10 pb-6 flex flex-col items-center">
            <div class="h-14 w-24 border-2 border-dashed border-white flex items-center justify-center">
                <span class="text-[10px] uppercase tracking-widest text-white/50 font-bold">Logo</span>
            </div>
        </Card.Header>

        <Card.Content class="px-8 pb-12 sm:px-12 md:px-16">
            <form onsubmit={handleLogin} class="space-y-5">
                {#if errorMessage}
                    <p class="text-xs font-bold uppercase text-red-500 tracking-widest text-center">
                        {errorMessage}
                    </p>
                {/if}

                <div class="space-y-6">
                    <div class="space-y-2">
                        <Label for="email" class="text-[10px] font-bold uppercase tracking-widest text-white/70 ml-1">Email</Label>
                        <div class="relative flex items-center">
                            <Mail class="absolute left-4 h-4 w-4 text-white/50" />
                            <Input
                                id="email"
                                type="email"
                                bind:value={email}
                                placeholder="tu@email.com"
                                class="rounded-none h-11 pl-12 w-full bg-transparent border-white/30 focus:border-white focus:ring-0 transition-colors text-white text-sm placeholder:text-white/20"
                                required
                            />
                        </div>
                    </div>

                    <div class="space-y-2">
                        <Label for="password" class="text-[10px] font-bold uppercase tracking-widest text-white/70 ml-1">Contraseña</Label>
                        <div class="relative flex items-center">
                            <Lock class="absolute left-4 h-4 w-4 text-white/50" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                bind:value={password}
                                placeholder="••••••••"
                                class="rounded-none h-11 pl-12 pr-12 w-full bg-transparent border-white/30 focus:border-white focus:ring-0 transition-colors text-white text-sm placeholder:text-white/20"
                                required
                            />
                            <button
                                type="button"
                                onclick={() => (showPassword = !showPassword)}
                                class="absolute right-4 text-white/50 hover:text-white transition-colors"
                            >
                                {#if showPassword}
                                    <EyeOff class="h-4 w-4" />
                                {:else}
                                    <Eye class="h-4 w-4" />
                                {/if}
                            </button>
                        </div>

                        <div class="pt-1 text-left ml-1">
                            <a href="/" class="text-[10px] font-bold uppercase tracking-widest underline decoration-white/30 hover:decoration-white text-white/70 transition-colors">
                                Recuperar Contraseña
                            </a>
                        </div>
                    </div>
                </div>

                <div class="flex justify-center pt-2">
                    <Button
                        type="submit"
                        disabled={loading}
                        class="rounded-none w-full h-11 bg-brand hover:bg-brand/90 text-white font-bold uppercase tracking-[0.2em] text-xs transition-transform active:scale-[0.99]"
                    >
                        {#if loading}
                            <Loader2 class="h-4 w-4 animate-spin mr-2" />
                        {/if}
                        Entrar
                    </Button>
                </div>
            </form>
        </Card.Content>

        <!-- <Card.Footer class="bg-background/40 border-t border-border/20 py-4 flex justify-center">
            <p class="text-xs text-foreground/40 font-sans">
                Made with 🧡 by seflores
            </p>
        </Card.Footer> -->

    </Card.Root>
</div>

<style lang="postcss">
    /* 1. Despliegue Estructural (Aparición a los 4s) */
    @keyframes drawX {
        0% { transform: scaleX(0); opacity: 1; }
        100% { transform: scaleX(1); opacity: 1; }
    }
    @keyframes drawY {
        0% { transform: scaleY(0); opacity: 1; }
        100% { transform: scaleY(1); opacity: 1; }
    }
    @keyframes fadeInDelayed {
        0% { opacity: 0; transform: translateY(10px); }
        100% { opacity: 1; transform: translateY(0); }
    }

    /* 2. Animación Cinematográfica: Viaje de las Partículas */
    @keyframes particleLeft {
        0% { background-position: calc(100% + 150px) 0, 0 0; }
        100% { background-position: -150px 0, 0 0; }
    }
    @keyframes particleRight {
        0% { background-position: -150px 0, 0 0; }
        100% { background-position: calc(100% + 150px) 0, 0 0; }
    }
    @keyframes particleUp {
        0% { background-position: 0 calc(100% + 150px), 0 0; }
        100% { background-position: 0 -150px, 0 0; }
    }
    @keyframes particleDown {
        0% { background-position: 0 -150px, 0 0; }
        100% { background-position: 0 calc(100% + 150px), 0 0; }
    }

    /* 3. Base Compartida */
    .hud-h-left, .hud-h-right, .hud-v-up, .hud-v-down {
        position: absolute;
        pointer-events: none;
        z-index: 10;
        opacity: 0; /* Invisibles durante los primeros 4 segundos */
        background-repeat: no-repeat;
    }

    /* 4. Implementación de Doble Capa (Partícula + Pista) */
    .hud-h-left {
        height: 1px;
        background-image: 
            /* Capa 1: La partícula (Cabeza blanca a la izquierda, cola naranja a la derecha) */
            linear-gradient(to right, #ffffff 0%, var(--brand) 20%, transparent 100%),
            /* Capa 2: La pista (Tenue, se difumina a la izquierda) */
            linear-gradient(to left, rgba(255,255,255,0.15) 0%, transparent 100%);
        background-size: 150px 1px, 100% 1px;
        transform-origin: right;
        /* Delay escalonado para un flujo orgánico */
        animation: 
            drawX 1.5s cubic-bezier(0.16, 1, 0.3, 1) 4s forwards, 
            particleLeft 3s cubic-bezier(0.4, 0, 0.2, 1) infinite 4.5s;
    }

    .hud-h-right {
        height: 1px;
        background-image: 
            /* Cabeza blanca a la derecha, cola naranja a la izquierda */
            linear-gradient(to left, #ffffff 0%, var(--brand) 20%, transparent 100%),
            /* Pista */
            linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 100%);
        background-size: 150px 1px, 100% 1px;
        transform-origin: left;
        animation: 
            drawX 1.5s cubic-bezier(0.16, 1, 0.3, 1) 4s forwards, 
            particleRight 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 4.8s;
    }

    .hud-v-up {
        width: 1px;
        background-image: 
            /* Cabeza blanca arriba, cola naranja abajo */
            linear-gradient(to bottom, #ffffff 0%, var(--brand) 20%, transparent 100%),
            /* Pista */
            linear-gradient(to top, rgba(255,255,255,0.15) 0%, transparent 100%);
        background-size: 1px 150px, 1px 100%;
        transform-origin: bottom;
        animation: 
            drawY 1.5s cubic-bezier(0.16, 1, 0.3, 1) 4s forwards, 
            particleUp 4s cubic-bezier(0.4, 0, 0.2, 1) infinite 4.2s;
    }

    .hud-v-down {
        width: 1px;
        background-image: 
            /* Cabeza blanca abajo, cola naranja arriba */
            linear-gradient(to top, #ffffff 0%, var(--brand) 20%, transparent 100%),
            /* Pista */
            linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 100%);
        background-size: 1px 150px, 1px 100%;
        transform-origin: top;
        animation: 
            drawY 1.5s cubic-bezier(0.16, 1, 0.3, 1) 4s forwards, 
            particleDown 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite 4.6s;
    }

    /* 5. FIX GLOBAL PARA SVELTE */
    :global(.cyber-card-fade) {
        opacity: 0;
        animation: fadeInDelayed 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        animation-delay: 0.2s;
    }
</style>