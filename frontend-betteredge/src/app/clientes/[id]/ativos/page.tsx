import { revalidatePath } from "next/cache";

type Ativo = {
  nome: string;
  valor: number;
  quantidade: number;
};

type Cliente = {
  id: number;
  nome: string;
  email: string;
  status: string;
  ativos: Ativo[];
};

export default async function ClienteAtivos({ params }: { params: { id: string } }) {
  const clienteId = params.id;

  const res = await fetch(`http://localhost:3001/clientes/${clienteId}`);
  const cliente: Cliente = await res.json();

  async function alocarAtivo(formData: FormData) {
    'use server'
    const ativoNome = formData.get("ativoNome")?.toString();
    const quantidade = Number(formData.get("quantidade"));
  
    if (!ativoNome || !quantidade || quantidade <= 0) {
      console.error("Nome do ativo ou quantidade inválida.");
      return;
    }
  
    const res = await fetch(`http://localhost:3001/clientes/${clienteId}/alocar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ativoNome, quantidade }),
    });
  
    if (!res.ok) {
      console.error("Erro ao enviar os dados:", await res.text());
      return;
    }
  
    const novoAtivo = await res.json();
    console.log("Ativo alocado com sucesso:", novoAtivo);
  
    revalidatePath(`/clientes/${clienteId}/ativos`);
  }
  

  return (
    <div className="py-10">
      <h1 className="text-2xl font-bold">Ativos do Cliente</h1>
      <p>Nome: {cliente.nome}</p>
      <p>Email: {cliente.email}</p>
      <p>Status: {cliente.status}</p>

      <h2 className="mt-6 text-xl font-semibold">Ativos Alocados:</h2>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {cliente.ativos.length > 0 ? (
          cliente.ativos.map((ativo, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg text-gray-700"
            >
              <p className="font-semibold">Nome: {ativo.nome}</p>
              <p>Valor: {ativo.valor}</p>
              <p>Quantidade: {ativo.quantidade}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Nenhum ativo alocado.</p>
        )}
      </div>

      <h2 className="mt-6 text-xl font-semibold">Alocar Novo Ativo:</h2>
      <form action={alocarAtivo} className="mt-4">
        <input
          type="text"
          name="ativoNome"
          required
          placeholder="Nome do ativo"
          className="p-2 mr-2 border border-gray-300 rounded text-gray-700"
        />
        <input
          type="number"
          name="quantidade"
          required
          placeholder="Quantidade"
          className="p-2 mr-2 border border-gray-300 rounded text-gray-700"
          min="1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Alocar
        </button>
      </form>
    </div>
  );
}
function fetchCliente() {
    throw new Error("Function not implemented.");
}

