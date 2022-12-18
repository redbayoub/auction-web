<template>
  <div class="flex gap-3">
    <span class="p-3 w-20 rounded shadow flex flex-col justify-center">
      <span class="text-lg font-semibold"> {{ days | twoDigits }}</span>
      <span class="text-sm">Days</span>
    </span>
    <span class="p-3 w-20   rounded shadow flex flex-col justify-center">
      <span class="text-lg font-semibold"> {{ hours | twoDigits }}</span>
      <span class="text-sm">Hours</span>
    </span>
    <span class="p-3 w-20   rounded shadow flex flex-col justify-center">
      <span class="text-lg font-semibold"> {{ minutes | twoDigits }}</span>
      <span class="text-sm">Minutes</span>
    </span>
    <span class="p-3 w-20   rounded shadow flex flex-col justify-center">
      <span class="text-lg font-semibold"> {{ seconds | twoDigits }}</span>
      <span class="text-sm">Seconds</span>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      now: Math.floor(new Date().getTime() / 1000),
      event: this.date,
      finish: false,
      timer: null,
    }
  },
  props: {
    date: {
      required: true,
    },
  },
  beforeDestroy() {
    this.timer = null
  },
  mounted() {
    const _self = this
    this.timer = setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000)
      if (!this.finish && this.calculatedDate - this.now <= 0) {
        _self.finish = true
        _self.$emit('on-finish')
      }
    }, 1000)
  },
  computed: {
    secondCount() {
      return this.calculatedDate - this.now
    },
    calculatedDate() {
      return Math.trunc(Date.parse(this.event) / 1000)
    },
    seconds() {
      if (this.secondCount < 0) return 0
      return this.secondCount % 60
    },
    minutes() {
      if (this.secondCount < 0) return 0
      return Math.trunc(this.secondCount / 60) % 60
    },
    hours() {
      if (this.secondCount < 0) return 0
      return Math.trunc(this.secondCount / 60 / 60) % 24
    },
    days() {
      if (this.secondCount < 0) return 0
      return Math.trunc(this.secondCount / 60 / 60 / 24)
    },
  },
  filters: {
    twoDigits(value) {
      if (value.toString().length <= 1) {
        return '0' + value.toString()
      }
      return value.toString()
    },
  },
}
</script>