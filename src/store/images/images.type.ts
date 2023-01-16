export type ChangeType = {
  parameterName: string;
  parameterValue: string;
};

export interface ImagesState {
  currentChange: ChangeType;
  changesHistory: any[];
  positionInHistory: number;
  entitiesAreLoading: false;
}
