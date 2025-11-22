import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">Bienvenido</h1>

      {/* Métricas mínimas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total de eventos</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">–</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Última actualización</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-500">
            Sin datos aún
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Categorías activas</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">–</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href="/events/create"
              className="text-blue-600 hover:underline"
            >
              Crear evento
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Placeholder de últimos eventos */}
      <Card>
        <CardHeader>
          <CardTitle>Últimos eventos</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-slate-500">
          Aún no hay eventos.  
          <Link href="/events" className="text-blue-600 hover:underline ml-1">
            Crear uno ahora
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
