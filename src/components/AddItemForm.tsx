import { useState } from "react";

const API_URL = "http://127.0.0.1:3000";

type Props = {
  onItemAdded: () => void;
};

export default function AddItemForm({ onItemAdded }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState(0);
  const [petXp, setPetXp] = useState(0);
  const [craftable, setCraftable] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          type,
          price,
          craftable,
          petXp,
        }),
      });

      const data = await res.json();

      console.log("Item ajouté :", data);

      // reset form
      setName("");
      setType("");
      setPrice(0);
      setPetXp(0);
      setCraftable(false);

      // refresh table
      onItemAdded();
    } catch (err) {
      console.error("Erreur ajout item :", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 30,
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
      }}
    >
      <input
        type="text"
        placeholder="Nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />

      <input
        type="number"
        placeholder="Prix"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      />

      <input
        type="number"
        placeholder="XP familier"
        value={petXp}
        onChange={(e) => setPetXp(Number(e.target.value))}
      />

      <label>
        Craftable
        <input
          type="checkbox"
          checked={craftable}
          onChange={(e) => setCraftable(e.target.checked)}
        />
      </label>

      <button type="submit">
        Ajouter
      </button>
    </form>
  );
}