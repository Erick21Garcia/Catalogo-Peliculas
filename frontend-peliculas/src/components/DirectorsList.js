import React, { useEffect, useState } from 'react';
import api from '../api/api';

function DirectorsList() {
    const [directors, setDirectors] = useState([]);

    useEffect(() => {
        api.get('/directors')
            .then(response => setDirectors(response.data))
            .catch(error => console.error('Error al cargar directores:', error));
    }, []);

    return (
        <div>
            <h2>Lista de Directores</h2>
            <ul>
                {directors.map(director => (
                    <li key={director.id}>{director.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default DirectorsList;