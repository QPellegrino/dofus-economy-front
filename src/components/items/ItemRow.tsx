import { deleteItem } from "../../api/items.api";
import { Item } from "../../types/item.types";
import "./ItemRow.scss"

type Props = {
  item: Item;
  refresh: () => void;
  onEdit: () => void;
};

export default function ItemRow({
  item,
  refresh,
  onEdit,
}: Props) {
  const handleDelete = async () => {
    await deleteItem(item._id);
    refresh();
  };

  return (
    <tr>

      <td>{item.name}</td>

      <td>{item.type}</td>

      <td>
        <span className="badge">
          {item.price} 🪙
        </span>
      </td>

      <td>
        <span className="xp-badge">
          {item.petXp}
        </span>
      </td>

      <td className="actions-cell">

        <button
          className="edit-btn"
          onClick={onEdit}
        >
          Modifier
        </button>

        <button
          className="delete-btn"
          onClick={handleDelete}
        >
          Supprimer
        </button>

      </td>

    </tr>
  );
}
