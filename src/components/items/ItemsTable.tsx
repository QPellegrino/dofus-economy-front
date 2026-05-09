import { useState } from "react";

import { Item } from "../../types/item.types";

import ItemRow from "./ItemRow";
import AddItemModal from "./AddItemModal";

type Props = {
  items: Item[];
  refresh: () => void;
};

export default function ItemsTable({
  items,
  refresh,
}: Props) {
  const [editingItem, setEditingItem] =
    useState<Item | null>(null);

  return (
    <>

      <table className="items-table">

        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Prix</th>
            <th>XP</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item._id}
              item={item}
              refresh={refresh}
              onEdit={() => setEditingItem(item)}
            />
          ))}
        </tbody>

      </table>

      {editingItem && (
        <AddItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSuccess={() => {
            setEditingItem(null);
            refresh();
          }}
        />
      )}

    </>
  );
}
