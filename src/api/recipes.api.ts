const API = "http://localhost:3000";

export async function createRecipe(data: any) {
  const res = await fetch(`${API}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function getItemProfit(itemId: string) {
  const res = await fetch(
    `${API}/recipes/item/${itemId}/profit`
  );

  if (!res.ok) return null;

  return res.json();
}