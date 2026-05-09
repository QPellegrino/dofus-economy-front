import { useEffect, useState } from "react";
import { getItems } from "../api/items.api";
import { Item } from "../types/item.types";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);

    try {
      const data = await getItems();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return {
    items,
    loading,
    refresh: fetchAll,
  };
}
