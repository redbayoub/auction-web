<script>
export default {
  name: 'IndexPage',
  middleware({ $auth, redirect }) {
    try {
      if ($auth.user.data.isAdmin) return redirect('/dashboard')
      else return redirect('/items')
    } catch (error) {
      console.log(error)
    }
  },
}
</script>
