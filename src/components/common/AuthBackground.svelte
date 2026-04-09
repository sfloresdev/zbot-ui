<script lang="ts">
    import { onMount } from "svelte";
    let showBg = $state(false);

    onMount(() => {
        setTimeout(() => {
            showBg = true;
        }, 50);
    });
</script>

<div
    class="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-background"
>
    {#if showBg}
        <!-- Fondo Tech: Rejilla flotante abajo (Tech grid de suelo) -->
        <div
            class="absolute inset-x-0 bottom-0 top-[20%] tech-grid opacity-[0.25]"
        ></div>

        <!-- Glow ambiental sutil -->
        <div
            class="absolute -left-[10%] top-[30%] w-[50vw] h-[60vh] rounded-full bg-brand blur-[180px] opacity-20 mix-blend-screen"
        ></div>

        <div class="absolute top-0 left-0 w-[80%] h-full perspective-bg">
            <!-- Fade para desaparecer suavemente a todo hacia abajo y la derecha -->
            <div class="absolute inset-0 mask-lines">
                <!-- Capa profunda lenta -->
                <div class="stripe-layer layer-back">
                    <div
                        class="stripe-line stripe-huge"
                        style="top: 0%; animation-delay: 0s;"
                    ></div>
                    <div
                        class="stripe-line stripe-huge"
                        style="top: 20%; animation-delay: -2s;"
                    ></div>
                    <div
                        class="stripe-line stripe-huge"
                        style="top: 50%; animation-delay: -5s;"
                    ></div>
                </div>

                <!-- Capa central con más presencia y franjas extra gruesas -->
                <div class="stripe-layer layer-mid">
                    <div
                        class="stripe-line stripe-medium"
                        style="top: 10%; animation-delay: -2s;"
                    ></div>
                    <div
                        class="stripe-line stripe-medium"
                        style="top: 25%; animation-delay: -4s;"
                    ></div>
                    <div
                        class="stripe-line stripe-medium"
                        style="top: 45%; animation-delay: -7s;"
                    ></div>
                    <div
                        class="stripe-line stripe-medium"
                        style="top: 60%; animation-delay: -4s;"
                    ></div>
                    <div
                        class="stripe-line stripe-medium"
                        style="top: 85%; animation-delay: -1s;"
                    ></div>
                </div>

                <!-- Capa frontal rápida láser (densidad visible) -->
                <div class="stripe-layer layer-front">
                    <div
                        class="stripe-line stripe-thin"
                        style="top: 15%; animation-delay: -1s;"
                    ></div>
                    <div
                        class="stripe-line stripe-thin"
                        style="top: 35%; animation-delay: -5s;"
                    ></div>
                    <div
                        class="stripe-line stripe-thin"
                        style="top: 55%; animation-delay: -2s;"
                    ></div>
                    <div
                        class="stripe-line stripe-thin"
                        style="top: 75%; animation-delay: -6s;"
                    ></div>
                    <div
                        class="stripe-line stripe-thin"
                        style="top: 90%; animation-delay: -8s;"
                    ></div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style lang="postcss">
    /* Grilla holográfica de suelo */
    .tech-grid {
        background-size: 60px 60px;
        background-image:
            linear-gradient(
                to right,
                rgba(var(--brand-rgb), 0.5) 1px,
                transparent 1px
            ),
            linear-gradient(
                to bottom,
                rgba(var(--brand-rgb), 0.5) 1px,
                transparent 1px
            );
        transform: perspective(1000px) rotateX(75deg) scale(2.5)
            translateY(-50px);
        transform-origin: top center;
        mask-image: linear-gradient(to bottom, black 0%, transparent 60%);
        -webkit-mask-image: linear-gradient(
            to bottom,
            black 0%,
            transparent 60%
        );
        animation: fadeInLayers 2s ease-out forwards;
    }

    .perspective-bg {
        perspective: 1000px;
        transform-style: preserve-3d;
    }

    .mask-lines {
        /* Desvanecimiento fuerte abajo y a la derecha */
        mask-image: linear-gradient(
            to bottom,
            transparent 5%,
            black 20%,
            black 80%,
            transparent 100%
        );
        -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 5%,
            black 20%,
            black 80%,
            transparent 100%
        );
    }

    .stripe-layer {
        position: absolute;
        top: 0;
        left: -30%;
        width: 180vw;
        height: 120vh;
        transform-origin: left center;
        opacity: 0;
        animation: fadeInLayers 1.5s ease-out forwards;
    }

    .layer-back {
        transform: rotate(-35deg) translateZ(-300px) scale(1.2);
    }
    .layer-mid {
        transform: rotate(-35deg) translateZ(0px) scale(1);
    }
    .layer-front {
        transform: rotate(-35deg) translateZ(200px) scale(0.9);
    }

    .stripe-line {
        position: absolute;
        left: 0;
        width: 100%;
        background-repeat: no-repeat;
    }

    /* Franjas ultra densas en el fondo */
    .stripe-huge {
        height: 20vh;
        background-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(var(--brand-rgb), 0.45) 40%,
            rgba(var(--brand-rgb), 0.3) 60%,
            transparent 100%
        );
        background-size: 200% 100%;
        border-bottom: 2px solid rgba(var(--brand-rgb), 0.6);
        animation: flowDiagonal 12s linear infinite;
        filter: blur(2px);
    }

    /* Pistas medias gruesas (contrastantes) */
    .stripe-medium {
        height: 6vh;
        background-image: linear-gradient(
            to right,
            transparent 0%,
            rgba(var(--brand-rgb), 0.7) 40%,
            rgba(255, 255, 255, 0.15) 60%,
            transparent 100%
        );
        background-size: 200% 100%;
        border-bottom: 2px solid rgba(255, 255, 255, 0.4);
        box-shadow: 0 5px 25px rgba(var(--brand-rgb), 0.5);
        animation: flowDiagonal 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }

    /* Láseres blancos hiper-brillantes */
    .stripe-thin {
        height: 3px;
        background-image: linear-gradient(
            to right,
            transparent 0%,
            #ffffff 45%,
            #ffffff 55%,
            transparent 100%
        );
        background-size: 300% 100%;
        box-shadow:
            0 0 20px var(--brand),
            0 0 8px #ffffff;
        animation: flowFast 4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
    }

    @keyframes fadeInLayers {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes flowDiagonal {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: -100% 0;
        }
    }
    @keyframes flowFast {
        0% {
            background-position: 100% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>
