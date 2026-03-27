import { createServer } from "miragejs";

export function makeMockServer() {
  createServer({
    routes() {
      this.namespace = "api";

      let shipments = [
        {
          id: "S001",
          origin: "Jakarta",
          destination: "Surabaya",
          route: "Jakarta - Surabaya via Pantura",
          vehicleType: "Container Truck",
          assignedTransporter: null,
          status: "Not Assigned",
        },
        {
          id: "S002",
          origin: "Bandung",
          destination: "Semarang",
          route: "Bandung - Semarang via Tol Trans Jawa",
          vehicleType: "Flatbed Truck",
          assignedTransporter: "PT Cepat Kirim",
          status: "Assigned",
        },
        {
          id: "S003",
          origin: "Medan",
          destination: "Padang",
          route: "Medan - Padang via Bukittinggi",
          vehicleType: "Box Truck",
          assignedTransporter: null,
          status: "Not Assigned",
        },
      ];

      let transporters = [
        { id: "T001", name: "PT Cepat Kirim" },
        { id: "T002", name: "CV Aman Jaya" },
        { id: "T003", name: "Logistik Nusantara" },
      ];

      this.get("/shipments", () => {
        console.log("GET /shipments called");
        return shipments;
      });
      this.get("/transporters", () => {
        console.log("GET /transporters called");
        return transporters;
      });

      this.put("/shipments/:id", (schema, request) => {
        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        console.log(`PUT /shipments/${id}`, attrs);
        const index = shipments.findIndex((s) => s.id === id);
        if (index !== -1) {
          if (attrs.assignedTransporter !== undefined) {
            shipments[index].assignedTransporter = attrs.assignedTransporter;
          }
          shipments[index].status = shipments[index].assignedTransporter ? "Assigned" : "Not Assigned";
        }
        return shipments[index];
      });
    },
  });
}
