import { useEffect, useState } from "react";

type Item = {
  _id: string;
  name: string;
};

type Ingredient = {
  itemId: string;
  quantity: number;
};

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddItemModal({
  onClose,
  onSuccess,
}: Props) {
  const [items, setItems] = useState<Item[]>([]);

  const [name, setName] = useState("");
  const [type, setType] = useState("ressource");
  const [price, setPrice] = useState(0);
  const [petXp, setPetXp] = useState(0);

  const [craftable, setCraftable] = useState(false);

  const [ingredients, setIngredients] = useState<
    Ingredient[]
  >([]);

  // 📦 LOAD ITEMS
  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(
        "http://localhost:3000/items"
      );

      const data = await res.json();

      setItems(data);
    };

    fetchItems();
  }, []);

  // ➕ ADD INGREDIENT
  const addIngredient = (itemId: string) => {
    const alreadyExists = ingredients.find(
      (i) => i.itemId === itemId
    );

    if (alreadyExists) return;

    setIngredients((prev) => [
      ...prev,
      {
        itemId,
        quantity: 1,
      },
    ]);
  };

  // ✏️ UPDATE QUANTITY
  const updateQuantity = (
    index: number,
    value: number
  ) => {
    const copy = [...ingredients];

    copy[index].quantity = value;

    setIngredients(copy);
  };

  // ❌ REMOVE INGREDIENT
  const removeIngredient = (index: number) => {
    setIngredients((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    try {
      // 1️⃣ CREATE ITEM
      const itemRes = await fetch(
        "http://localhost:3000/items",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
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

      const createdItem = await itemRes.json();

      // 2️⃣ CREATE RECIPE
      if (craftable && ingredients.length > 0) {
        await fetch(
          "http://localhost:3000/recipes",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              resultItemId: createdItem._id,

              ingredients: ingredients.map(
                (ing) => ({
                  itemId: ing.itemId,
                  quantity: ing.quantity,
                })
              ),
            }),
          }
        );
      }

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-top">

          <h2>Ajouter un item</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        {/* NAME */}
        <div className="field">

          <label>Nom</label>

          <input
            type="text"
            placeholder="Ex: Gelano"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

        {/* TYPE */}
        <div className="field">

          <label>Type</label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >
            <option value="ressource">
              Ressource
            </option>

            <option value="equipement">
              Équipement
            </option>

            <option value="consommable">
              Consommable
            </option>

            <option value="familier">
              Familier
            </option>

          </select>

        </div>

        {/* PRICE */}
        <div className="field">

          <label>Prix</label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(Number(e.target.value))
            }
          />

        </div>

        {/* PET XP */}
        <div className="field">

          <label>XP familier</label>

          <input
            type="number"
            value={petXp}
            onChange={(e) =>
              setPetXp(Number(e.target.value))
            }
          />

        </div>

        {/* CRAFTABLE */}
        <label className="checkbox-row">

          <input
            type="checkbox"
            checked={craftable}
            onChange={() =>
              setCraftable(!craftable)
            }
          />

          Item craftable

        </label>

        {/* RECIPE */}
        {craftable && (
          <div className="craft-box">

            <h3>Recette</h3>

            <SearchIngredient
              items={items}
              onSelect={addIngredient}
            />

            <div className="ingredient-list">

              {ingredients.map((ing, index) => {
                const item = items.find(
                  (i) => i._id === ing.itemId
                );

                return (
                  <div
                    key={index}
                    className="ingredient-row"
                  >

                    <span>
                      {item?.name}
                    </span>

                    <input
                      type="number"
                      min={1}
                      value={ing.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          index,
                          Number(e.target.value)
                        )
                      }
                    />

                    <button
                      onClick={() =>
                        removeIngredient(index)
                      }
                    >
                      ✕
                    </button>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* ACTIONS */}
        <div className="modal-actions">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Annuler
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Ajouter
          </button>

        </div>

      </div>

    </div>
  );
}

// 🔎 SEARCH COMPONENT

type SearchProps = {
  items: Item[];
  onSelect: (id: string) => void;
};

function SearchIngredient({
  items,
  onSelect,
}: SearchProps) {
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="ingredient-search">

      <input
        type="text"
        placeholder="Rechercher un ingrédient..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {search && (
        <div className="search-results">

          {filtered
            .slice(0, 8)
            .map((item) => (
              <button
                key={item._id}
                className="search-item"
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