<script lang="ts">
  let {
    status = "operational",
    compact = false,
  }: { status?: "operational" | "degraded" | "outage"; compact?: boolean } =
    $props();

  const statusConfig = {
    operational: {
      text: "Sistemas operacionales",
      color: "bg-emerald-500",
      pulse: "bg-emerald-500/30",
    },
    degraded: {
      text: "Rendimiento degradado",
      color: "bg-amber-500",
      pulse: "bg-amber-500/30",
    },
    outage: {
      text: "Interrupción detectada",
      color: "bg-red-500",
      pulse: "bg-red-500/30",
    },
  };

  let currentConfig = $derived(
    statusConfig[status] || statusConfig.operational,
  );
</script>

<div
  class="flex items-center justify-center rounded-full transition-colors cursor-help {compact
    ? 'h-12 w-12 hover:bg-white/5 border border-transparent hover:border-white/10'
    : 'gap-3 py-1.5 px-3 -ml-3 hover:bg-surface/50'}"
  title={compact
    ? currentConfig.text
    : "Estado general de los servicios de la Intranet"}
>
  <div class="relative flex h-3 w-3 items-center justify-center">
    <span
      class={`absolute inline-flex h-full w-full animate-ping rounded-full ${currentConfig.pulse} opacity-75`}
    ></span>
    <span
      class={`relative inline-flex h-2 w-2 rounded-full ${currentConfig.color}`}
    ></span>
  </div>
  {#if !compact}
    <span class="text-sm font-medium text-foreground/70"
      >{currentConfig.text}</span
    >
  {/if}
</div>
