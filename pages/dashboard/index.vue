<script>
export default {
  layout: 'dashboard',
  middleware({ redirect }) {
    try {
      return redirect('/dashboard/items')
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
