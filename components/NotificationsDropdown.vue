<template>
  <li class="relative" v-if="isLoggedIn">
    <button
      @click.prevent="showDropdown = !showDropdown"
      id="dropdownNavbarLink"
      data-dropdown-toggle="dropdownNavbar"
      class="text-gray-700 pl-3 pr-4 py-2 hover:text-blue-700 md:p-0 font-medium flex items-center justify-between w-full md:w-auto"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        class="inline"
      >
        <path
          v-if="hasUnreadNotifications"
          d="M15.137 3.945c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.667 2.712-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6z"
        />
        <path
          v-else
          d="M15 21c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm.137-17.055c-.644-.374-1.042-1.07-1.041-1.82v-.003c.001-1.172-.938-2.122-2.096-2.122s-2.097.95-2.097 2.122v.003c.001.751-.396 1.446-1.041 1.82-4.668 2.709-1.985 11.715-6.862 13.306v1.749h20v-1.749c-4.877-1.591-2.193-10.598-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm-6.451 16c1.189-1.667 1.605-3.891 1.964-5.815.447-2.39.869-4.648 2.354-5.509 1.38-.801 2.956-.76 4.267 0 1.485.861 1.907 3.119 2.354 5.509.359 1.924.775 4.148 1.964 5.815h-12.903z"
        />
      </svg>
    </button>
    <!-- Dropdown menu -->
    <div
      id="dropdownNavbar"
      :class="{
        hidden: !showDropdown,
      }"
      class="text-base z-10 list-none divide-y divide-gray-100 rounded shadow-xl bg-gray-50 w-44 absolute right-0"
    >
      <ul class="py-1" aria-labelledby="dropdownLargeButton">
        <li
          v-for="notification in notifications"
          :key="notification.id"
          class="px-4 py-2 border-b"
          :class="{ 'bg-gray-200': notification.read_at == null }"
        >
          <div class="text-sm text-gray-700">
            {{ notification.data?.title }}
          </div>
          <div class="text-sm text-gray-500">{{ notification.data?.body }}</div>
        </li>
        <li class="border-t" v-if="notifications.length > 0">
          <a
            href="#"
            @click.prevent="clearNotifications()"
            class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2"
            >Clear All</a
          >
        </li>

        <li v-else>
          <span class="text-sm text-gray-400 block px-4 py-2">
            No notifications are available
          </span>
        </li>
      </ul>
    </div>
  </li>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$auth.loggedIn
    },
    hasUnreadNotifications() {
      const isUnread = (element) => element.read_at == null
      return this.isLoggedIn && this.notifications.some(isUnread)
    },
  },
  mounted() {
    this.getNotifications()
    // timeIntervalMS = 5min * 60 sec * 1000 ms
    const timeIntervalMS = 5 * 60 * 1000
    this.interval = setInterval(() => this.getNotifications(), timeIntervalMS)
  },
  beforeDestroy() {
    this.interval = null
  },
  data() {
    return {
      showDropdown: false,
      interval: null,
      notifications: [],
    }
  },
  watch: {
    showDropdown(newVal, oldVal) {
      if (!newVal && this.hasUnreadNotifications) this.markNotificationsAsRead()
    },
    isLoggedIn(newVal, oldVal) {
      if (newVal) this.getNotifications()
    },
  },
  methods: {
    async getNotifications() {
      if (!this.isLoggedIn) return
      const response = await this.$axios.$get('/api/user/notifications')
      this.notifications = response.data
    },
    async markNotificationsAsRead() {
      if (!this.isLoggedIn) return
      const response = await this.$axios.$put('/api/user/notifications')
      this.getNotifications()
    },

    async clearNotifications() {
      if (!this.isLoggedIn) return
      const response = await this.$axios.$delete('/api/user/notifications')
      this.notifications = []
      this.showDropdown = false
    },
  },
}
</script>
