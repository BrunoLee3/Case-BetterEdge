import {prisma} from '../database/prismaClient.ts'

const clientesRoutes = (fastify, options, done) => {

    //rota GET
    fastify.get('/', async (req, reply) => {
        try {
            const clientes = await prisma.cliente.findMany({
                include: {
                    alocacoes: {
                        include: {
                            ativo: true,
                        }
                    }
                }
            });
      
            const clientesComAtivos = clientes.map(cliente => ({
                id: cliente.id,
                nome: cliente.nome,
                email: cliente.email,
                status: cliente.status,
                ativos: cliente.alocacoes.map(alocacao => ({
                    nome: alocacao.ativo.nome,
                    valor: alocacao.ativo.valor,
                    quantidade: alocacao.quantidade
                }))
            }));
        
            reply.send(clientesComAtivos);
        } catch (error) {
          reply.send(error)
        }
      });
      

    //rota POST
    fastify.post('/', async (req, reply) => {
        const {nome, email} = req.body

        try{
            const cliente = await prisma.cliente.create({
                data:{
                    nome, 
                    email, 
                }
            })
            reply.send(cliente)

        }catch(error){
            reply.send(error)
        }
    })

    //rota PUT
    fastify.put('/:id', async (req, reply) => {
        const { id } = req.params
        const {nome, email, status} = req.body

        try{
            const cliente = await prisma.cliente.update({
                where: {
                    id: Number(id)
                },
                data: {
                    nome,
                    email,
                    status
                }
            })

            return reply.send(cliente)

        }catch(error){
            reply.send(error)
        }
    })

    //rota GET ID
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params;
      
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id) },

            include: {
                alocacoes: {
                    include: {
                        ativo: true, 
                    }
                }
            },
        });
      
        if (!cliente) {
            return reply.status(404).send({ message: 'Cliente não encontrado' });
        }
      
        const ativosAlocados = cliente.alocacoes.map(alocacao => ({
            nome: alocacao.ativo.nome,
            valor: alocacao.ativo.valor,
            quantidade: alocacao.quantidade,
        }));
      
        reply.send({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            status: cliente.status,
            ativos: ativosAlocados
        });
    });

    //rota DELETE
    fastify.delete('/:id', async (req, reply) => {
        const {id} = req.params

        try {
            await prisma.cliente.delete({
                where: {
                    id: Number(id)
                }
            })
    
            reply.send(`registro ${id} excluido`)
            
        } catch (error) {
            reply.send(error)
        }
    })

  // Rota para alocar ativos a um cliente específico
    fastify.patch('/:id/alocar', async (request, reply) => {
        const { id } = request.params;
        const { ativoNome, quantidade } = request.body;
    
        const cliente = await prisma.cliente.findUnique({
            where: { id: Number(id) },
        });
    
        if (!cliente) {
            return reply.status(404).send({ message: 'Cliente não encontrado' });
        }
    
        const ativo = await prisma.ativo.findUnique({
            where: { nome: ativoNome },
        });
    
        if (!ativo) {
            return reply.status(400).send({ message: 'Ativo não disponível' });
        }
    
        const alocacaoExistente = await prisma.ativoAlocado.findFirst({
            where: {
                clienteId: Number(id),
                ativoId: ativo.id,
            },
        });
    
        let alocacao;
    
        if (alocacaoExistente) {
        alocacao = await prisma.ativoAlocado.update({
            where: { id: alocacaoExistente.id },
            data: { quantidade: alocacaoExistente.quantidade + quantidade },
        });
        } else {
        alocacao = await prisma.ativoAlocado.create({
            data: {
                clienteId: Number(id),
                ativoId: ativo.id,
                quantidade,
            },
        });
        }
    
        reply.send(alocacao);
    });


    done();
}

export default clientesRoutes