import { Ticket } from '../ticket';

it('implements optimistic cuncurrency control', async () => {
  // create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 4,
    userId: '123',
  });
  // save the ticket to the database
  await ticket.save();

  // fetch the ticket twice
  const firstInstance = await Ticket.findById(ticket.id);
  expect(firstInstance).not.toBeUndefined();
  const secondInstance = await Ticket.findById(ticket.id);
  expect(secondInstance).not.toBeUndefined();

  // make two seperate changes to the ticket we fetched
  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });
  // save first fetched ticket
  await firstInstance?.save();

  // save second fetched ticket
  try {
    await secondInstance?.save();
  } catch (error) {
    console.log(error);
    return;
  }

  throw new Error('should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const ticket = Ticket.build({
    title: 'concert',
    price: 4,
    userId: '123',
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});