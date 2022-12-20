export default function ({ redirect, $auth }) {
  const isAuthorized = $auth.user.data.isAdmin
  if (!isAuthorized) {
    try {
      return redirect({ name: 'IndexPage' })
    } catch (error) {
      console.log(error)
    }
  }
}
