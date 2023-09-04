import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import AuthProvider from "./context/AuthProvider"
import { StyleThemeProvider } from "./context/StyleThemeContext"

function App() {

  return (
    <AuthProvider>
      <StyleThemeProvider>
        <RouterProvider router={router} />
      </StyleThemeProvider>
    </AuthProvider>
  )
}

export default App
