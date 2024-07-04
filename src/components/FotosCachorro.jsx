import { useState, useEffect } from "react";

export default function FotosCachorro() {
    const [cachorro, setCachorro] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1');
            const data = await response.json();
            setCachorro(data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const nextCachorro = () => {
        fetchData();
    };

    return (
        <div className="cachorro">
            <h1>Fotos de Cachorro</h1>
            <button onClick={nextCachorro}>Próximo</button>
            {cachorro && <img src={cachorro.url} alt="Cachorro" />}
        </div>
    );
}
