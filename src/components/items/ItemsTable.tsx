import { useState } from "react";
import "./ItemsTable.scss"

import { Item } from "../../types/item.types";
import { getUserRole } from "../../utils/auth";

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
  const role = getUserRole();
  const isAdmin = role === "admin";

  const [editingItem, setEditingItem] =
    useState<Item | null>(null);
  const [isCreateOpen, setIsCreateOpen] =
    useState(false);

  return (
    <>
      {isAdmin && (
        <div className="items-toolbar">
          <button
            className="add-item-btn"
            onClick={() => setIsCreateOpen(true)}
          >
            Ajouter un item
          </button>
        </div>
      )}

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
              canDelete={isAdmin}
            />
          ))}
        </tbody>

      </table>

      {editingItem && (
        <AddItemModal
          item={editingItem}
          role={role}
          onClose={() => setEditingItem(null)}
          onSuccess={() => {
            setEditingItem(null);
            refresh();
          }}
        />
      )}

      {isAdmin && isCreateOpen && (
        <AddItemModal
          role={role}
          onClose={() => setIsCreateOpen(false)}
          onSuccess={() => {
            setIsCreateOpen(false);
            refresh();
          }}
        />
      )}

    </>
  );
}
