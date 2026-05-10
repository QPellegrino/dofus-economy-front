import { useEffect, useState } from "react";
import ItemsTable from "../components/items/ItemsTable";
import { getItems } from "../api/items.api";
import { Item } from "../types/item.types";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemsTable
      items={items}
      refresh={fetchItems}
    />
  );
}