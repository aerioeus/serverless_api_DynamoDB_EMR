import { ItemBase } from "../base";

export interface ChildParentInternal<TChild extends ItemBase, TParent extends ItemBase> {
    db_item: TChild,
    parent_db_item: TParent
}