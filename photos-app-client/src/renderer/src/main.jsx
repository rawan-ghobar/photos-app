import './assets/main.css'
import { SelectedImageProvider } from './context/SelectedImageContext'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SelectedImageProvider>
    <App />
  </SelectedImageProvider>
)
