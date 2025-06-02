import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="mt-6 text-4xl font-bold text-gray-800 text-center mb-6">Biblioteca de películas</h1>
      <MoviesList />
    </div>
  );
}

export default App;