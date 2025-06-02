import React, { useEffect, useState } from 'react';
import Toast from './Toast';
import api from '../api/api';
import MovieForm from './MovieForm';

function MoviesList() {
    const [movies, setMovies] = useState([]);
    const [movieToEdit, setMovieToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 3;

    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    const fetchMovies = () => {
        api.get('/movies')
            .then(res => setMovies(res.data))
            .catch(err => console.error('Error al obtener películas:', err));
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('¿Eliminar esta película?')) {
            api.delete(`/movies/${id}`)
                .then(() => {
                    showToast('Película eliminada correctamente.', 'success');
                    fetchMovies();
                })
                .catch(err => {
                    console.error('Error al eliminar:', err);
                    showToast('Error al eliminar la película.', 'error');
                });
        }
    };

    const [toast, setToast] = useState({ message: '', type: '' });

    const showToast = (message, type = "success") => {
        setToast({ message, type });
    };

    const hideToast = () => setToast({ message: '', type: '' });

    const handleSuccess = () => {
        fetchMovies();
        setMovieToEdit(null);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <MovieForm
                movieToEdit={movieToEdit}
                onSuccess={() => {
                    setMovieToEdit(null);
                    fetchMovies();
                    handleSuccess();
                }}
                showToast={showToast}
            />

            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Películas Registradas</h2>

                <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
                    <table className="min-w-full bg-white text-left text-sm">
                        <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Título</th>
                                <th className="px-4 py-3">Director</th>
                                <th className="px-4 py-3">Género</th>
                                <th className="px-4 py-3">Año</th>
                                <th className="px-4 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMovies.map((movie) => (
                                <tr key={movie.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2">{movie.id}</td>
                                    <td className="px-4 py-2">{movie.title}</td>
                                    <td className="px-4 py-2">{movie.director?.name}</td>
                                    <td className="px-4 py-2">{movie.genre?.name}</td>
                                    <td className="px-4 py-2">{movie.release_year}</td>
                                    <td className="px-4 py-2 space-x-2">
                                        <button
                                            onClick={() => setMovieToEdit(movie)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-3 py-1 rounded-lg transition"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(movie.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded-lg transition"
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-4 mb-5 space-x-2">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-xl"
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </button>

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-xl ${currentPage === i + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-xl"
                            disabled={currentPage === totalPages}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {toast.message && (
                <Toast message={toast.message} type={toast.type} onClose={hideToast} />
            )}
        </div>
    );
}

export default MoviesList;