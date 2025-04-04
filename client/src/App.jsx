// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AuthForm from './components/authentication'; // Adjust the path based on where the AuthForm component is located
// import SplineLandingPage from './pages/landing'; // Adjust the path based on where the SplineLandingPage component is located
// import Home from './pages/Home'; // Adjust the path based on where the Home component is located

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<SplineLandingPage />} /> {/* Landing page route */}
//         <Route path="/auth" element={<AuthForm />} /> 
//         <Route path="/home" element={<Home />} /> {/* Home page route */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;






import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplineLandingPage from './pages/landing';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplineLandingPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;