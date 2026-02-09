// Listado de tareas mock
let tasks = [];

export async function GET() {
  return Response.json(tasks);
}

export async function POST(request) {
  const body = await request.json();
  const newTask = { id: Date.now(), ...body };
  tasks.push(newTask);
  return Response.json(newTask, { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  const { id, ...updates } = body;
  tasks = tasks.map(task => (task.id === id ? { ...task, ...updates } : task));
  return Response.json({ success: true });
}

export async function DELETE(request) {
  const body = await request.json();
  const { id } = body;
  tasks = tasks.filter(task => task.id !== id);
  return Response.json({ success: true });
}
