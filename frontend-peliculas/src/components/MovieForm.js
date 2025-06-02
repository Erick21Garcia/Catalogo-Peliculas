import React, { useState, useEffect } from 'react';
import api from '../api/api';

function MovieForm({ movieToEdit, onSuccess, showToast }) {
    const [title, setTitle] = useState('');
    const [directorId, setDirectorId] = useState('');
    const [genreId, setGenreId] = useState('');
    const [release_year, setRelease_year] = useState('');
    const [directors, setDirectors] = useState([]);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        api.get('/directors').then(res => setDirectors(res.data));
        api.get('/genres').then(res => setGenres(res.data));
    }, []);

    useEffect(() => {
        if (movieToEdit) {
            setTitle(movieToEdit.title);
            setDirectorId(movieToEdit.director_id);
            setGenreId(movieToEdit.genre_id);
            setRelease_year(movieToEdit.release_year);
        }
    }, [movieToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title,
            director_id: directorId,
            genre_id: genreId,
            release_year,
        };

        const resetForm = () => {
            setTitle('');
            setDirectorId('');
            setGenreId('');
            setRelease_year('');
        };

        if (movieToEdit) {
            api.put(`/movies/${movieToEdit.id}`, payload)
                .then(() => {
                    showToast('Película actualizada con éxito.', 'success');
                    resetForm();
                    onSuccess();
                })
                .catch(err => {
                    console.error('Error al actualizar película:', err);
                    showToast('Error al actualizar película.', 'error');
                });
        } else {
            api.post('/movies', payload)
                .then(() => {
                    showToast('Película agregada con éxito.', 'success');
                    resetForm();
                    onSuccess();
                })
                .catch(err => {
                    console.error('Error al guardar película:', err);
                    showToast('Error al guardar película.', 'error');
                });
        }
    };

    return (
        <div className="relative">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    {movieToEdit ? 'Editar Película' : 'Agregar Película'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full bg-gray-50 focus:bg-white px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Director</label>
                        <select
                            value={directorId}
                            onChange={(e) => setDirectorId(e.target.value)}
                            required
                            className="w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Selecciona un director</option>
                            {directors.map(d => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Género</label>
                        <select
                            value={genreId}
                            onChange={(e) => setGenreId(e.target.value)}
                            required
                            className="w-full bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        >
                            <option value="">Selecciona un género</option>
                            {genres.map(g => (
                                <option key={g.id} value={g.id}>{g.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Año de estreno</label>
                        <input
                            type="text"
                            value={release_year}
                            onChange={(e) => setRelease_year(e.target.value)}
                            required
                            className="w-full bg-gray-50 focus:bg-white px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition"
                    >
                        {movieToEdit ? 'Actualizar Película' : 'Guardar Película'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default MovieForm;