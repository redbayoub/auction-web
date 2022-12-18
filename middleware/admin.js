export default function ({ redirect, $auth }) {
  const isAuthorized = $auth.user.data.isAdmin
  if (!isAuthorized) {
    return redirect({ name: 'IndexPage' })
  }
}
