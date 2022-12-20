export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      try {
        redirect('/login')
      } catch (error) {
        console.log(error)
      }
      return Promise.resolve(false)
    }
  })
}
