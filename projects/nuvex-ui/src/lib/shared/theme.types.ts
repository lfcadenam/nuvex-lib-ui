export interface ColorShades {
  [shade: string]: string;
}

export interface PrimitiveTokens {
  [colorName: string]: ColorShades;
}

export interface SemanticTokens {
  [tokenName: string]: string | { [key: string]: string };
}

export interface ThemePreset {
  primitive: PrimitiveTokens;
  semantic: SemanticTokens;
  dark?: {
    semantic: SemanticTokens;
  };
}

export interface ThemeOptions {
  prefix?: string;
  darkModeSelector?: string;
}
