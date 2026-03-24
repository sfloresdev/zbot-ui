<script lang="ts">
  // Exportamos 'status' como property para poder inyectarlo desde fuera (ej: tras una llamada API).
  // Los tipos posibles son: 'operational' | 'degraded' | 'outage'
  let {
    status = "operational",
  }: { status?: "operational" | "degraded" | "outage" } = $props();

  // Mapeos de configuración visual según el estado
  const statusConfig = {
    operational: {
      text: "Todos los sistemas operacionales",
      color: "bg-emerald-500",
      pulse: "bg-emerald-500/30",
    },
    degraded: {
      text: "Rendimiento degradado",
      color: "bg-amber-500",
      pulse: "bg-amber-500/30",
    },
    outage: {
      text: "Interrupción servicio",
      color: "bg-red-500",
      pulse: "bg-red-500/30",
    },
  };

  // Variable reactiva basada en el prop actual
  let currentConfig = $derived(
    statusConfig[status] || statusConfig.operational,
  );
</script>

<div
  class="flex items-center gap-3 rounded-full hover:bg-surface/50 transition-colors py-1.5 px-3 -ml-3 cursor-help"
  title="Estado general de los servicios de la Intranet"
>
  <div class="relative flex h-3 w-3 items-center justify-center">
    <!-- El circulo animado de fondo (pulso) -->
    <span
      class={`absolute inline-flex h-full w-full animate-ping rounded-full ${currentConfig.pulse} opacity-75`}
    ></span>
    <!-- El circulo sólido central -->
    <span
      class={`relative inline-flex h-2 w-2 rounded-full ${currentConfig.color}`}
    ></span>
  </div>
  <span class="text-sm font-medium text-foreground/70"
    >{currentConfig.text}</span
  >
</div>
