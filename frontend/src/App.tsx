import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import AuthProvider from "./context/AuthProvider"
import { StyleThemeProvider } from "./context/StyleThemeContext"
import DateRangeProvider from "./context/DateRangeContext"

function App() {

  return (
    <AuthProvider>
      <StyleThemeProvider>
        <DateRangeProvider>
          <RouterProvider router={router} />
        </DateRangeProvider>
      </StyleThemeProvider>
    </AuthProvider>
  )
}

export default App
