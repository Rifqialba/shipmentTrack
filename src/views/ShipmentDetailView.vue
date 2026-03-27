<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, computed } from "vue";
import { useShipmentStore } from "../stores/shipment";
import { transporters } from "../data/shipment";

const route = useRoute();
const router = useRouter();
const store = useShipmentStore();

const shipmentId = route.params.id;
const shipment = computed(() => store.getById(shipmentId));

const selectedTransporter = ref("");
const message = ref("");
const error = ref("");

const assignTransporter = () => {
  message.value = "";
  error.value = "";

  if (!selectedTransporter.value) {
    error.value = "mohon pilih transporter";
    return;
  }

  const success = store.assignTransporter(shipmentId, selectedTransporter.value);

  if (success) {
    message.value = "berhasil menugaskan transporter";
    selectedTransporter.value = "";
  } else {
    error.value = "gagal menugaskan transporter";
  }
};

const goBack = () => {
  router.push("/");
};
</script>

<template>
  <div v-if="shipment" class="space-y-6">
    <!-- back -->
    <button @click="goBack" class="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition">
      ← Kembali ke daftar
    </button>

    <!-- detail dari kartu -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-5 sm:p-6 border-b border-gray-100">
        <div class="flex flex-wrap justify-between items-start gap-3">
          <div>
            <h2 class="text-xl font-semibold text-gray-900">Shipment Detail</h2>
            <p class="text-sm text-gray-500 mt-1">ID: {{ shipment.id }}</p>
          </div>
          <span
            class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
            :class="shipment.transporter ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"
          >
            {{ shipment.transporter ? "Assigned" : "Pending" }}
          </span>
        </div>
      </div>

      <div class="p-5 sm:p-6 space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Rute</p>
            <p class="mt-1 text-gray-900">{{ shipment.origin }} → {{ shipment.destination }}</p>
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</p>
            <p class="mt-1 text-gray-900">{{ shipment.vehicleType }}</p>
          </div>
          <div class="sm:col-span-2">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wider">Transporter</p>
            <p class="mt-1 text-gray-900">{{ shipment.transporter || "Not assigned yet" }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- kartu assign -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100">
      <div class="p-5 sm:p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Assign Transporter</h3>

        <div class="space-y-4">
          <select
            v-model="selectedTransporter"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none transition"
          >
            <option value="">Select a transporter</option>
            <option v-for="t in transporters" :key="t" :value="t">
              {{ t }}
            </option>
          </select>

          <button
            @click="assignTransporter"
            :disabled="!selectedTransporter"
            class="w-full sm:w-auto inline-flex justify-center items-center px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-300 focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Assign
          </button>

          <!-- pesan feedback -->
          <div v-if="message" class="mt-3 p-3 rounded-lg bg-green-50 text-green-800 text-sm">
            {{ message }}
          </div>
          <div v-if="error" class="mt-3 p-3 rounded-lg bg-red-50 text-red-800 text-sm">
            {{ error }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col items-center justify-center py-12 text-center">
    <p class="text-gray-400">Shipment tidak ditemukan</p>
    <button @click="goBack" class="mt-4 text-sm text-gray-600 hover:text-gray-900">← kembali ke daftar</button>
  </div>
</template>
