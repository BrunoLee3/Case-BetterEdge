import { prisma } from "../database/prismaClient";

const ativosRoutes = (fastify, options, done) => {
    
  const ativos = [
    { id: 1, nome: 'Ação ABC', valor: 111.43 },
    { id: 2, nome: 'Ação EFG', valor: 53.96 },
    { id: 3, nome: 'Fundo HIJ', valor: 99.79 },
  ];

  fastify.post('/', async(req, reply) =>{
    try {
      const result = await prisma.ativo.createMany({
      data: ativos,
      })

      reply.send(result)

    } catch (error) {
      reply.send(error)
    }
  })

  fastify.get('/', async (req, reply) => {
    try{
      return { ativos };
    }catch(error){
      reply.send(error)
    }
  })

    done()
}

export default ativosRoutes