export default function ({ store, route, redirect, error }) {
  // If user not connected, redirect to /
  if (!store.state.loggedIn) {
    if (route.path !== '/' && route.path !== '/login' && route.path !== '/register') {
      return redirect('/')
    }
  }
}
