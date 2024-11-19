import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Case BetterEdge</h1>
        <p className="text-lg text-gray-700 mb-6">
          Explore a lista de clientes e aloque ativos de forma simples.
        </p>
        <div className="space-x-4">
          <Link href="/clientes" className="bg-blue-500 text-white px-4 py-2 rounded">
            Ver Clientes
          </Link>
          <Link href="/ativos" className="bg-green-500 text-white px-4 py-2 rounded">
            Ver Ativos
          </Link>
        </div>
      </div>
    </div>
  );
}
