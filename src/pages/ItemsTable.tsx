import { useEffect, useState } from "react";
import AddItemModal from "../components/AddItemModal";

type Item = {
  _id: string;
  name: string;
  type: string;
  price: number;
  petXp: number;
};

type RecipeProfit = {
  craftCost: number;
  sellPrice: number;
  profit: number;
  ratio: number;
  petXp: number;
};

export default function ItemsTable() {
  const [items, setItems] = useState<Item[]>([]);

  const [profits, setProfits] = useState<
    Record<string, RecipeProfit>
  >({});

  const [openModal, setOpenModal] =
    useState(false);

  // 📦 FETCH ITEMS
  const fetchItems = async () => {
    try {
      // ITEMS
      const res = await fetch(
        "http://localhost:3000/items"
      );

      const data: Item[] = await res.json();

      setItems(data);

      // PROFITS
      const profitMap: Record<
        string,
        RecipeProfit
      > = {};

      await Promise.all(
        data.map(async (item) => {
          try {
            const resProfit = await fetch(
              `http://localhost:3000/recipes/item/${item._id}/profit`
            );

            if (!resProfit.ok) return;

            const profitData =
              await resProfit.json();

            // ignore si pas une vraie recipe
            if (
              profitData?.message ===
              "Recipe not found"
            ) {
              return;
            }

            profitMap[item._id] = profitData;
          } catch {
            // ignore
          }
        })
      );

      setProfits(profitMap);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 🗑 DELETE
  const handleDelete = async (
    id: string
  ) => {
    await fetch(
      `http://localhost:3000/items/${id}`,
      {
        method: "DELETE",
      }
    );

    fetchItems();
  };

  return (
    <div className="items-container">

      {/* HEADER */}
      <div className="items-header">

        <h1 className="title">
          Items
        </h1>

        <button
          className="add-btn"
          onClick={() =>
            setOpenModal(true)
          }
        >
          + Ajouter un item
        </button>

      </div>

      {/* MODAL */}
      {openModal && (
        <AddItemModal
          onClose={() =>
            setOpenModal(false)
          }
          onSuccess={() => {
            setOpenModal(false);
            fetchItems();
          }}
        />
      )}

      {/* TABLE */}
      <table className="items-table">

        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Prix</th>
            <th>Profit</th>
            <th>Renta</th>
            <th>XP Familier</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {items.map((item) => {
            const recipe =
              profits[item._id];

            const profit =
              recipe?.profit ?? 0;

            const ratio =
              recipe?.ratio ?? 0;

            return (
              <tr key={item._id}>

                {/* NOM */}
                <td>{item.name}</td>

                {/* TYPE */}
                <td>{item.type}</td>

                {/* PRIX */}
                <td>
                  <span className="badge">
                    {item.price} 🪙
                  </span>
                </td>

                {/* PROFIT */}
                <td>
                  <span
                    className={`profit ${
                      profit >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {Math.round(profit)} 🪙
                  </span>
                </td>

                {/* RENTA */}
                <td>
                  <span
                    className={`profit ${
                      ratio >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {Math.round(ratio)}%
                  </span>
                </td>

                {/* XP */}
                <td>
                  <span className="xp-badge">
                    {item.petXp ?? 0}
                  </span>
                </td>

                {/* ACTIONS */}
                <td>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(
                        item._id
                      )
                    }
                  >
                    Supprimer
                  </button>

                </td>

              </tr>
            );
          })}

        </tbody>

      </table>
    </div>
  );
}