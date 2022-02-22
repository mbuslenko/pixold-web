export interface IPlayMenuCallback {
  showOwnedTerritoryCallback?: (ownerUsername: string) => void;
}

export interface IPlayMapProps {
  showPopupCallback: (isShown: boolean) => void;
}
