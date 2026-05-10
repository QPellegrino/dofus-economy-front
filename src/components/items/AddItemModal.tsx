import { useEffect, useState } from "react";
import "./AddItemModal.scss"
import type { UserRole } from "../../utils/auth";

type Item = {
  _id: string;
  name: string;
};

type Ingredient = {
  itemId: string;
  quantity: number;
};

interface Props {
  item?: any;
  role: UserRole;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddItemModal({
  item,
  role,
  onClose,
  onSuccess,
}: Props) {
  const isAdmin = role === "admin";
  const isEditMode = Boolean(item?._id);

  const [items, setItems] = useState<Item[]>([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("ressource");
  const [price, setPrice] = useState(0);
  const [petXp, setPetXp] = useState(0);
  const [craftable, setCraftable] = useState(false);

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const authHeaders = () => {
    const headers: Record<string, string> = {};
    const token = localStorage.getItem("token");

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  };

  // 📦 LOAD ITEMS
  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch("http://localhost:3000/items");
      const data = await res.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  // ✏️ RESET / PREFILL MODE EDIT
  useEffect(() => {
    if (!item) return;

    setName(item.name ?? "");
    setType(item.type ?? "ressource");
    setPrice(item.price ?? 0);
    setPetXp(item.petXp ?? 0);
    setCraftable(item.craftable ?? false);

    // ⚠️ important reset ingredients en edit
    setIngredients([]);
  }, [item]);

  // ➕ ADD INGREDIENT
  const addIngredient = (itemId: string) => {
    setIngredients((prev) => {
      const exists = prev.find((i) => i.itemId === itemId);
      if (exists) return prev;

      return [...prev, { itemId, quantity: 1 }];
    });
  };

  // ✏️ UPDATE QTY
  const updateQuantity = (index: number, value: number) => {
    const copy = [...ingredients];
    copy[index].quantity = value;
    setIngredients(copy);
  };

  // ❌ REMOVE
  const removeIngredient = (index: number) => {
    setIngredients((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    try {
      // EDIT
      if (isEditMode) {
        const payload = isAdmin
          ? {
              name,
              type,
              price,
              petXp,
              craftable,
            }
          : { price };

        await fetch(
          `http://localhost:3000/items/${item._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              ...authHeaders(),
            },
            body: JSON.stringify(payload),
          }
        );
      }

      // CREATE
      else if (isAdmin) {
        const res = await fetch(
          "http://localhost:3000/items",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...authHeaders(),
            },
            body: JSON.stringify({
              name,
              type,
              price,
              petXp,
              craftable,
            }),
          }
        );

        const created = await res.json();

        if (craftable && ingredients.length > 0) {
          await fetch("http://localhost:3000/recipes", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...authHeaders(),
            },
            body: JSON.stringify({
              resultItemId: created._id,
              ingredients,
            }),
          });
        }
      }

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-top">
          <h2>{isEditMode ? "Modifier item" : "Ajouter item"}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {isAdmin && (
          <>
            {/* NAME */}
            <div className="field">
              <label>Nom</label>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {/* TYPE */}
            <div className="field">
              <label>Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="ressource">Ressource</option>
                <option value="equipement">Équipement</option>
                <option value="consommable">Consommable</option>
                <option value="familier">Familier</option>
              </select>
            </div>
          </>
        )}

        {/* PRICE */}
        <div className="field">
          <label>Prix</label>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </div>

        {isAdmin && (
          <>
            {/* XP */}
            <div className="field">
              <label>XP familier</label>
              <input type="number" value={petXp} onChange={(e) => setPetXp(Number(e.target.value))} />
            </div>

            {/* CRAFT */}
            <label className="checkbox-row">
              <input
                type="checkbox"
                checked={craftable}
                onChange={() => setCraftable(!craftable)}
              />
              Craftable
            </label>
          </>
        )}

        {/* INGREDIENTS */}
        {isAdmin && craftable && (
          <div className="craft-box">

            <h3>Recette</h3>

            <SearchIngredient items={items} onSelect={addIngredient} />

            {ingredients.map((ing, index) => {
              const item = items.find(i => i._id === ing.itemId);

              return (
                <div key={index} className="ingredient-row">
                  <span>{item?.name}</span>

                  <input
                    type="number"
                    min={1}
                    value={ing.quantity}
                    onChange={(e) =>
                      updateQuantity(index, Number(e.target.value))
                    }
                  />

                  <button onClick={() => removeIngredient(index)}>✕</button>
                </div>
              );
            })}
          </div>
        )}

        {/* ACTIONS */}
        <div className="modal-actions">
          <button onClick={onClose}>Annuler</button>
          <button onClick={handleSubmit}>
            {isEditMode ? "Modifier" : "Ajouter"}
          </button>
        </div>

      </div>
    </div>
  );
}

// 🔎 SEARCH
function SearchIngredient({ items, onSelect }: any) {
  const [search, setSearch] = useState("");

  const filtered = items.filter((i: any) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="ingredient-search">

      <input
        placeholder="Rechercher ingrédient..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <div className="search-results">
          {filtered.slice(0, 8).map((item: any) => (
            <button
              key={item._id}
              onClick={() => {
                onSelect(item._id);
                setSearch("");
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}

    </div>
  );
}