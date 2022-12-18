<script>
export default {
  layout: 'dashboard',
  middleware({ redirect }) {
    return redirect('/dashboard/items')
  },
}
</script>
