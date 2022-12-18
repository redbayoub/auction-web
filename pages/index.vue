<script>
export default {
  name: 'IndexPage',
  middleware({ $auth, redirect }) {
    if ($auth.user.data.isAdmin) return redirect('/dashboard')
    else return redirect('/items')
  },
}
</script>
