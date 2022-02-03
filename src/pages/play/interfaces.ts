export interface IPlayPageProps {
  isConnectedSocket: boolean;
  showAlertsCallback: (isShown: boolean) => void;
}

export interface IPlayMenuCallback {
  // TODO: refactoring
  showMyTerritoryCallback?: () => void;
}
