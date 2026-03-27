import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useShipmentStore } from "../stores/shipment";

describe("Store Shipment", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShipmentStore();

    // reset lagi datanya
    store.shipments = [
      {
        id: "SHP001",
        origin: "Jakarta",
        destination: "Bandung",
        vehicleType: "Truck",
        transporter: null,
        status: "Not Assigned",
      },
      {
        id: "SHP002",
        origin: "Surabaya",
        destination: "Malang",
        vehicleType: "Van",
        transporter: null,
        status: "Not Assigned",
      },
    ];
    store.isSimulationActive = false;
    if (store.simulationInterval) {
      clearInterval(store.simulationInterval);
      store.simulationInterval = null;
    }
  });

  afterEach(() => {
    if (store.simulationInterval) {
      clearInterval(store.simulationInterval);
      store.simulationInterval = null;
    }
  });

  it("berhasil menugaskan transporter", () => {
    const result = store.assignTransporter("SHP001", "JNE Logistics");
    expect(result).toBe(true);
    const shipment = store.getById("SHP001");
    expect(shipment.transporter).toBe("JNE Logistics");
    expect(shipment.status).toBe("Assigned");
  });

  it("gagal menugaskan karena pengiriman tidak ditemukan", () => {
    const result = store.assignTransporter("INVALID", "JNE Logistics");
    expect(result).toBe(false);
  });

  describe("simulasi realtime", () => {
    it("memulai simulasi dan memperbarui status pengiriman setiap 5 detik", async () => {
      vi.useFakeTimers();

      store.startRealtimeSimulation();
      expect(store.isSimulationActive).toBe(true);

      const statusAwal = store.shipments[0].status;

      vi.advanceTimersByTime(5000);
      const adaPerubahan = store.shipments.some((s) => s.status !== statusAwal);
      expect(adaPerubahan).toBe(true);

      store.stopRealtimeSimulation();
      vi.useRealTimers();
    });

    it("tidak memulai simulasi jika sudah aktif", () => {
      vi.useFakeTimers();
      store.startRealtimeSimulation();
      const idIntervalPertama = store.simulationInterval;
      store.startRealtimeSimulation();
      expect(store.simulationInterval).toBe(idIntervalPertama);
      vi.useRealTimers();
    });

    it("menghentikan simulasi dan membersihkan interval", () => {
      vi.useFakeTimers();
      store.startRealtimeSimulation();
      expect(store.isSimulationActive).toBe(true);
      expect(store.simulationInterval).not.toBeNull();

      store.stopRealtimeSimulation();
      expect(store.isSimulationActive).toBe(false);
      expect(store.simulationInterval).toBeNull();

      // tidak ada perubahan lagi harusnya setelah dihentikan live nya
      const statusSebelum = store.shipments[0].status;
      vi.advanceTimersByTime(5000);
      expect(store.shipments[0].status).toBe(statusSebelum);

      vi.useRealTimers();
    });
  });
});
