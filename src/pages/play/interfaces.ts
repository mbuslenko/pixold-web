export interface IPlayPageProps {
  showAlertsCallback: (isShown: boolean) => void;
}

export interface IPlayMenuCallback {
  // TODO: refactoring
  showMyTerritoryCallback?: () => void;
}
