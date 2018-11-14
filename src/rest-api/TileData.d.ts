export interface CounterFontColor {
  Opacity: number;
  ColorName: string;
  ThemeBrushKey?: any;
  GradientDirection: number;
  GradientDefinition?: any;
  Type: number;
}

export interface ContentFontColor {
  Opacity: number;
  ColorName: string;
  ThemeBrushKey?: any;
  GradientDirection: number;
  GradientDefinition?: any;
  Type: number;
}

export interface TitleFontColor {
  Opacity: number;
  ColorName: string;
  ThemeBrushKey?: any;
  GradientDirection: number;
  GradientDefinition?: any;
  Type: number;
}

export interface ImageSize {
  Width: number;
  Height: number;
}

export interface TileDetails {
  CounterFontSize: number;
  CounterFontColor: CounterFontColor;
  CounterFontFamily: string;
  CounterHorizontalAlign: number;
  CounterText: string;
  ContentFontSize: number;
  ContentFontColor: ContentFontColor;
  ContentFontFamily: string;
  ContentHorizontalAlign: number;
  ContentText?: any;
  TitleFontSize: number;
  TitleFontColor: TitleFontColor;
  TitleFontFamily: string;
  TitleHorizontalAlign: number;
  TitleText: string;
  ShowImage: boolean;
  Image?: any;
  ImageLocation: number;
  ShowImageInBackground: boolean;
  FitImageToTile: boolean;
  ImageSize: ImageSize;
  TileImageVerticalAlign: number;
  TileImageHorizontalAlign: number;
}

export interface TileData {
  ActionType: number;
  EntityTypeName?: any;
  EntityId?: any;
  Url?: any;
  FolderId?: any;
  PageName?: any;
  FlowId?: any;
  DataBusName?: any;
  DataBusValue?: any;
  BackgroundColor?: any;
  TileDetails: TileDetails;
}
