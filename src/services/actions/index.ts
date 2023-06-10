import { TFormActions } from "./formActions";
import { TIngredientsActions } from "./ingredientsActions";
import { TActionsModal } from "./modalActions";
import { TOrderActions } from "./orderActions";
import { TWsActions } from "./feedActions";
import { TWsOrderActions } from "./orderFeedActions";

export type TAppActions =
    | TFormActions
    | TIngredientsActions
    | TActionsModal
    | TOrderActions
    | TWsActions
    | TWsOrderActions;