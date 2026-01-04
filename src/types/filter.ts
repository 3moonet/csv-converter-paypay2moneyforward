export interface FilterSettings {
  enableOutgoingFilter: boolean;
  enablePointOperationExclude: boolean;
  enableBalanceExclude: boolean;
}

export const DEFAULT_FILTER_SETTINGS: FilterSettings = {
  enableOutgoingFilter: true,
  enablePointOperationExclude: true,
  enableBalanceExclude: true,
};
