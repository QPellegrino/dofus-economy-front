import TopCraftTable from "../components/craft/TopCraftTable";
import "./TopCraftPage.scss"

export default function TopCraftPage() {
  return (
    <div>
      <h1 className="title">
        Top 20 Crafts
      </h1>

      <TopCraftTable />
    </div>
  );
}