import { useEffect, useMemo, useState } from "react";

type Item = {
  _id: string;
  name: string;
  type: string;
  price: number;
  petXp: number;
};

type ProfitData = {
  craftCost: number;
  sellPrice: number;
  profit: number;
  ratio: number;
  petXp: number;
  xpPerKamas: number;
};

type CraftItem = Item & {
  stats?: ProfitData;
};

export default function Top20Craft() {
  const [items, setItems] = useState<CraftItem[]>([]);

  const [loading, setLoading] = useState(true);

  const [budget, setBudget] = useState(500000);

  const [search, setSearch] = useState("");

  const fetchCrafts = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:3000/items");

      const data: Item[] = await res.json();

      const craftables: CraftItem[] = [];

      for (const item of data) {
        try {
          const profitRes = await fetch(
            `http://localhost:3000/recipes/item/${item._id}/profit`
          );

          if (!profitRes.ok) continue;

          const stats = await profitRes.json();

          if (!stats?.craftCost) continue;

          craftables.push({
            ...item,
            stats,
          });
        } catch {
          // ignore non craftables
        }
      }

      setItems(craftables);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrafts();
  }, []);

  const filteredItems = useMemo(() => {
    return items
      .filter((item) => {
        const matchesBudget =
          (item.stats?.craftCost ?? 0) <= budget;

        const matchesSearch = item.name
          .toLowerCase()
          .includes(search.toLowerCase());

        return matchesBudget && matchesSearch;
      })
      .sort(
        (a, b) =>
          (b.stats?.profit ?? 0) -
          (a.stats?.profit ?? 0)
      )
      .slice(0, 20);
  }, [items, budget, search]);

  return (
    <div className="topcraft-page">

      <div className="topcraft-header">

        <div>
          <h1 className="title">
            Top 20 Crafts
          </h1>

          <p className="subtitle">
            Les crafts les plus rentables selon ton budget.
          </p>
        </div>

      </div>

      {/* FILTERS */}
      <div className="filters-card">

        <div className="filter-group">
          <label>Budget max craft</label>

          <input
            type="number"
            value={budget}
            onChange={(e) =>
              setBudget(Number(e.target.value))
            }
          />
        </div>

        <div className="filter-group">
          <label>Recherche</label>

          <input
            type="text"
            placeholder="Ex: Gelano"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

      </div>

      {/* TABLE */}
      <div className="table-wrapper">

        <table className="items-table">

          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Type</th>
              <th>Coût craft</th>
              <th>Prix vente</th>
              <th>Profit</th>
              <th>Rentabilité</th>
              <th>XP/K</th>
            </tr>
          </thead>

          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={item._id}>

                <td>
                  <span className="rank-badge">
                    #{index + 1}
                  </span>
                </td>

                <td>{item.name}</td>

                <td>
                  <span className="badge">
                    {item.type}
                  </span>
                </td>

                <td>
                  {item.stats?.craftCost.toLocaleString()} K
                </td>

                <td>
                  {item.stats?.sellPrice.toLocaleString()} K
                </td>

                <td>
                  <span
                    className={`profit ${
                      (item.stats?.profit ?? 0) >= 0
                        ? "positive"
                        : "negative"
                    }`}
                  >
                    {item.stats?.profit.toLocaleString()} K
                  </span>
                </td>

                <td>
                  <span className="ratio-badge">
                    {item.stats?.ratio.toFixed(1)}%
                  </span>
                </td>

                <td>
                  <span className="xp-badge">
                    {item.stats?.xpPerKamas.toFixed(4)}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {!loading && filteredItems.length === 0 && (
          <div className="empty-state">
            Aucun craft trouvé.
          </div>
        )}

      </div>

    </div>
  );
}