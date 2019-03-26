import { ItemBase } from "../base";

export interface MultiChildParentInternal<TChild extends ItemBase, TParent extends ItemBase> {
    db_items: TChild[],
    parent_db_item: TParent
}