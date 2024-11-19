import Fastify from "fastify";
import clientesRoutes from "./routes/clientesRoutes";
import ativosRoutes from "./routes/ativosRoutes";

const app = Fastify({logger: true})

app.register(clientesRoutes, {prefix: '/clientes'})
app.register(ativosRoutes, {prefix: '/ativos'})

try {
    app.listen({port: 3001})
    
} catch (error) {
    app.log.error(error)
    process.exit(1)
}