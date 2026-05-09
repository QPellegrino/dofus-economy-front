import { useParams } from "react-router-dom";

export default function ItemDetailsPage() {
  const { id } = useParams();

  return (
    <div>
      <h1>Détail Item</h1>

      <p>ID : {id}</p>
    </div>
  );
}
