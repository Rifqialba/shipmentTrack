<script setup>
import { useShipmentStore } from "./stores/shipment";
import { storeToRefs } from "pinia";

const store = useShipmentStore();
const { isSimulationActive } = storeToRefs(store);

// akan memulai simulasi secara otomatis saat web dibuka
store.startRealtimeSimulation();

const toggleSimulation = () => {
  if (isSimulationActive.value) {
    store.stopRealtimeSimulation();
  } else {
    store.startRealtimeSimulation();
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 class="text-2xl font-semibold text-gray-900 tracking-tight">ShipmentTrack_TestSkill_FE</h1>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm">
            <span class="relative flex h-2 w-2">
              <span
                v-if="isSimulationActive"
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2"
                :class="isSimulationActive ? 'bg-green-500' : 'bg-gray-400'"
              ></span>
            </span>
            <span class="text-gray-500">
              {{ isSimulationActive ? "Live updates aktif" : "live update nonaktif" }}
            </span>
          </div>

          <button
            @click="toggleSimulation"
            class="px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-100 transition"
          >
            {{ isSimulationActive ? "nonaktif" : "aktif" }}
          </button>
        </div>
      </div>

      <router-view />
    </div>
  </div>
</template>
