const { z } = require('zod');

exports.orderSchema = z.object({
  numeroPedido: z.string().min(1),
  valorTotal: z.number().positive(),
  dataCriacao: z.string().min(1),
  items: z.array(
    z.object({
      idItem: z.string().min(1),
      quantidadeItem: z.number().positive(),
      valorItem: z.number().positive()
    })
  )
});
