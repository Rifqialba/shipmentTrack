<script setup>
import { useShipmentStore } from "../stores/shipment";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const store = useShipmentStore();
const { shipments } = storeToRefs(store);
const router = useRouter();

const goToDetail = (id) => {
  router.push(`/shipment/${id}`);
};
</script>

<template>
  <div>
    <!-- list headernya -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900">Daftar Shipments</h2>
    </div>

    <!-- tampilan dari sisi mobile -->
    <div class="space-y-3 md:hidden">
      <div
        v-for="item in shipments"
        :key="item.id"
        class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition hover:shadow-md"
      >
        <div class="flex justify-between items-start">
          <div>
            <p class="font-medium text-gray-900">{{ item.id }}</p>
            <p class="text-sm text-gray-500 mt-1">{{ item.origin }} → {{ item.destination }}</p>
          </div>
          <span
            class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
            :class="item.transporter ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"
          >
            {{ item.transporter ? "Assigned" : "Pending" }}
          </span>
        </div>
        <button
          @click="goToDetail(item.id)"
          class="mt-3 w-full py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          lihat detail
        </button>
      </div>
      <p v-if="shipments.length === 0" class="text-center text-gray-400 py-8">shipment tidak ditemukan</p>
    </div>

    <!-- tampilan dari sisi dekstop -->
    <div class="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID Shipment
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Titik Awal
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Destinasi
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" class="relative px-6 py-3">
              <span class="sr-only">Action</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr
            v-for="item in shipments"
            :key="item.id"
            class="hover:bg-gray-50 transition cursor-pointer"
            @click="goToDetail(item.id)"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.origin }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.destination }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="item.transporter ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'"
              >
                {{ item.transporter ? "Assigned" : "Pending" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button @click.stop="goToDetail(item.id)" class="text-gray-600 hover:text-gray-900 transition">
                Lihat Detail →
              </button>
            </td>
          </tr>
          <tr v-if="shipments.length === 0">
            <td colspan="5" class="px-6 py-8 text-center text-gray-400">shipment tidak ditemukan</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
