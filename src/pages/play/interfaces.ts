export interface IPlayMenuCallback {
  // TODO: refactoring
  showMyTerritoryCallback?: () => void;
}

export interface IPlayMapProps {
  showPopupCallback: (isShown: boolean) => void;
}
