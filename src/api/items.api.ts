const API = "http://localhost:3000";

export async function getItems() {
  const res = await fetch(`${API}/items`);
  return res.json();
}

export async function createItem(data: any) {
  const res = await fetch(`${API}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function updateItem(id: string, data: any) {
  await fetch(`${API}/items/${id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
  
  export async function deleteItem(id: string) {
    await fetch(`${API}/items/${id}`, {
      method: "DELETE",
    });
  }