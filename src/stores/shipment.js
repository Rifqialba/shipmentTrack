import { defineStore } from "pinia";
import { shipments } from "../data/shipment";

export const useShipmentStore = defineStore("shipment", {
  state: () => ({
    shipments: [...shipments],
    isSimulationActive: false,
    simulationInterval: null,
  }),

  actions: {
    assignTransporter(id, transporter) {
      const shipment = this.shipments.find((s) => s.id === id);
      if (!shipment) return false;
      shipment.transporter = transporter;
      shipment.status = "Assigned";
      return true;
    },

    getById(id) {
      return this.shipments.find((s) => s.id === id);
    },

    startRealtimeSimulation() {
      // Jika sudah aktif, jangan buat interval baru
      if (this.isSimulationActive) return;

      this.simulationInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * this.shipments.length);
        const shipment = this.shipments[randomIndex];
        if (!shipment) return;

        if (shipment.status === "Assigned") {
          shipment.status = "Not Assigned";
          shipment.transporter = null;
        } else {
          shipment.status = "Assigned";
          shipment.transporter = "Auto Assigned";
        }
      }, 5000);

      this.isSimulationActive = true;
    },

    stopRealtimeSimulation() {
      if (this.simulationInterval) {
        clearInterval(this.simulationInterval);
        this.simulationInterval = null;
      }
      this.isSimulationActive = false;
    },
  },
});
