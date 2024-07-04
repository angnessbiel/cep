import { useState } from "react";

export default function BuscarCep(){
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState(null);
    const [erro, setErro] = useState(null);

    const fetchData = async () => {
        setErro(null);
        setEndereco(null);

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                setErro('CEP não encontrado.');
            } else {
                setEndereco(data);
            }
        } catch (error) {
            setErro('Erro ao buscar CEP.');
            console.error(error);
        }
    };

    return (
        <div className="content">
            <h1>Buscar endereço por CEP</h1>
            <input
                type="text"
                value={cep}
                placeholder="Digite aqui"
                onChange={(e) => setCep(e.target.value)}
            />

            <button onClick={fetchData}>Buscar</button>

            {erro && <p>{erro}</p>}

            {endereco && (
                <div className="endereco">
                    <h2>Endereço</h2>
                    <p>Rua: {endereco.logradouro}</p>
                    <p>Bairro: {endereco.bairro}</p>
                    <p>Cidade: {endereco.localidade}</p>
                    <p>UF: {endereco.uf}</p>
                </div>
            )}
        </div>
    );
}
