import { useEffect, useState } from "react";

type Craft = {
  _id: string;
  name: string;
  craftCost: number;
  sellPrice: number;
  profit: number;
  ratio: number;
};

export default function TopCraftTable() {
  const [crafts, setCrafts] = useState<Craft[]>([]);
  const [budget, setBudget] = useState(50000);

  useEffect(() => {
    fetchCrafts();
  }, [budget]);

  const fetchCrafts = async () => {
    const res = await fetch("http://localhost:3000/recipes");
    const data = await res.json();

    const profits = await Promise.all(
      data.map(async (recipe: any) => {
        const resProfit = await fetch(
          `http://localhost:3000/recipes/${recipe._id}/profit`
        );

        return resProfit.json();
      })
    );

    const filtered = profits
      .filter((p) => p.craftCost <= budget)
      .sort((a, b) => b.profit - a.profit)
      .slice(0, 20);

    setCrafts(filtered);
  };

  return (
    <div>

      <div className="items-header">

        <h1 className="title">
          Top 20 Crafts
        </h1>

        <input
          type="number"
          value={budget}
          onChange={(e) =>
            setBudget(Number(e.target.value))
          }
          placeholder="Budget max"
          className="budget-input"
        />

      </div>

      <table className="items-table">

        <thead>
          <tr>
            <th>Item</th>
            <th>Coût craft</th>
            <th>Prix vente</th>
            <th>Profit</th>
            <th>Rentabilité</th>
          </tr>
        </thead>

        <tbody>

          {crafts.map((craft) => (
            <tr key={craft._id}>

              <td>{craft.name}</td>

              <td>{craft.craftCost}</td>

              <td>{craft.sellPrice}</td>

              <td
                className={
                  craft.profit >= 0
                    ? "profit positive"
                    : "profit negative"
                }
              >
                {craft.profit}
              </td>

              <td>{craft.ratio.toFixed(1)}%</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}