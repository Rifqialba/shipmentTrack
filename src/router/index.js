import { createRouter, createWebHistory } from 'vue-router'
import ShipmentListView from '../views/ShipmentListView.vue'
import ShipmentDetailView from '../views/ShipmentDetailView.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: ShipmentListView
  },
  {
    path: '/shipment/:id',
    name: 'detail',
    component: ShipmentDetailView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router