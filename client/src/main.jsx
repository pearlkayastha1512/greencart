import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
    </BrowserRouter>
)

{/* <BrowserRouter>
Wraps your entire app.

Enables URL routing, like navigating between pages (/login, /cart, etc.).

Without this, useNavigate, Link, and <Route> won’t work.

🧠 <AppContextProvider>
Wraps the app with your custom context provider.

This allows you to share global state (like user, cartItems, etc.) with any component using useAppContext().

🚀 <App />
Your main app component.

Usually contains your routes, layout, and logic.

Everything else is nested inside App.

 */}

//  index.html (with <div id="root">)
//        ↓
// index.jsx or main.jsx
//        ↓
// <BrowserRouter>
//    <AppContextProvider>
//       <App />
//    </AppContextProvider>
// </BrowserRouter>
//        ↓
// App.jsx → Routes → Components
//        ↓
// Each component:
//  - useState / useEffect
//  - fetch data / render UI
//  - uses context via useAppContext()
//        ↓
// User Interaction (click, type, etc.)
//        ↓
// State Updates → Component Re-renders
//        ↓
// React updates the DOM
