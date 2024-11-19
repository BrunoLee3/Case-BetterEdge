import { revalidatePath } from "next/cache";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button"


type Cliente = {
  id: number;
  nome: string;
  email: string;
  status: string;
};

export default async function Users() {

  const res = await fetch("http://localhost:3001/clientes/");
  const users = await res.json();

    async function addCLiente(formData: FormData) {
        "use server";
        const nome = formData.get("nome");
        const email = formData.get("email");

        const res = await fetch("http://localhost:3001/clientes/",{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ nome, email }),
        });

        const newUser = await res.json();
        console.log(newUser);
        revalidatePath("/clientes");
    }

  return (
    <div className="py-10">
      <form action={addCLiente} className="mb-4">
        <input type="text" name="nome" required placeholder="nome" className="p-2 mr-2 border border-gray-300 rounded text-gray-700" />
        <input type="text" name="email" required placeholder="email" className="p-2 mr-2 border border-gray-300 rounded text-gray-700" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Adicionar cliente</button>
      </form>
      <div className="grid grid-cols-4 gap-4 ">
        {users.map((user: Cliente) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            Nome: {user.nome} <br />
            Email: {user.email} <br />
            Status: {user.status} 
            <span className="mx-1"></span>
            <Link href={`/clientes/${user.id}`} className={buttonVariants({ variant: "outline" })}>Editar</Link>
            <Link href={`/clientes/${user.id}/ativos`} className={buttonVariants({ variant: "outline" })}>Ver ativos</Link>

          </div>
        ))}
      </div>
    </div>
  );
}