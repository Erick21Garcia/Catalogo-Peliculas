import React, { useEffect, useState } from 'react';
import api from '../api/api';

function GenresList() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        api.get('/genres')
            .then(response => setGenres(response.data))
            .catch(error => console.error('Error al cargar géneros:', error));
    }, []);

    return (
        <div>
            <h2>Lista de Géneros</h2>
            <ul>
                {genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default GenresList;
