import { AdditionalState } from "api/state-slices/types";
import { ModalState } from "api/core/store/internal-slices/modal/types";
import { RouterState } from "api/core/store/internal-slices/router/types";
import { UIState } from "api/core/store/internal-slices/ui/types";
import { Config } from "api/core/store/internal-slices/config/types";
import { CSSProperties } from "react";

//General
export type RootState = {
  modal: ModalState;
} & AdditionalState;

export type StateSlice = keyof RootState;

export interface RootAction {
  type: string;
  payload?: any;
  error?: boolean;
}

export interface ReducerAction<T = any> {
  action: string;
  callback: (
    state: T,
    action: {
      type: string;
      payload?: any;
    }
  ) => T;
}

interface ThemeField {
  height?: string;
  className?: string;
}

export type Theme = {
  header: ThemeField;
  footer: ThemeField;
  router: ThemeField;
} & Record<string, any>;
