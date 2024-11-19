import { redirect } from "next/navigation";

export default async function ClientePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(`http://localhost:3001/clientes/${id}`, { cache: "no-store" });

  if (!res.ok) {
    return (
      <div className="py-10">
        <h1>Cliente não encontrado</h1>
      </div>
    );
  }

  const cliente = await res.json();

  async function updateCliente(formData: FormData) {
    "use server"; 

    const id = formData.get("id")?.toString();
    const nome = formData.get("nome")?.toString();
    const email = formData.get("email")?.toString();
    const status = formData.get("status")?.toString();

    if (!id || !nome || !email || !status) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    if (status !== "ativo" && status !== "inativo") {
        throw new Error("O campo status deve ser 'ativo' ou 'inativo'.");
      }

    const res = await fetch(`http://localhost:3001/clientes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email, status }),
    });

    if (!res.ok) {
      throw new Error("Erro ao atualizar o cliente.");
    }

    const updatedCliente = await res.json();
    console.log("Cliente atualizado:", updatedCliente);

    redirect("/clientes");
  }

  return (
    <div className="py-10">
      <h1>Editar Cliente</h1>
      <form action={updateCliente} className="mt-4">
        <input type="hidden" name="id" value={cliente.id} />

        Nome:
        <input
          type="text"
          name="nome"
          required
          defaultValue={cliente.nome}
          className="p-2 mr-2 border border-gray-300 rounded text-gray-700"
        />
        Email:
        <input
          type="email"
          name="email"
          required
          defaultValue={cliente.email}
          className="p-2 w-80 mr-2 border border-gray-300 rounded text-gray-700"
        />
        Status:
        <select
        name="status"
        required
        defaultValue={cliente.status}
        className="p-2 mr-2 w-20 border border-gray-300 rounded text-gray-700"
        >
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
        </select>


        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Atualizar
        </button>
      </form>
    </div>
  );
}
