const supabase = require('../config/supabase');

// converte JSON de entrada para o formato usado no banco
function mapIncomingOrder(body) {
  return {
    orderid: body.numeroPedido,
    value: body.valorTotal,
    creationdate: body.dataCriacao,
    items: (body.items || []).map(item => ({
      productid: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

exports.createOrder = async (req, res) => {
  try {
    const mapped = mapIncomingOrder(req.body);

    // cria o pedido
    const { error: orderError } = await supabase
      .from('orders')
      .insert({
        orderid: mapped.orderid,
        value: mapped.value,
        creationdate: mapped.creationdate
      });

    if (orderError) return res.status(400).json(orderError);

    // cria itens
    const itemsToInsert = mapped.items.map(i => ({
      orderid: mapped.orderid,
      ...i
    }));

    const { error: itemsError } = await supabase
      .from('items')
      .insert(itemsToInsert);

    if (itemsError) return res.status(400).json(itemsError);

    return res.status(201).json({ message: "Pedido criado com sucesso" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getOrder = async (req, res) => {
  const { orderId } = req.params;

  const { data: order } = await supabase
    .from('orders')
    .select('*')
    .eq('orderid', orderId)
    .single();

  if (!order) return res.status(404).json({ message: "Pedido não encontrado" });

  const { data: items } = await supabase
    .from('items')
    .select('*')
    .eq('orderid', orderId);

  return res.status(200).json({ ...order, items });
};

exports.listOrders = async (_req, res) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*');

  if (error) return res.status(400).json(error);

  return res.status(200).json(data);
};

exports.updateOrder = async (req, res) => {
  const { orderId } = req.params;
  const mapped = mapIncomingOrder(req.body);

  // atualiza pedido
  const { error } = await supabase
    .from('orders')
    .update({
      value: mapped.value,
      creationdate: mapped.creationdate
    })
    .eq('orderid', orderId);

  if (error) return res.status(400).json(error);

  // apaga items antigos
  await supabase.from('items').delete().eq('orderid', orderId);

  // insere novos items
  const itemsToInsert = mapped.items.map(i => ({
    orderid: orderId,
    ...i
  }));

  await supabase.from('items').insert(itemsToInsert);

  res.json({ message: "Pedido atualizado com sucesso" });
};

exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  const { error } = await supabase
    .from('orders')
    .delete()
    .eq('orderid', orderId);

  if (error) return res.status(400).json(error);

  res.json({ message: "Pedido deletado com sucesso" });
};
