import AppProvider from './context/AppProvider.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}

export default App
