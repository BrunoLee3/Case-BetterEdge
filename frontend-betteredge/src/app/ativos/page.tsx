type Ativo = {
  nome: string;
  valor: number;
};

export default async function Ativos() {

  const res = await fetch("http://localhost:3001/ativos");
  const data = await res.json(); 

  const ativos = data.ativos; 

  console.log("Ativos:", ativos); 

  return (
    <div className="py-10">
        <h1 className="text-2xl font-bold">Ativos disponíveis</h1>
      <div className="grid grid-cols-4 gap-4 ">

        {Array.isArray(ativos) ? (
          ativos.map((ativo: Ativo, index: number) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg text-gray-700"
            >
              <p className="font-semibold">Nome: {ativo.nome}</p>
              <p>Valor: {ativo.valor}</p>
            </div>
          ))
        ) : (
          <p className="text-red-500">Erro: Dados de ativos inválidos.</p>
        )}
      </div>
    </div>
  );
}
